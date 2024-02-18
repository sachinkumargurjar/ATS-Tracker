import axios from 'axios';

export const sendResumesToBackend = async (formData) => {
    try {
      const config = {
        headers : {
               'content-type':'multipart/form-data',
        }
      }
      const data = {
        file_uploaded : formData
      }
      const URL = 'http://localhost:8000/upload/';
      const res = await axios.post(URL, data, config);
      console.log('Response from backend API:', res.data);
    } catch (error) {
      console.error('Error sending resumes to backend API:', error);
    }
  };

  export const sendjdToBackend = async (description,setCheck) => {
    try {
      const config = {
        headers : {
               'content-type':'multipart/form-data',
        }
      }
      const data = {
        desc : description,
        nCV : Number(3)
      }
      const URL = 'http://localhost:8000/relevantCV';
      const res = await axios.post(URL, data, config);
      console.log('Response from backend API:', res.data);
      setCheck(true);
      return res.data.payload;
    } catch (error) {
      console.error('Error sending resumes to backend API:', error);
    }
  };

