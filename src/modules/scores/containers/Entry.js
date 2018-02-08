import Entry from '../components/Entry'
import { compose as recompose, withState } from 'recompose'

export default recompose(withState('open', 'setOpen', false))(Entry)
