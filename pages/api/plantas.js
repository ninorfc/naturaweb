// pages/api/planta.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Sua string de conexão do MongoDB
const client = new MongoClient(uri);
const dbName = "natureweb"; // Nome do seu banco de dados

// Função para conectar ao banco de dados
async function connectToDatabase() {
    if (!client.isConnected()) {
        await client.connect();
    }
    const db = client.db(dbName);
    return { db };
}

// Rota API para GET (listar plantas) e POST (adicionar planta)
export default async function handler(req, res) {
    const { method } = req;
    if (method === 'GET') {
        // Lógica para listar plantas do banco de dados
        try {
            const { db } = await connectToDatabase();
            const plantas = await db.collection('plantas').find({}).toArray();
            res.status(200).json(plantas);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao acessar o banco de dados', error });
        }
    } else if (method === 'POST') {
        // Lógica para adicionar uma nova planta no banco de dados
        try {
            const { nome, descricao } = req.body;
            if (!nome || !descricao) {
                return res.status(400).json({ message: 'Nome e descrição são obrigatórios' });
            }
            const { db } = await connectToDatabase();
            const result = await db.collection('plantas').insertOne({ nome, descricao, criadoEm: new Date() });
            res.status(201).json({ message: 'Planta adicionada com sucesso!', planta: result.ops[0] });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao adicionar planta', error });
        }
    } else {
        // Caso o método não seja nem GET nem POST
        res.status(405).json({ message: 'Método não permitido' });
    }
}
