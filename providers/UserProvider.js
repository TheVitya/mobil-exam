import React, { createContext, useState, useContext, useEffect } from 'react';
import { MMKV } from 'react-native-mmkv';
import { MMKV_KEYS } from '../constants';

const storage = new MMKV();

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(storage.getString(MMKV_KEYS.USER) ? JSON.parse(storage.getString(MMKV_KEYS.USER)) : null);
  const [language, setLanguage] = useState(storage.getString(MMKV_KEYS.LANGUAGE) ?? "en");

  const login = (userData) => {
    setUser(userData);
    storage.set(MMKV_KEYS.USER, JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    storage.delete(MMKV_KEYS.USER);
  };

  const setPreferredLanguage = (lang) => {
    setLanguage(lang);
    storage.set(MMKV_KEYS.LANGUAGE, lang);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, language, setPreferredLanguage }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => useContext(UserContext);