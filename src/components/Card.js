import deleteLogo from '../images/DeleteButton.svg';

export default function Card({ card, onCardClick }) {
  return (
    <div className="cards__item">
        <img className="cards__image" src={card.link} alt={`Изображение ${card.name}`} 
        onClick={() => onCardClick({link: card.link, name: card.name})} />
        <img
        src={deleteLogo}
        className="cards__delete-button"
        alt="Удалить"
        />
        <div className="cards__info">
        <h2 className="cards__name">{card.name}</h2>
        <button type="button" className="cards__like-button" />
        <h3 className="cards__like-counter">0</h3>
        </div>
    </div>
  )
}