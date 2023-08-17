export default class UserInfo {
  constructor(selectors) {
    this.nameElement = document.querySelector(selectors.userNameSelector);
    this.jobElement = document.querySelector(selectors.userTitleSelector);
  }

  getUserInfo() {
    return {
      name: this.nameElement.textContent,
      job: this.jobElement.textContent,
    };
  }

  setUserInfo(user) {
    this.nameElement.textContent = user.name;
    this.jobElement.textContent = user.job;
  }
}
