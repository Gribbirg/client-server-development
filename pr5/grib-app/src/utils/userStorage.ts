interface StoredUser {
  username: string;
  password: string;
  email?: string;
  role: string;
}

const USERS_STORAGE_KEY = 'grib_app_users';

export const getStoredUsers = (): Record<string, StoredUser> => {
  if (typeof window === 'undefined') {
    return {};
  }
  
  const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
  return storedUsers ? JSON.parse(storedUsers) : {};
};

export const saveUser = (username: string, password: string, email?: string, role: string = 'user'): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  const users = getStoredUsers();
  
  users[username] = {
    username,
    password,
    email,
    role
  };
  
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const validateUser = (username: string, password: string): StoredUser | null => {
  const users = getStoredUsers();
  
  if (users[username] && users[username].password === password) {
    return users[username];
  }
  
  return null;
};

export const userExists = (username: string): boolean => {
  const users = getStoredUsers();
  return !!users[username];
};

export const initializeUserStorage = (): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  const users = getStoredUsers();
  
  if (Object.keys(users).length === 0) {
    saveUser('admin', 'password', 'admin@example.com', 'admin');
    saveUser('user', 'password', 'user@example.com', 'user');
  }
}; 