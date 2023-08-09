import React, { useEffect, useState } from "react";
import api from "../utils/api";
import Card from "./Card";

function Main({onEditProfile, onEditAvatar, onAddPlace, onCardClick}) {

const [userName, setUserName] = useState('')
const [userDescription, setUserDescription] = useState('')
const [userAvatar, setUserAvatar] = useState('')
const [cards, setCards] = useState([])

useEffect(() => {
  Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([dataUser, dataCard]) => {
    dataCard.forEach(element => element.myid = dataUser._id);
    setCards(dataCard);
    setUserName(dataUser.name);
    setUserDescription(dataUser.about);
    setUserAvatar(dataUser.avatar);
  })
  .catch((error) => console.error(error))
}, [])

return (
<>
<main className="content">
  <section className="profile">
    <button
      type="button"
      className="profile__photo-button"
      aria-label="Изменить аватар" onClick={onEditAvatar}
    >
      <img
        className="profile__photo"
        src={userAvatar}
        alt="Фото профиля"
      />
    </button>
    <div className="profile__info">
      <h1 className="profile__name">{userName}</h1>
      <button
        type="button"
        className="profile__edit"
        aria-label="Редактировать профиль" onClick={onEditProfile}
      />
      <p className="profile__subtitle">{userDescription}</p>
    </div>
    <button type="button" className="profile__add" aria-label="Добавить фото" onClick={onAddPlace}/>
  </section>
  <section className="cards">
    {cards.map(data => {
      return (<Card key={data._id} card={data} onCardClick={onCardClick} />)
    })}
  </section>
</main>
</>
    )
  }
  
  export default Main;