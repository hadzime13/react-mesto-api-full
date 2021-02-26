import React from 'react';
import PopupWithForm from './PopupWithForm'


const EditAvatarPopup = React.memo(({ isOpen, onClose, onUpdateAvatar }) => {
  const avatarRef = React.useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }
  // Сброс полей ввода
  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen])

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Обновить аватар"
      name="avatar"
      buttonText="Сохранить"
      onSubmit={handleSubmit}>
      <>
        <input type="url" ref={avatarRef} placeholder="Ссылка на аватар" name="input-avatarLink" id="input-avatarLink" defaultValue=""
          className="popup__text popup__text_el_image-link" required />
        <span className="popup__error" id="input-avatarLink-error"></span>
      </>
    </PopupWithForm>
  )
});

export default EditAvatarPopup;

