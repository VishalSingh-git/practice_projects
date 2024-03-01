import React, { createContext, useState } from "react";

// Specify the type for the context
interface UserContextType {
  data: any;
  handleData: (newData: any) => void;
}

// interface UserData {

//   name: string;
//   ema
// }

export const UserContext = createContext<UserContextType | undefined>(undefined);

const UserContextProvider = (props: any) => {
  const [data, setData] = useState<any>(null);

  const handleData = (newData: any) => {
    setData(newData);
  };

  const value: UserContextType = {
    data,
    handleData,
  };

  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
