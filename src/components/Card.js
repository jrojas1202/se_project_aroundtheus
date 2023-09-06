export default class Card {
  constructor({
    data,
    cardSelector,
    handlePreviewImage,
    handleLikeCard,
    currentUserId,
    handleDeleteCard,
    owner,
  }) {
    this._name = data.name;
    this._link = data.link;
    this._isLiked = !!data.isLiked;
    this._id = data._id;

    this._cardSelector = cardSelector;
    this._handleImageClick = handlePreviewImage;
    this._handleLikeCard = handleLikeCard;
    this._currentUserId = currentUserId;
    this._owner = data.owner._id;
    this._handleDeleteCard = handleDeleteCard;
    console.log(this._owner);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
    return cardElement;
  }

  deleteClick() {
    this._element.remove();
  }

  updateLikes(isLiked) {
    this._isLiked = isLiked;
    this.renderLikes();
  }

  renderLikes() {
    // this._cardLikes.textContent = this._likes.length;
    const isLiked = this.isLiked();
    if (isLiked) {
      this.likeButton.classList.add("card__like-button_active");
    } else {
      this.likeButton.classList.remove("card__like-button_active");
    }
  }

  isLiked() {
    return this._isLiked;
  }

  _checkIdForDelete() {
    if (this._owner === this._currentUserId) {
      this.addTrash();
    } else {
      this.removeTrash();
    }
  }

  addTrash() {
    this.cardTrashButton.classList.remove("card__trash-button_active");
  }

  removeTrash() {
    this.cardTrashButton.classList.add("card__trash-button_active");
  }

  _setEventListeners() {
    this.likeButton.addEventListener("click", () =>
      this._handleLikeCard(this.isLiked())
    );
    this.cardTrashButton.addEventListener("click", () => {
      this._handleDeleteCard(this._id);
    });
    this.cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this.likeButton = this._element.querySelector(".card__like-button");
    this.cardTrashButton = this._element.querySelector(".card__trash-button");
    this.cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__title");
    this.cardImage.src = this._link;
    this.cardImage.alt = this._name;
    cardTitle.textContent = this._name;
    this._cardLikes = this._element.querySelector(".card__likes-counter");
    this.renderLikes();
    this._setEventListeners();
    this._checkIdForDelete();
    return this._element;
  }
}
