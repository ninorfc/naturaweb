// pages/index.js
import { useEffect, useState } from 'react';

export default function Home() {
    const [plants, setPlants] = useState([]);

    // Função para buscar as plantas da API
    const fetchPlants = async () => {
        const response = await fetch('/api/planta');
        const data = await response.json();
        setPlants(data);
    };

    useEffect(() => {
        fetchPlants();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Plantas Medicinais</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {plants.map((plant) => (
                    <div key={plant._id} className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">{plant.nome}</h2>
                        <p className="mt-2">{plant.descricao}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
