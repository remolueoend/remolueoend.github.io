import { compose, prop, values, map, sum, pick } from 'ramda'
import { scoreTypesBottom, scoreTypesTop } from './consts'

export const getScoreTypeSum = (scores, types, user) =>
  compose(sum, map(prop(user)), values, pick(types))(scores)

export const getTopSum = (scores, user) =>
  getScoreTypeSum(scores, scoreTypesTop, user)

export const getSubTotal = (scores, user) => {
  const sum = getTopSum(scores, user)
  return sum >= 63 ? sum + 35 : sum
}

export const getTotalSum = (scores, user) =>
  getSubTotal(scores, user) + getScoreTypeSum(scores, scoreTypesBottom, user)
