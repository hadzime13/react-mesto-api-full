import React from 'react';
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

//Попап редактирования профиля
const EditProfilePopup = React.memo(({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  
  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return <PopupWithForm
    isOpen={isOpen}
    onClose={onClose}
    title="Редактировать профиль"
    name="profile"
    buttonText="Сохранить"
    onSubmit={handleSubmit}>
    <>
      <input type="text" placeholder="Имя" name="input-name" id="input-name" value={name ? name : ''}
        className="popup__text popup__text_el_name" required minLength="2" maxLength="40" onChange={handleChangeName} />
      <span className="popup__error" id="input-name-error"></span>

      <input type="text" placeholder="Профессия" name="input-job" id="input-job" value={description ? description : ''}
        className="popup__text popup__text_el_job" required minLength="2" maxLength="200" onChange={handleChangeDescription} />
      <span className="popup__error" id="input-job-error"></span>
    </>
  </PopupWithForm>
});

export default EditProfilePopup;