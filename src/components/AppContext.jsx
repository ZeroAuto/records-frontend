import React, { useEffect, useState } from 'react';

const AppContext = React.createContext();

const AppContextProvider= (props) => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <AppContext.Provider value={[currentUser, setCurrentUser]}>
      {props.children}
    </AppContext.Provider>
  )
}

export { AppContext, AppContextProvider };
