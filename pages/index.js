// pages/index.js
import { useEffect, useState } from 'react';

export default function Home() {
  const [plantas, setPlantas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlantas = async () => {
      try {
        const res = await fetch('/api/planta');
        const data = await res.json();
        setPlantas(data);
      } catch (error) {
        console.error('Erro ao buscar plantas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlantas();
  }, []);

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-4 text-center">Sabedoria Natural 🌿</h1>
      {loading ? (
        <p className="text-center">Carregando plantas...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plantas.map((planta) => (
            <div key={planta._id} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold text-green-700">{planta.nome}</h2>
              <p className="text-gray-700">{planta.descricao}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
