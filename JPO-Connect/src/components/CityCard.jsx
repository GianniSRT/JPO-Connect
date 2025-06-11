import './CityCard.css'

function CityCard({ name, image, date, address, description, link }) {
  return (
    <div className="city-card">
      <img src={image} alt={name} className="city-card-img" />
      <div className="city-card-body">
        <h2>{name}</h2>
        <p className="city-card-date">{date}</p>
        <p className="city-card-address">{address}</p>
        <p>{description}</p>
        <a href={link} className="city-card-btn">En savoir plus</a>
      </div>
    </div>
  )
}

export default CityCard