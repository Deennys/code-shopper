import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import Notification from '../Notification/Index';

const Home: React.FC = () => {
  const [customerId, setCustomerId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://[::1]:8080/ride/estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: customerId,
          origin,
          destination,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Redireciona para /viagem com os dados retornados
        navigate('/viagem', { state: {...data, customerId} });
      } else {
        setError('Erro ao calcular o valor da viagem.');
      }
    } catch (error) {
      console.error(error);
      setError('Erro ao se conectar com o servidor.');
    }
  };

  return (
    <div className="home-container">
      <h1>Estimativa de Viagem</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          ID do Usuário:
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="Digite o ID do usuário"
            required
          />
        </label>

        <label>
          Endereço de Origem:
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Digite o endereço de origem"
            required
          />
        </label>

        <label>
          Endereço de Destino:
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Digite o endereço de destino"
            required
          />
        </label>

        <button type="submit">Estimar Valor</button>
      </form>

      {error && (
        <Notification 
          message={error} 
          onClose={() => setError(null)} 
        />
      )}
    </div>
  );
};

export default Home;