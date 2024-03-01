import React from 'react'
import "./App.css"
import IncrementCount from './Components/IncrementCount'
import HoverIncrementCount from './Components/HoverIncrementCount'

function App(){
  return (
    <div className='App'>
      <IncrementCount/>
      <HoverIncrementCount/>
    </div>
  )
}

export default App
