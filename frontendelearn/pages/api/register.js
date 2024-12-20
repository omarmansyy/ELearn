import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
        const backendResponse = await axios.post('/api/register', {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role
        });
        
      res.status(200).json(backendResponse.data);
    } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          res.status(error.response.status).json({ message: error.response.data.message });
        } else if (error.request) {
          // The request was made but no response was received
          res.status(500).json({ message: "No response received from backend server." });
        } else {
          // Something happened in setting up the request that triggered an Error
          res.status(500).json({ message: error.message });
        }
      }
      
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
