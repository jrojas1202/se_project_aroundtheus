import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { validationSettings, addCardForm } from "../scripts/validation.js";
import { openModal, closeModal } from "../utils/utils.js";

// CARD LINKS
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// WRAPPERS
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseModal = document.querySelector("#profile-close-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const modalContainer = document.querySelector(".modal__container");

// IMAGES
const imageProfileModal = document.querySelector("#image-modal");
const closeImageModalButton = imageProfileModal.querySelector(".modal__close");

// BUTTONS AND OTHER DOM NODES
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");

// SAVE
const profileSaveButton = document.getElementById("profileSaveButton");
const cardSaveButton = document.getElementById("addCardSaveButton");

// DEFINE IMAGE and TITLE
const modalImageElement = document.querySelector(".modal__image");
const modalTitleElement = document.querySelector(".modal__image_title");

// Clone the template element and its content
const template = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// Get cards list elements
const cardsList = document.querySelector(".cards__list");

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

function getCardElement(data) {
  const card = new Card(data, "#card-template");
  return card.getView();

  //Card title and images acceptance
  //   const titleElement = cardElement.querySelector(".card__title");
  //   const imageElement = cardElement.querySelector(".card__image");
  //   const likeButton = cardElement.querySelector(".card__like-button");
  //   const deleteButton = cardElement.querySelector(".card__delete-button");

  //   likeButton.addEventListener("click", () => {
  //     likeButton.classList.toggle("card__like-button_active");
  //   });

  //   deleteButton.addEventListener("click", () => {
  //     cardElement.remove();
  //   });

  //   imageElement.addEventListener("click", () => {
  //     modalImageElement.setAttribute("src", imageElement.getAttribute("src"));
  //     modalImageElement.alt = data.name;
  //     modalTitleElement.textContent = data.name;
  //     openModal(document.querySelector("#image-modal"));
  //   });

  //   titleElement.textContent = data.name;

  //   imageElement.src = data.link;
  //   imageElement.alt = data.name;

  //   return cardElement;
}

// Render initial cards data
function renderInitialCards(initialCards) {
  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsList.appendChild(cardElement);
  });
}

renderInitialCards(initialCards);

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
