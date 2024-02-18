from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import *
from .serializers import *

import numpy as np

import os
import shutil

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from .serializers import FileUploadSerializer

from langchain.text_splitter import RecursiveCharacterTextSplitter
import PyPDF2
from openai import OpenAI
from langchain.chains import create_extraction_chain
from langchain_openai import ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from langchain.chains import create_extraction_chain
from langchain_openai import ChatOpenAI

import json

from openai import OpenAI
import dotenv
dotenv.load_dotenv()

client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])

embeddings = OpenAIEmbeddings()

texts = []

json_template = """
{   "user": {
      "name":"sachin",
    }
    "projects": [
        {
            "project_title": "Image classification with pytorch",
            "short_description": "This PyTorch project trains an image classification model on the CIFAR-10 dataset. A CNN architecture with hyperparameters is modeled, trained and tested to categorize images into 10 classes with high accuracy.",
            "tech_stack": ["python", "pytorch"],
            "time_duration": {
                "start": "04-2020",
                "end": "05-2020",
                "duration_months": 2,
            },
            "relevancy": 5
        },
        {
            "project_title": "Stock price prediction with LSTM",
            "short_description": "The project develops an LSTM model to predict stock prices. Historical closing price data is used to train the recurrent neural network model. By analyzing sequential price patterns, the LSTM model makes multi-day ahead forecasts of a stock's future price.",
            "tech_stack": ["python", "pytorch", "SQL"],
            "time_duration": {
                "start": "10-2021",
                "end": "12-2021",
                "duration_months": 3,
            },
            "relevancy": 3
        }
    ],
    "professional_experience": [
        {
						"role": "Data Scientist",
						"organization": "Swiggy"
            "short_description": "Built restaurant recommendation model for Swiggy's landing page to provide personalized suggestions for users based on order data and user attributes using collaborative filtering techniques to increase orders and revenue.",
            "tech_stack": ["python", "Flask", "Hiroku", "MongoDB"],
            "time_duration": {
                "start": "05-2022",
                "end": "07-2022",
                "duration_months": 3
            },
            "relevancy": 4
        }
    ],
    "college": {
        "name": "IIT Bombay",
        "branch": "Electrical Engineering",
        "degree": "Dual Degree",
        "cgpa": 8.2,
        "start": "07-2018",
        "end": "05-2023"
    }
}"""

def read_pdf(pdf_path):
    text = ""
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        num_pages = len(reader.pages)
        for page_num in range(num_pages):
            page = reader.pages[page_num]
            text += page.extract_text()
    return text

def get_embedding(text, model="text-embedding-ada-002"):
   text = text.replace("\n", " ")
   return client.embeddings.create(input = [text], model=model).data[0].embedding

def cosine_similarity(a, b):
    dot_product = np.dot(a, b)
    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)
    similarity = dot_product / (norm_a * norm_b)
    return similarity

# ViewSets define the view behavior.
class UploadViewSet(ViewSet):
    serializer_class = FileUploadSerializer

    def list(self, request):
        return Response("GET API")

    def create(self, request):
        file_uploaded = request.FILES.get('file_uploaded')
        if file_uploaded:
            # Specify the directory where you want to save the uploaded files
            save_directory = 'uploads'
            # Create the directory if it doesn't exist
            os.makedirs(save_directory, exist_ok=True)
            # Specify the path where the file will be saved
            file_path = os.path.join(save_directory, file_uploaded.name)
            # Write the file to disk
            with open(file_path, 'wb+') as destination:
                for chunk in file_uploaded.chunks():
                    destination.write(chunk)
            texts.append(read_pdf(file_path))
            # shutil.rmtree(save_directory)
            response = "POST API and you have uploaded a file named '{}' saved at '{}'".format(file_uploaded.name, file_path)
            return Response(response, status=status.HTTP_201_CREATED)
        else:
            return Response("No file uploaded", status=status.HTTP_400_BAD_REQUEST)
        

class GetRelevantCvAPI(APIView):

    def post(self, request):
        serializer = JDSeriallizer(data=request.data)

        if not serializer.is_valid():
            return Response({'status': 403, 'errors': serializer.errors})
        
        db = FAISS.from_texts(texts, embeddings)
        docs = db.similarity_search_with_score(request.data['desc'])
        jd_vec = get_embedding(request.data['desc'])
        output = []
        for i in range(min(int(request.data['nCV']), len(docs))):
            if  1 - docs[i][1] < 0.4:
                break
            response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            response_format={ "type": "json_object" },
            messages=[
              {"role": "system", "content": "You are a helpful assistant designed to output parsed content of resumes in JSON in the following format and leave values null if data not found: \n{}".format(json_template)},
              {"role": "user", "content": "Parse this resume text exactly in the format mentioned: \n {}".format(docs[i][0].page_content)}
            ]
            )
            resp = response.choices[0].message.content
            obj = json.loads(resp)

            print('test')

            for project in obj['projects']:
                emb_vec = get_embedding(project["short_description"])
                score = cosine_similarity(emb_vec, jd_vec)
                project['relevancy'] = int(round(score))

            print('test')

            for professional_experience in obj['professional_experience']:
                emb_vec = get_embedding(professional_experience["short_description"])
                score = cosine_similarity(emb_vec, jd_vec)
                professional_experience['relevancy'] = int(round(score))

            print('test')

            resp = json.dumps(obj, indent=4)

            output.append({"output" : resp, "score": int(round((1 - docs[i][1])*100))})
        return Response({'status': 200, 'payload': output, 'message': 'Relevant Resume'})

