import clientPromise from './connect';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("naturaweb");
  const collection = db.collection("plantas");

  if (req.method === 'POST') {
    const { nome, descricao } = req.body;
    const result = await collection.insertOne({ nome, descricao });
    res.status(201).json({ message: 'Planta adicionada!', result });
  } else if (req.method === 'GET') {
    const plantas = await collection.find({}).toArray();
    res.status(200).json(plantas);
  } else {
    res.status(405).end(); // Método não permitido
  }
}
