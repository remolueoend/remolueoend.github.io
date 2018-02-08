import React from 'react'
import MdDelete from 'react-icons/lib/md/clear'

const UserInput = ({ value, onChange, onDelete }) => (
  <div>
    <input type="text" value={value} onChange={e => onChange(e.target.value)} />
    <button onClick={onDelete}>
      <MdDelete />
    </button>
  </div>
)

export default UserInput
