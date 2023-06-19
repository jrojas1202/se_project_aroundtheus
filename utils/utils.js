function closeModalOnRemoteClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.currentTarget);
  }
}

function closeModalOnKeyDown(evt) {
  if (evt.key === "Escape") {
    closeModal(evt.target);
  }
}
