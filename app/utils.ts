export enum PopupAction {
  WATCHED = "watch",
  FAVOURITE = "favourite",
  ERROR = "error",
  REMOVED = "removed",
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
