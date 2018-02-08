import React from 'react'
import styled from 'styled-components'
import ColoredCell from './ColoredCell'

const EntryInput = ({ value, onChange, onClose, className }) => {
  const updateValue = (e, value) => {
    e.stopPropagation()
    onChange(value)
  }
  return (
    <div onClick={() => onClose()} className={className}>
      <table style={{ minWidth: '100px', margin: '0 auto' }}>
        <tr>
          <td />
          <td>
            <button onClick={e => updateValue(e, value + 10)}>+10</button>
          </td>
          <td />
        </tr>
        <tr>
          <td>
            <button onClick={e => updateValue(e, value - 1)}>-1</button>
          </td>
          <td style={{ textAlign: 'center' }}>{value}</td>
          <td>
            <button onClick={e => updateValue(e, value + 1)}>+1</button>
          </td>
        </tr>
        <tr>
          <td />
          <td>
            <button onClick={e => updateValue(e, value - 10)}>-10</button>
          </td>
          <td />
        </tr>
      </table>
    </div>
  )
}

const StyledEntryInput = styled(EntryInput)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;
`

const EntryValue = ({ value, onSelect, className }) => (
  <div className={className} onClick={() => onSelect()}>
    {value}
  </div>
)
const StyledEntryValue = ColoredCell(styled(EntryValue)`
  cursor: 'pointer';
`)

export default ({
  value,
  onChange,
  onSelect,
  selected,
  active,
  setOpen,
  open,
}) =>
  open ? (
    <StyledEntryInput
      value={value}
      onChange={onChange}
      onClose={() => setOpen(false)}
    />
  ) : (
    <StyledEntryValue
      value={value}
      onSelect={() => (active ? setOpen(true) : onSelect())}
      active={active}
      selected={selected}
    />
  )
