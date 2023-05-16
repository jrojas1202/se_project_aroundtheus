// WRAPPERS
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseModal = document.querySelector("#profile-close-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const modalContainer = document.querySelector(".modal__container");

// BUTTONS AND OTHER DOM NODES
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");

const imageProfileModal = document.querySelector("#image-modal");

// FORM INPUT DATA
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// FUNCTIONS

function handleEscape(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

// Define for OpenModal Function
const editButton = document.querySelector(".profile__edit-button");

// Definitions for saveAndClose Function
const saveButton = document.querySelector(".modal__button");

// Get the cards list element
const cardsList = document.querySelector(".cards__list");

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

// Call the renderInitialCards function to populate the initial cards on page load

function openEditProfileModal() {
  openModal(profileEditModal);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handProfileFormSubmit(event) {
  event.preventDefault();

  // New Values entered
  const newTitle = titleInput.value;
  const newDescription = descriptionInput.value;

  // Update the values
  profileTitle.textContent = newTitle;
  profileDescription.textContent = newDescription;

  closeModal(profileEditModal);
}

// Event Listeners

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
