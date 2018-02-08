import styled from 'styled-components'

export default C => styled(C)`
  background-color: ${({ active, selected }) =>
    active ? '#ddd' : selected ? '#aaa' : 'transparent'};
`
