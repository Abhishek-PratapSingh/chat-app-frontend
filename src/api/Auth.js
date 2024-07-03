export const registerUser = async (username, email, password) => {
  const response = await fetch(process.env.REACT_APP_USER_REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });
  return await response.json();
};

export const loginUser = async (identifier, password) => {
  const response = await fetch(process.env.REACT_APP_USER_LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ identifier, password }),
  });
  return await response.json();
};

export const logoutUser = () => {
  localStorage.removeItem('jwt');
};
