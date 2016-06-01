/**
* Shared set of utilities to handle operations against the `window` object
*/

function changeLocation (url) {
  window.location = url;
}

function replaceLocation (url) {
  window.location.replace(url);
}

export default {
  changeLocation,
  replaceLocation,
};
