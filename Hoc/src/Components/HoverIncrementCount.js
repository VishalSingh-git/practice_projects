import React, { useState } from 'react'
import HOC from './HOC'

const HoverIncrementCount = (props) => {

const {count,handleIncrement}=props


  return (<>
    <button onMouseOver={handleIncrement} >HoverIncrementCount</button><h3>:{count}</h3>
    </>
  )
}

export default HOC(HoverIncrementCount,10)
