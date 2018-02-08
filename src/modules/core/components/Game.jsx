import React from 'react'
import ScoreTable from '../../scores/components/ScoreTable'
import UserList from '../../users/components/UserList'

const Game = ({
  setScores,
  setUsers,
  users,
  scores,
  mode,
  setMode,
  selected,
  setSelected,
}) =>
  mode === 'scores' ? (
    <div>
      <ScoreTable
        users={users}
        scores={scores}
        onChange={s => setScores(s)}
        selected={selected}
        setSelected={setSelected}
      />
      <button onClick={() => setMode('users')}>Edit Users</button>
    </div>
  ) : (
    <UserList
      users={users}
      onChange={u => setUsers(u)}
      onSave={() => setMode('scores')}
    />
  )

export default Game
