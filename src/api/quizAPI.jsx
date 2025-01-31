import axios from 'axios';

const fetchQuizzes = async () => {
  try {
    // Use the environment variable for the proxy URL
    const response = await axios.get(import.meta.env.VITE_API_URL);
    
    // Parse the contents from the AllOrigins response
    const quizData = JSON.parse(response.data.contents);
    return quizData;
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    throw error;
  }
};

export default fetchQuizzes;