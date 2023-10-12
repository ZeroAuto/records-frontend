import React, { useState } from 'react';

const AppContext = React.createContext();

const AppContextProvider= (props) => {
  const [currentUser, setCurrentUser] = useState();

  return (
    <AppContext.Provider value={[currentUser, setCurrentUser]}>
      {props.children}
    </AppContext.Provider>
  )
}

export { AppContext, AppContextProvider };
