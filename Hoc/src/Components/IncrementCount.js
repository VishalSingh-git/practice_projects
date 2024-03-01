import React from 'react'
import HOC from './HOC'

const IncrementCount = (props) => {
  const {count,handleIncrement}=props


  return (<>
    <button  onClick={handleIncrement}>IncrementCount</button><h3>:{count}</h3>
    </>
  )
}

export default HOC(IncrementCount,5)
