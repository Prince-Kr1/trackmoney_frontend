import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Restore user from localStorage when app loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout user
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, setUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
