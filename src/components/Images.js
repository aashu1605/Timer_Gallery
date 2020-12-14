import React from "react"

const Images =(props) =>{
  return(
    <div className="images">
    <img src={props.url}  alt={props.url}/>
    </div>
  )
}
export default Images
