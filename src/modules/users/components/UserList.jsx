import React from 'react'
import UserInput from './UserInput'
import MdAdd from 'react-icons/lib/md/add'
import { update, remove } from 'ramda'

const validUsers = users =>
  users && users.length > 1 && users.every(u => u.trim().length > 0)

const UserList = ({ users, onChange, onSave }) => {
  return (
    <div>
      {users.map((u, i) => (
        <UserInput
          key={i}
          onChange={v => onChange(update(i, v, users))}
          onDelete={v => onChange(remove(i, 1, users))}
          value={u}
        />
      ))}
      <button onClick={() => onChange([...users, ''])}>
        <MdAdd />
      </button>
      <br />
      <button onClick={onSave} disabled={!validUsers(users)}>
        Save
      </button>
    </div>
  )
}

export default UserList
