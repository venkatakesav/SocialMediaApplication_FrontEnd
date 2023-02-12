import React from "react"

import Button from "../../shared/components/FormElements/Button"
import "./RelationItem.css"

function RelationItem(props) {
  return (
    <div className='Test'>
        <p>{props.name}</p>
    <Button inverse>REMOVE</Button></div>
  )
}
export default RelationItem