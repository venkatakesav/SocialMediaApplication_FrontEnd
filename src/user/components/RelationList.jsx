import React from "react"
import RelationItem from "./RelationItem"

function RelationList(props) {
  if (props.items.length === 0) {
    return (
      <h2>No Followers Found!!!</h2>
    )
  }

  return (
    <ul>
      {props.items.map((item) => (
        <RelationItem
          key={item.id}
          name={item.name}
        >
        </RelationItem>
      ))}
    </ul>
  )
}
export default RelationList