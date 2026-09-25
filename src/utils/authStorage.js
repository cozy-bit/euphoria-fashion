const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";
const RESET_PHONE_KEY = "resetPhone";

// ==================== USERS ====================

export const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
};

export const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// ==================== REGISTER ====================

export const registerUser = (phone) => {
  const users = getUsers();

  const exists = users.some((user) => user.phone === phone);

  if (exists) {
    return {
      success: false,
      message: "This phone number is already registered.",
    };
  }

  const newUser = {
    id: Date.now(),
    phone,
  };

  users.push(newUser);

  saveUsers(users);

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

  return {
    success: true,
    user: newUser,
  };
};

// ==================== LOGIN ====================

export const loginUser = (phone) => {
  const users = getUsers();

  const user = users.find((item) => item.phone === phone);

  if (!user) {
    return {
      success: false,
      message: "This phone number is not registered.",
    };
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

  return {
    success: true,
    user,
  };
};

// ==================== CURRENT USER ====================

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || "null");
  } catch {
    return null;
  }
};

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// ==================== RESET ====================

export const getResetPhone = () => {
  return localStorage.getItem(RESET_PHONE_KEY);
};

export const setResetPhone = (phone) => {
  localStorage.setItem(RESET_PHONE_KEY, phone);
};

export const clearResetPhone = () => {
  localStorage.removeItem(RESET_PHONE_KEY);
};