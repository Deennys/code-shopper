import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './travel.css';
import Notification from '../Notification/Index';

interface RouteResponse {
    routes: Array<{
        distanceMeters: number;
        duration: string;
    }>;
}

interface TravelState {
    customerId: string;
    origin: {
        latitude: number;
        longitude: number;
    };
    destination: {
        latitude: number;
        longitude: number;
    };
    distance: number;
    duration: string;
    options: Array<{
        id: number;
        name: string;
        description: string;
        vehicle: string;
        review: {
            rating: number;
            comment: string;
        };
        value: number;
    }>;
    routeResponse: RouteResponse; 
}

const Travel: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);


    const state = location.state as TravelState;
    console.log('state => ', state)

    if (!state) {
        navigate('/');
        return null;
    }

    const handleChooseDriver = async (driver: { id: number; name: string; value: number }) => {
        try {
            const response = await fetch('http://[::1]:8080/ride/confirm', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customer_id: state.customerId,
                    origin: `${state.origin.latitude}, ${state.origin.longitude}`,
                    destination: `${state.destination.latitude}, ${state.destination.longitude}`,
                    distance: state.distance,
                    duration: state.duration,
                    driver: {
                        id: driver.id,
                        name: driver.name,
                    },
                    value: driver.value,
                }),
            });

            if (response.ok) {
                navigate('/historico');
            } else {
                setError('Erro ao confirmar viagem.')
            }
        } catch (error) {
            console.error(error);
            setError('Erro ao se conectar com o servidor.');
        }
    };

    return (
        <div className="travel-container">
            <h1>Detalhes da Viagem</h1>

            <h2>Mapa da Rota</h2>
            <div className="map-container">
                <img
                    src={`https://maps.googleapis.com/maps/api/staticmap?size=600x300&markers=color:red%7Clabel:A%7C${state.origin.latitude},${state.origin.longitude}&markers=color:green%7Clabel:B%7C${state.destination.latitude},${state.destination.longitude}&path=color:0x0000ff%7Cweight:5%7C${state.origin.latitude},${state.origin.longitude}%7C${state.destination.latitude},${state.destination.longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
                    alt="Mapa da rota"
                    className="map-image"
                />
            </div>

            <h2>Opções de Motoristas</h2>
            {state.options.map((option) => (
                <div key={option.id} className="driver-option">
                    <h3>{option.name}</h3>
                    <p><strong>Descrição:</strong> {option.description}</p>
                    <p><strong>Veículo:</strong> {option.vehicle}</p>
                    <p><strong>Avaliação:</strong> {option.review.rating} - {option.review.comment}</p>
                    <p><strong>Valor:</strong> R$ {option.value.toFixed(2)}</p>
                    <button
                        onClick={() => handleChooseDriver(option)}
                        className="choose-button"
                    >
                        Escolher
                    </button>
                </div>
            ))}
            {error && (
                <Notification
                    message={error}
                    onClose={() => setError(null)} 
                />
            )}
        </div>
    );
};

export default Travel;
function useState<T>(arg0: null): [any, any] {
    throw new Error('Function not implemented.');
}

