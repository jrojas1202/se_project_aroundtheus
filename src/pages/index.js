import Section from "../components/Section.js";
import Card from "../components/Card.js";
import popupWithImage from "../components/PopupwithImage.js";
import PopupWithForm from "../components/Popupwithform.js";
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
import { openModal, closeModal } from "../utils/utils.js";

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
  const { title, description } = inputValues;
  const newCardData = {
    name: title,
    link: description,
  };
  const newCard = createCard(newCardData);
  section.addItem(newCard);
  addCardPopup.close();
}
// WRAPPERS
const profileCloseModal = document.querySelector("#profile-close-modal");
const modalContainer = document.querySelector(".modal__container");

// IMAGES
const imageProfileModal = document.querySelector("#image-modal");
const closeImageModalButton = imageProfileModal.querySelector(".modal__close");

// BUTTONS AND OTHER DOM NODES
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");

// SAVE
const profileSaveButton = document.getElementById("profileSaveButton");
const cardSaveButton = document.getElementById("addCardSaveButton");

// DEFINE IMAGE and TITLE
const modalImageElement = document.querySelector(".modal__image");
const modalTitleElement = document.querySelector(".modal__image_title");

// FORM INPUT DATA
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const titleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const descriptionInput = document.querySelector("#profile-description-input");

// FUNCTIONS

const profileFormElement = profileEditModal.querySelector(".modal__form");
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// HANDLE FUNCTIONS

function handleProfileFormSubmit(event) {
  event.preventDefault();

  // New values
  const newTitle = titleInput.value;
  const newDescription = descriptionInput.value;

  // Updates to values
  profileTitle.textContent = newTitle;
  profileDescription.textContent = newDescription;

  closeModal(profileEditModal);
}

const addCardModalButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#new-card-modal");
const addCardModalCloseButton = newCardModal.querySelector(".modal__close");
const addCardFromElement = newCardModal.querySelector(".modal__form");
const cardTitleInput = addCardFromElement.querySelector(".modal__input-title");
const cardUrlInput = addCardFromElement.querySelector(".modal__input-link");

// Add Card submit Function

function handleAddCardFormSubmit(event) {
  event.preventDefault();

  const name = cardTitleInput.value;
  const link = cardUrlInput.value;

  renderCard({ name, link });
  closeModal(newCardModal);
  addCardFromElement.reset();

  const addCardSubmitButton = document.getElementById("addCardSaveButton");
  const inputElements = [cardTitleInput, cardUrlInput];

  addCardFormValidator.resetValidation();
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardsList.prepend(cardElement);
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function openEditProfileModal() {
  openModal(profileEditModal);
}

// Event Listeners
addCardFromElement.addEventListener("submit", handleAddCardFormSubmit);
addCardModalButton.addEventListener("click", () => openModal(newCardModal));
profileEditButton.addEventListener("click", () => {
  fillProfileForm(profileEditModal);
  openEditProfileModal();
});

addCardModalCloseButton.addEventListener("click", () =>
  closeModal(newCardModal)
);
profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
closeImageModalButton.addEventListener("click", () => {
  closeModal(imageProfileModal);
});

// FORM VALIDATION

const editProfileFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationSettings, addCardForm);
addCardFormValidator.enableValidation();
