import React from 'react'
import { scoreTypesTop, scoreTypesBottom } from '../../../lib/consts'
import { getTopSum, getTotalSum, getSubTotal } from '../../../lib/scores'
import Entry from '../containers/Entry'
import { assocPath } from 'ramda'
import ColoredCell from './ColoredCell'
import t from '../../../lib/translations'
import styled from 'styled-components'

const ColoredLabel = ColoredCell(({ text, className }) => (
  <BorderCell className={className}>{text}</BorderCell>
))

const BorderCell = styled.td`
  border: 1px solid #ddd;
`

const ReadonlyRow = styled.tr`
  background-color: #eee;
  font-weight: bold;
`

const printScoreRows = (
  scores,
  scoreTypes,
  onChange,
  setSelected,
  selected,
) => (
  <tbody>
    {scoreTypes.map((st, ti) => (
      <tr key={ti}>
        <ColoredLabel text={t(st)} selected={selected[0] === st} />
        {Object.keys(scores[st] || {}).map(u => (
          <BorderCell key={u}>
            <Entry
              value={scores[st][u]}
              onChange={v => onChange(assocPath([st, u], v, scores))}
              onSelect={() => setSelected([st, u])}
              selected={selected[0] === st || selected[1] === u}
              active={selected[0] === st && selected[1] === u}
            />
          </BorderCell>
        ))}
      </tr>
    ))}
  </tbody>
)

/**
 * Renders a score table for the given score state and user list.
 *
 * @param {{ scores: {[scoreType: string]: {[user: string]: number}}, users: string[] }}
 */
const ScoreTable = ({ scores, users, onChange, setSelected, selected }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        <BorderCell />
        {users.map(u => (
          <ColoredLabel text={u} key={u} selected={selected[1] === u} />
        ))}
      </tr>
    </thead>
    {printScoreRows(scores, scoreTypesTop, onChange, setSelected, selected)}
    <tbody>
      <ReadonlyRow>
        <BorderCell>Bonus</BorderCell>
        {users.map(u => (
          <BorderCell key={u}>{getTopSum(scores, u) >= 63 ? 35 : 0}</BorderCell>
        ))}
      </ReadonlyRow>
      <ReadonlyRow>
        <BorderCell>Sum</BorderCell>
        {users.map(u => (
          <BorderCell key={u}>{getSubTotal(scores, u)}</BorderCell>
        ))}
      </ReadonlyRow>
    </tbody>
    {printScoreRows(scores, scoreTypesBottom, onChange, setSelected, selected)}
    <tbody>
      <ReadonlyRow>
        <BorderCell>Sum</BorderCell>
        {users.map(u => (
          <BorderCell key={u}>{getTotalSum(scores, u)}</BorderCell>
        ))}
      </ReadonlyRow>
    </tbody>
  </table>
)

export default ScoreTable
