import React, { useState } from 'react';
import './history.css'; 
import Notification from '../Notification/Index'; 
import { drivers } from './drivers';

interface Driver {
  id: number;
  name: string;
}

interface Ride {
  id: number;
  date: string; // A data será em formato de string (datetime)
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: Driver;
  value: number;
}

const History: React.FC = () => {
  const [customerId, setCustomerId] = useState('');
  const [driverId, setDriverId] = useState('');
  const [rides, setRides] = useState<Ride[]>([]);
  const [error, setError] = useState<string | null>(null); 

  
  const fetchRides = async () => {
    if (!customerId) return; 

    try {
      let url = `http://[::1]:8080/ride/${customerId}`;
      if (driverId) {
        url += `?driver_id=${driverId}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setRides(data.rides); 
      } else {
        setError('Erro ao carregar histórico de viagens. Tente novamente.');
      }
    } catch (error) {
      setError('Erro ao se conectar com o servidor.'); 
    }
  };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); 
    fetchRides(); 
  };

  
  const renderRides = () => {
    return rides?.map((ride) => (
      <div className="ride-item" key={ride.id}>
        <p><strong>Data e Hora:</strong> {new Date(ride.date).toLocaleString()}</p>
        <p><strong>Motorista:</strong> {ride.driver.name}</p>
        <p><strong>Origem:</strong> {ride.origin}</p>
        <p><strong>Destino:</strong> {ride.destination}</p>
        <p><strong>Distância:</strong> {ride.distance} km</p>
        <p><strong>Tempo:</strong> {ride.duration}</p>
        <p><strong>Valor:</strong> ${ride.value}</p>
      </div>
    ));
  };

  return (
    <div className="history-container">
      <h1>Histórico de Viagens</h1>

      {error && (
        <Notification 
          message={error} 
          onClose={() => setError(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="filter-form">
        <div>
          <label htmlFor="customerId">ID do Cliente:</label>
          <input
            type="text"
            id="customerId"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="Digite o ID do cliente"
            required
          />
        </div>

        <div>
          <label htmlFor="driverId">Filtrar por Motorista:</label>
          <select
            id="driverId"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
          >
            <option value="">Todos</option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Aplicar Filtro</button>
      </form>

      <div className="rides-list">
        {rides?.length > 0 ? renderRides() : <p>Nenhuma viagem encontrada.</p>}
      </div>
    </div>
  );
};

export default History;
