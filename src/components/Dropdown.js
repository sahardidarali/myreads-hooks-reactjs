import React, { useState, useEffect } from 'react';


function Dropdown(props) {
  const { book, shelf,onMove } = props
  const [value, setValue] = useState(shelf)
  //  console.log(book);
  //  console.log(shelf);
  useEffect(() => {
    onMove(book, value)

  }, [value])
  return (
    <div>
      <div className="book-shelf-changer">
        <select value={value} onChange={e => setValue(e.target.value)}>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
  )
}

export default Dropdown

