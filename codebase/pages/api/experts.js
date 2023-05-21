import expertsData from '../../data/expertsData.json';

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(expertsData);
  } else {
    res.status(405).send('Method Not Allowed');
  }
}