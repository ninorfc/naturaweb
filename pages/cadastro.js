// pages/cadastro.js
import { useState } from 'react';

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch('/api/planta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, descricao }),
        });
        if (response.ok) {
            setNome('');
            setDescricao('');
            alert('Planta cadastrada com sucesso!');
        } else {
            alert('Falha ao cadastrar planta');
        }
        setLoading(false);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Cadastrar Planta</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="nome" className="block text-sm font-medium">Nome da Planta</label>
                    <input type="text" id="nome" className="mt-1 p-2 w-full border rounded-md" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="descricao" className="block text-sm font-medium">Descrição</label>
                    <textarea id="descricao" className="mt-1 p-2 w-full border rounded-md" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
                </div>
                <button type="submit" className={`mt-4 px-6 py-2 bg-blue-500 text-white rounded-md ${loading ? 'opacity-50' : ''}`} disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar Planta'}
                </button>
            </form>
        </div>
    );
}
