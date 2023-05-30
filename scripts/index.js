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

function getCardElement(data) {
  const cardElement = template.cloneNode(true);

  //Access the card title and image elements
  const titleElement = cardElement.querySelector(".card__title");
  const imageElement = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  imageElement.addEventListener("click", () => {
    modalImageElement.setAttribute("src", imageElement.getAttribute("src"));
    modalImageElement.alt = data.name;
    modalTitleElement.textContent = data.name;
    openModal(document.querySelector("#image-modal"));
  });

  titleElement.textContent = data.name;

  imageElement.src = data.link;
  imageElement.alt = data.name;

  return cardElement;
}

function renderInitialCards(initialCards) {
  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsList.appendChild(cardElement);
  });
}

renderInitialCards(initialCards);

function handleEscape(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

const profileFormElement = profileEditModal.querySelector(".modal__form");
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function handleProfileFormSubmit(event) {
  event.preventDefault();

  // New values added
  const newTitle = titleInput.value;
  const newDescription = descriptionInput.value;

  // Update with new values
  profileTitle.textContent = newTitle;
  profileDescription.textContent = newDescription;

  closeModal(profileEditModal);
}

const addCardModalButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const addCardFromElement = addCardModal.querySelector(".modal__form");
const cardTitleInput = addCardFromElement.querySelector(".modal__input-title");
const cardUrlInput = addCardFromElement.querySelector(".modal__input-link");

function handleAddCardFormSubmit(event) {
  event.preventDefault();

  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const addCardSubmitButton = document.getElementById("addCardSaveButton");

  renderCard({ name, link });
  closeModal(addCardModal);
  addCardFromElement.reset();
  toggleButtonState(
    [cardTitleInput, cardUrlInput],
    addCardSubmitButton,
    config
  );
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
addCardModalButton.addEventListener("click", () => openModal(addCardModal));
profileEditButton.addEventListener("click", () => {
  fillProfileForm(profileEditModal);
  openEditProfileModal();
});

addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);
profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
closeImageModalButton.addEventListener("click", () => {
  closeModal(imageProfileModal);
});
