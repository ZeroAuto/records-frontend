import React, { useEffect, useState } from 'react';

import { getUserFromLocalStore } from '../utils/auth.js';

const AppContext = React.createContext();

const AppContextProvider= (props) => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const user = getUserFromLocalStore();
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
