import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const backendResponse = await axios.post('http://localhost:3000/auth/login', req.body);
      res.status(200).json(backendResponse.data);
    } catch (error) {
      res.status(error.response.status).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
