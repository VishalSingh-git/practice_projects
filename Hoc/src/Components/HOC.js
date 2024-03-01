import React, { useState } from "react";

const HOC = (OldComponent,inc=0) => {
const EnhancedComponent=()=> {
    const [count, setCount] = useState(0);
    const handleIncrement = () => {
      setCount(count + inc);
    };

    return <OldComponent count={count} handleIncrement={handleIncrement} />;
  };

  return EnhancedComponent
};

export default HOC;
