import React from 'react'
import "./hover.css"
export default function Suggest({data,handlclick}) {
  return (
    <div>
        <ul>
      {data.map(
        (item,idx)=> <li key={idx} onClick={handlclick} >{item}</li>
      )}
      </ul>
    </div>
  )
}
