export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const logoutUser = () => {
  localStorage.removeItem('user');
};
