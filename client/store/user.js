import axios from 'axios'
import history from '../history'
import {IEXClient} from 'iex-api'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const buyStock = (symbol, quantity, availableCash) => async dispatch => {
  try {
    const fetch = window.fetch.bind(window)
    const iex = new IEXClient(fetch)
    let apiRes = await iex.stockQuote(symbol)
    let price = apiRes.latestPrice
    if (
      typeof apiRes !== 'string' &&
      quantity > 0 &&
      quantity * price <= availableCash
    ) {
      const resTrade = await axios.post('/api/trades/', {
        symbol,
        quantity,
        price
      })
      if (resTrade.data.id) {
        const resUser = await axios.get('/auth/me')
        dispatch(getUser(resUser.data || defaultUser))
      }
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
