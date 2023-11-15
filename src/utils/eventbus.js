const on = (event, callback) => {
  document.addEventListener(event, callback);
}

const remove = (event, callback) => {
  document.removeEventListener(event, callback);
}

const dispatch = (event, data) => {
  const eventName = new CustomEvent(event, { data: data })
  document.dispatchEvent(eventName);
}

export { on , remove, dispatch }
