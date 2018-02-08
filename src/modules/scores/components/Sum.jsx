import React from 'react'
import styled from 'styled-components'

const StyledSum = styled.span`
  font-weight: bold;
`

export default ({ value }) => <StyledSum>{value}</StyledSum>
