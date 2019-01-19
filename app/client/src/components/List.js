import React from 'react'

const List = ({ list, onRemoveList = f => f }) =>
  <div className="single-list" key={list.id}>
    <h4>{list.title}</h4>
    <p>{list.excerpt}</p>
    <button onClick={() => onRemoveList(list.id)}>Remove</button>
    <hr />
  </div>

export default List