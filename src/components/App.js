import { useState } from 'react';
import api from '../utils/api';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import PopupWithForm from '../components/PopupWithForm';
import ImagePopup from '../components/ImagePopup';

function App() {

const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
const [selectedCard, setSelectedCard] = useState({})
const [isImagePopup, setImagePopup] = useState(false)

function handleEditAvatarClick() {
  setIsEditAvatarPopupOpen(true)
}

function handleEditProfileClick() {
  setIsEditProfilePopupOpen(true)
}

function handleAddPlaceClick() {
  setIsAddPlacePopupOpen(true)
}

function handleCardClick(card) {
  setSelectedCard(card)
  setImagePopup(true)
}

function closeAllPopups() {
  setIsEditAvatarPopupOpen(false)
  setIsEditProfilePopupOpen(false)
  setIsAddPlacePopupOpen(false)
  setImagePopup(false)
}

  return (
  <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm name='edit'
      title='Редактировать профиль'
      titleButton='Сохранить'
      isOpen = {isEditProfilePopupOpen} 
      onClose = {closeAllPopups} >
        <input
          type="text"
          id="username-input"
          className="popup__input popup__input_type_name"
          name="username"
          placeholder="Имя"
          required=""
          minLength={2}
          maxLength={40}
        />
        <span className="username-input-error popup__input-error" />
        <input
          type="text"
          id="description-input"
          className="popup__input popup__input_type_job"
          name="description"
          placeholder="Деятельность"
          required=""
          minLength={2}
          maxLength={200}
        />
        <span className="description-input-error popup__input-error" />
      </PopupWithForm>

      <PopupWithForm name='edit-photo'
      title='Обновить аватар'
      titleButton='Сохранить'
      isOpen = {isEditAvatarPopupOpen} 
      onClose = {closeAllPopups} >
        <input
          type="url"
          id="photo-input"
          className="popup__input popup__input_type_photo"
          name="photo"
          placeholder="Ссылка на новое фото"
          required=""
        />
        <span className="photo-input-error popup__input-error" />
      </PopupWithForm>

      <PopupWithForm name='add'
      title='Новое место'
      titleButton='Создать'
      isOpen = {isAddPlacePopupOpen} 
      onClose = {closeAllPopups} >
        <input
          type="text"
          id="card-name-input"
          className="popup__input popup__input_type_card-name"
          name="name"
          placeholder="Название"
          required=""
          minLength={2}
          maxLength={30}
        />
        <span className="card-name-input-error popup__input-error" />
        <input
          type="url"
          id="link-input"
          className="popup__input popup__input_type_link"
          name="link"
          placeholder="Ссылка на картинку"
          required=""
        />
        <span className="link-input-error popup__input-error" />
      </PopupWithForm>

      <PopupWithForm name='delete'
      title='Вы уверены?'
      titleButton='Да'>
      </PopupWithForm>

      <ImagePopup card={selectedCard} isOpen={isImagePopup} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
