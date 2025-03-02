export const addUserToLocalStore = user => {
  sessionStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromLocalStore = () => {
  sessionStorage.removeItem('user');
};

export const getUserFromLocalStore = () => {
  return JSON.parse(sessionStorage.getItem('user'));
};
