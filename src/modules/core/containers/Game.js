import React from 'react'
import { compose as recompose, withState, withStateHandlers } from 'recompose'
import { compose, pick, toPairs, fromPairs, map, reduce, keys } from 'ramda'
import Game from '../components/Game'
import { scoreTypesBottom, scoreTypesTop } from '../../../lib/consts'

const updateScoreTypeWithUsers = (scoreTypeTuple, users) => [
  scoreTypeTuple[0],
  {
    ...fromPairs(map(u => [u, 0], users)),
    ...scoreTypeTuple[1],
  },
]

const updateScoreTypes = scores =>
  reduce((acc, e) => ({ ...acc, [e]: {} }), scores, [
    ...scoreTypesTop,
    ...scoreTypesBottom,
  ])

const updateScoresWithUsers = (scores, users) =>
  compose(
    fromPairs,
    map(p => updateScoreTypeWithUsers(p, users)),
    toPairs,
    updateScoreTypes,
  )(scores)

const createStateHandler = (stateName, handlers, initValue) =>
  withStateHandlers(
    () => ({
      [stateName]: JSON.parse(
        localStorage.getItem(stateName) || JSON.stringify(initValue),
      ),
    }),
    compose(
      fromPairs,
      map(h => [
        h[0],
        s => v => {
          const ns = h[1](s)(v)
          keys(ns).map(sn => localStorage.setItem(sn, JSON.stringify(ns[sn])))
          return ns
        },
      ]),
      toPairs,
    )(handlers),
  )

export default recompose(
  createStateHandler(
    'scores',
    { setScores: () => v => ({ scores: v }) },
    updateScoresWithUsers({}, []),
  ),
  createStateHandler('mode', { setMode: () => v => ({ mode: v }) }, 'scores'),
  createStateHandler(
    'selected',
    { setSelected: () => v => ({ selected: v }) },
    [],
  ),
  createStateHandler(
    'users',
    {
      setUsers: ({ users, scores }) => value => ({
        users: value,
        scores: updateScoresWithUsers(scores || {}, value),
      }),
    },
    [],
  ),
)(Game)
