import { createContext, useState } from "react";

const UserContext = createContext({
  progess: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckOut: () => {},
  hideCheckOut: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [userProgess, setUserProgess] = useState("");

  function showCart() {
    return setUserProgess("cart");
  }

  function hideCart() {
    return setUserProgess("");
  }

  function showCheckOut() {
    return setUserProgess("checkout");
  }

  function hideCheckOut() {
    return setUserProgess("");
  }

  const userContext = {
    progess: userProgess,
    showCart,
    hideCart,
    showCheckOut,
    hideCheckOut,
  };

  return (
    <>
      <UserContext.Provider value={userContext}>
        {children}
      </UserContext.Provider>
    </>
  );
};

export default UserContext;
