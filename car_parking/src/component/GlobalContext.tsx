import React, { ReactNode, createContext, useState } from "react";
interface Slot{
  id:string;
  occupied:boolean;
  vehicleNumber ?: string;
  parkingTime ?: string;
  exitParkingTime ?: string;
}
interface ContextValueProps {
  data: Slot[];
  NumberOfSlots: number;
  handleData: (data: Slot[]) => void;
  handleNumberOfSlots: (number: number) => void;
}
interface GlobalContextProviderProps {
  children: ReactNode;
}

export const GlobalContext = createContext<ContextValueProps | undefined>(undefined);

const GlobalContextProvider: React.FC<GlobalContextProviderProps> = (props) => {
  const [data, setData] = useState<Slot[]>([]);
  const [NumberOfSlots,setNumberOfSlots] = useState<number>(0)
  const handleData: ContextValueProps["handleData"] = (newData) => {
    setData(newData);
  };
  const handleNumberOfSlots: ContextValueProps["handleNumberOfSlots"] = (value:number)=>{
    setNumberOfSlots(value)
  }
  const value :ContextValueProps= {
    data,
    NumberOfSlots,
    handleData,
    handleNumberOfSlots
  };



  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
