import Section from "../components/Section.js";
import Card from "../components/Card.js";
import popupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import {
  validationSettings,
  addCardForm,
  addCardModal,
} from "../scripts/validation.js";
import {
  userNameInput,
  userDescriptionInput,
  cardsList,
  initialCards,
  cardData,
  cardSelector,
  profileEditButton,
  addCardButton,
  addCardTitleField,
  addCardImageLinkField,
  profileEditModal,
  profileEditForm,
} from "../utils/constant.js";

//CARD SECTION
const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = createCard(cardData);
      section.addItem(card);
    },
  },
  cardsList
);
section.renderItems();

function createCard(cardData) {
  const card = new Card(cardData, cardSelector, handleCardClick);
  return card.getView();
}

function handleCardClick(cardData) {
  previewImagePopup.open(cardData);
}

//USER INFO
const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userTitleSelector: ".profile__description",
});

//PopUpWithImage
const previewImagePopup = new popupWithImage("#image-modal", handleImageClick);
previewImagePopup.setEventListeners();

function handleImageClick(cardData) {
  previewImagePopup.open(cardData);
}

//PopUpWithForm
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleEditProfileSubmit
);
profileEditPopup.setEventListeners();
profileEditButton.addEventListener("click", () => {
  handleProfileEditClick();
});

function handleProfileEditClick() {
  const user = userInfo.getUserInfo();
  userNameInput.value = user.name;
  userDescriptionInput.value = user.job;
  profileEditPopup.open();
}

function handleEditProfileSubmit(inputValues) {
  userInfo.setUserInfo(inputValues);
  profileEditPopup.close();
}

// Add Card Modal
const addCardPopup = new PopupWithForm("#new-card-modal", handleAddCardSubmit);
addCardPopup.setEventListeners();
addCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});

function handleAddCardSubmit(inputValues) {
  const newCard = createCard(inputValues);
  section.addItem(newCard);
  addCardPopup.close();
}

// FORM VALIDATION

const editProfileFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationSettings, addCardForm);
addCardFormValidator.enableValidation();
