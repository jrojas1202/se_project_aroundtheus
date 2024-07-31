import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "./index.css";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupConfirmation.js";
import {
  formValidationConfig,
  imageCloseButton,
  imageModalWindow,
  addModalForm,
  addModalButton,
  addModalBox,
  profileDescriptionInput,
  profileTitleInput,
  profileEditForm,
  profileModalCloseButton,
  profileEditButton,
  profileModalBox,
  aviForm,
} from "../utils/utils.js";

const userInfoEl = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

/*---------- API ----------*/
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "92f7ebfa-9e8e-4fb8-b0a3-1cdaa15ccbe0",
    "Content-Type": "application/json",
  },
});
let sectionEl;
let currentUserId;
api
  .getAppInfo()
  .then(([userData, cardData]) => {
    currentUserId = userData._id;
    userInfoEl.setUserInfo({ name: userData.name, job: userData.about });
    userInfoEl.setAvatarInfo(userData.avatar);

    sectionEl = new Section(
      {
        items: cardData,

        renderer: (data) => {
          const card = createCard(data);
          sectionEl.addItem(card);
        },
      },
      ".cards__list"
    );
    sectionEl.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

function createCard(data) {
  const card = new Card({
    data,
    cardSelector: "#card-template",
    currentUserId,
    handlePreviewImage: () => {
      imagePopup.open(data);
    },
    handleLikeCard: (shouldRemoveLike) => {
      if (shouldRemoveLike) {
        api
          .removeLike(data._id)
          .then((data) => {
            card.updateLikes(data.isLiked);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addLike(data._id)
          .then((data) => {
            card.updateLikes(data.isLiked);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    handleDeleteCard: (cardId) => {
      deletePopup.open();
      deletePopup.setSubmitAction(() => {
        deletePopup.renderLoading(true);
        api
          .deleteCard(cardId)
          .then(() => {
            card.deleteClick();
            deletePopup.close();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            deletePopup.renderLoading(false);
          });
      });
    },
  });
  return card.generateCard();
}

const addFormValidator = new FormValidator(addModalForm, formValidationConfig);
addFormValidator.enableValidation();

const profileFormValidator = new FormValidator(
  profileEditForm,
  formValidationConfig
);
profileFormValidator.enableValidation();

const aviFormValidator = new FormValidator(aviForm, formValidationConfig);
aviFormValidator.enableValidation();

const deletePopup = new PopupWithConfirmation("#delete-popup");
deletePopup.setEventListeners();

const editFormModal = new PopupWithForm("#modal", (inputValues) => {
  editFormModal.renderLoading(true);
  api
    .editProfile(inputValues)
    .then(() => {
      userInfoEl.setUserInfo({
        name: inputValues.name,
        job: inputValues.description,
      });
      editFormModal.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editFormModal.renderLoading(false);
    });
});
editFormModal.setEventListeners();

const addFormModal = new PopupWithForm("#add-popup", (inputValues) => {
  addFormModal.renderLoading(true);
  api
    .addNewCard(inputValues)
    .then((data) => {
      const card = createCard(data);
      sectionEl.addItem(card);
      addFormModal.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addFormModal.renderLoading(false);
    });
});
addFormModal.setEventListeners();

const updateProfileForm = new PopupWithForm("#avi-popup", (inputValues) => {
  updateProfileForm.renderLoading(true);
  api
    .updateProfilePicture(inputValues)
    .then((value) => {
      userInfoEl.setAvatarInfo(value.avatar);
      updateProfileForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      updateProfileForm.renderLoading(false);
    });
});
updateProfileForm.setEventListeners();

const profileEdit = document.querySelector(".profile__image");
profileEdit.addEventListener("click", () => {
  updateProfileForm.open();
  aviFormValidator.resetValidation();
});

const imagePopup = new PopupWithImage("#preview-popup");
imagePopup.setEventListeners();

function openProfileModal() {
  const { name, job } = userInfoEl.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = job;
  profileFormValidator.resetValidation();
  editFormModal.open();
}
profileEditButton.addEventListener("click", openProfileModal);
addModalButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addFormModal.open();
});

function closeProfileModal() {
  editFormModal.close();
}
