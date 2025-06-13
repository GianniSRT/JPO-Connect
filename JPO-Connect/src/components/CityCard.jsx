import { useState } from 'react';
import './CityCard.css';

function CityCard({ name, image, date, address, description, link, onInscription }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="city-card">
        <img src={image} alt={name} className="city-card-img" />
        <div className="city-card-body">
          <h2>{name}</h2>
          <p className="city-card-date">{date}</p>
          <p className="city-card-address">{address}</p>
          <p>{description}</p>
          <div className="city-card-button-group">
            <button className="city-card-btn" onClick={() => setIsModalOpen(true)}>
              En savoir plus
            </button>
            {onInscription && (
              <button className="city-card-inscrire-btn" onClick={onInscription}>
                S'inscrire
              </button>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <h2>{name}</h2>
            <p className="modal-date">{date}</p>
            <p className="modal-address">{address}</p>
            <p className="modal-description">{description}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default CityCard;