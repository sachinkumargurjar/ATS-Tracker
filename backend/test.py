from langchain.text_splitter import RecursiveCharacterTextSplitter
import PyPDF2
from openai import OpenAI
from langchain.chains import create_extraction_chain
from langchain_openai import ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
import dotenv
import os
dotenv.load_dotenv()

def read_pdf(pdf_path):
    docs = []
    for pdf in os.listdir(pdf_path):
        path = os.path.join(pdf_path, pdf)
        with open(path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            num_pages = len(reader.pages)
            text = ''
            for page_num in range(num_pages):
                page = reader.pages[page_num]
                text += page.extract_text()
            docs.append(text)
    return docs

# def get_embedding(text, model="text-embedding-3-small"):
#    text = text.replace("\n", " ")
#    return client.embeddings.create(input = [text], model=model).data[0].embedding

texts = read_pdf(r'resume')
embeddings = OpenAIEmbeddings()
db = FAISS.from_texts(texts, embeddings)
docs = db.similarity_search_with_score("As an AI Engineer at Contlo, you will play a pivotal role in developing and implementing advanced AI and machine learning models. You will collaborate with a team of skilled data scientists and engineers to create AI-powered products and services. This position offers a unique opportunity to work on challenging projects in a collaborative and innovative environment. **Responsibilities:** 1. **AI Model Development:** Design, develop, and implement machine learning models and AI algorithms to solve complex problems and improve existing processes. 2. **Data Processing:** Collect, clean, and preprocess data for machine learning purposes, ensuring data quality and integrity. 3. **Algorithm Optimization:** Optimize and fine-tune machine learning algorithms for maximum performance, scalability, and efficiency. 4. **Model Evaluation:** Assess the performance of AI models using various metrics and iterate on model development to improve accuracy and robustness. 5. **Deployment:** Deploy machine learning models in production environments, ensuring their integration with existing systems. 6. **Research:** Stay up-to-date with the latest developments in AI and machine learning research and incorporate relevant findings into projects. 7. **Collaboration:** Work closely with cross-functional teams, including data scientists, software engineers, and domain experts to deliver AI solutions that meet business objectives. 8. **Documentation:** Create and maintain comprehensive documentation for AI models, algorithms, and processes. 9. **Prototyping:** Develop proof-of-concept prototypes to test and validate AI solutions. **Qualifications:** - Bachelor's or Master's degree in Computer Science, Machine Learning, Artificial Intelligence, or a related field is preferred - Internship Experience in developing and implementing machine learning models and algorithms is a plus - Proficiency in programming languages such as Python, TensorFlow, and PyTorch. - Strong understanding of data preprocessing, feature engineering, and model evaluation techniques. - Knowledge of deep learning, natural language processing, and computer vision is a plus. - Experience with cloud platforms and deployment of AI models. - Excellent problem-solving skills and a strong analytical mindset. - Strong communication and teamwork skills")
# schema = {
#     "properties": {
#         "name": {"type": "string"},
#         "email": {"type": "string"},
#         "phone number": {"type": "integer"},
#     }
# }

# llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo")
# chain = create_extraction_chain(schema, llm)
# print(chain.run(pdf_text))
print(docs[0],"\n\n\n\n\n",docs[1],"\n\n\n\n\n", docs[2])