import React, { useState } from 'react'
import Model from './model'

export default function ModelTest() {
  const[showModel,setShowModel]=useState(false)
  function handlModel(){
    setShowModel(!showModel)
  }  

  return (
    <div>
      <button onClick={handlModel}>Modal Pop up</button>
      {showModel && <Model handlModel={handlModel}/>}
    </div>
  )
}
