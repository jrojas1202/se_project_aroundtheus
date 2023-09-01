import Section from "../components/Section.js";
import Card from "../components/Card.js";
import popupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";
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
  cardData,
  cardSelector,
  profileEditButton,
  addCardButton,
  addCardTitleField,
  addCardImageLinkField,
  profileEditModal,
  profileEditForm,
} from "../utils/constant.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  authToken: "92f7ebfa-9e8e-4fb8-b0a3-1cdaa15ccbe0",
});

//CARD SECTION
let section;

api.getCardList().then((cardData) => {
  console.log(cardData);
  section = new Section(
    {
      items: cardData,
      renderer: (cardData) => {
        const card = createCard(cardData);
        section.addItem(card);
      },
    },
    cardsList
  );
  section.renderItems();
});

function createCard(cardData) {
  const card = new Card(cardData, cardSelector, handleCardClick, (cardID) =>
    handleDeleteCardClick(cardID, card)
  );
  return card.getView();
}

function handleCardClick(cardData) {
  previewImagePopup.open(cardData);
}

function handleDeleteCardClick(cardID, card) {
  api.removeCard(cardID).then((res) => {
    card._handleDeleteCard();
  });
}

//USER INFO
const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userTitleSelector: ".profile__description",
});

api.getUserInfo().then((user) => {
  userInfo.setUserInfo({
    name: user.name,
    job: user.about,
  });
});

//Profile pic change
// Assuming you have an input field where users can select a new profile picture
const profilePictureInput = document.querySelector("#profile-picture-input");

// Add an event listener to the input field to handle the file selection
profilePictureInput.addEventListener("change", (event) => {
  const file = event.target.files[0]; // Assuming you allow users to select only one file

  // Check if a file was selected
  if (file) {
    // You may want to upload the selected file to a server or cloud storage first and get the URL
    // After uploading, get the URL of the uploaded image

    // Assuming you have the URL of the new profile picture in a variable called newProfilePictureUrl
    api
      .updateProfilePicture(newProfilePictureUrl)
      .then((res) => {
        // Handle a successful update (e.g., update the UI to display the new profile picture)
        console.log("Profile picture updated successfully");
      })
      .catch((error) => {
        // Handle errors if the update fails
        console.error("Error updating profile picture:", error);
      });
  }
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
  api.addCard(inputValues).then((res) => {
    const newCard = createCard(res);
    section.addItem(newCard);
    addCardPopup.close();
  });
}

// FORM VALIDATION

const editProfileFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationSettings, addCardForm);
addCardFormValidator.enableValidation();
