import { useState, useEffect } from 'react';
import api from '../utils/api';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import PopupWithForm from '../components/PopupWithForm';
import ImagePopup from '../components/ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from '../components/EditProfilePopup';
import EditAvatarPopup from '../components/EditAvatarPopup';
import AddPlacePopup from '../components/AddPlacePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setImagePopup] = useState(false)

  const [currentUser, setCurrentUser] = useState({})

  const [cards, setCards] = useState([])

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

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if(!isLiked) {
      api.addLike(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
    }
    else {
      api.deleteLike(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })}
  };

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
    .then((newCard) => {
      setCards((state) => state.filter((c) => c._id === card._id ? "" : newCard));
    })
    .catch(err => console.log(err));
  };

  function handleUpdateUser(dataUser) {
    api.setUserInfo(dataUser)
    .then(res => {
      setCurrentUser(res)
      closeAllPopups();
    })
    .catch((err => console.error(`Ошибка: ${err}`)))
  }

  function handleUpdateAvatar(dataUser) {
    api.setPhoto(dataUser)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups();
      })
      .catch((err => console.error(`Ошибка: ${err}`)))
  }

  function handleAddCard(dataCard) {
    api.addNewCard(dataCard)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err => console.error(`Ошибка: ${err}`)))
  }

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([dataUser, dataCard]) => {
      dataCard.forEach(element => element.myid = dataUser._id);
      setCards(dataCard);
      setCurrentUser(dataUser);
    })
    .catch((error) => console.error(error))
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike = {handleCardLike}
          onCardDelete ={handleCardDelete}
        />
        <Footer />

        <EditProfilePopup
          isOpen = {isEditProfilePopupOpen} 
          onClose = {closeAllPopups}
          onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup 
          isOpen = {isEditAvatarPopupOpen} 
          onClose = {closeAllPopups}
          onUpdateAvatar = {handleUpdateAvatar} />

        <AddPlacePopup 
          isOpen = {isAddPlacePopupOpen} 
          onClose = {closeAllPopups}
          onAddPlace = {handleAddCard} />

        <PopupWithForm 
          name='delete'
          title='Вы уверены?'
          titleButton='Да'
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}>
        </PopupWithForm>

        <ImagePopup card={selectedCard} isOpen={isImagePopup} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
