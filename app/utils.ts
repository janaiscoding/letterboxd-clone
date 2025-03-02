export enum PopupAction {
  WATCHED = "watch",
  FAVOURITE = "favourite",
  REMOVED = "removed",
  SUCCESS = "success",
  ERROR = "error",
}

export const createFavouritePopup = (title: string, action: PopupAction) => {
  const popupAlert = document.createElement("div");

  popupAlert.classList.add("popup");
  if (action === PopupAction.FAVOURITE) {
    popupAlert.innerText = `Added ${title} to favourites!`;
  } else if (action === PopupAction.ERROR) {
    popupAlert.innerText = `Sign in to add to favourites.`;
  } else if (action === PopupAction.REMOVED) {
    popupAlert.innerText = `Removed ${title} from favourites!`;
  }
  document.body.append(popupAlert);

  setTimeout(() => {
    popupAlert.remove();
  }, 1000);
};

export const createWatchedPopup = (title: string, action: PopupAction) => {
  const popupAlert = document.createElement("div");
  popupAlert.classList.add("popup");
  if (action === PopupAction.WATCHED) {
    popupAlert.innerText = `Added ${title} to watched list!`;
  } else if (action === PopupAction.ERROR) {
    popupAlert.innerText = `Sign in to add to watched list!`;
  } else if (action === PopupAction.REMOVED) {
    popupAlert.innerText = `Removed ${title} from watched list!`;
  }
  document.body.append(popupAlert);

  setTimeout(() => {
    popupAlert.remove();
  }, 1000);
};

export const createReviewPopup = (action: PopupAction) => {
  const popupAlert = document.createElement("div");

  popupAlert.classList.add("popup-review");
  if (action === PopupAction.ERROR) {
    popupAlert.innerText = `Your review cannot be empty!`;
  } else if (action === PopupAction.SUCCESS) {
    popupAlert.innerText = "Your review was successfully added!";
  } else if (action === PopupAction.REMOVED) {
    popupAlert.innerText = `Your review was successfully deleted!`;
  } else {
    popupAlert.innerText = `Your review could not be deleted!`;
  }
  document.body.append(popupAlert);
  setTimeout(() => {
    popupAlert.remove();
  }, 1000);
};
