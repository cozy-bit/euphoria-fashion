const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

export const getUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
};

export const registerUser = (email, password) => {
  const users = getUsers();

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.email === normalizedEmail
  );

  if (existingUser) {
    return {
      success: false,
      message: "This email is already registered.",
    };
  }

  const newUser = {
    id: Date.now(),
    email: normalizedEmail,
    password,
  };

  users.push(newUser);

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(newUser)
  );

  return {
    success: true,
    user: newUser,
  };
};

export const loginUser = (email, password) => {
  const users = getUsers();

  const normalizedEmail = email.trim().toLowerCase();

  const user = users.find(
    (item) =>
      item.email === normalizedEmail &&
      item.password === password
  );

  if (!user) {
    return {
      success: false,
      message: "Incorrect email or password.",
    };
  }

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(user)
  );

  return {
    success: true,
    user,
  };
};

export const getCurrentUser = () => {
  return JSON.parse(
    localStorage.getItem(CURRENT_USER_KEY) || "null"
  );
};

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};