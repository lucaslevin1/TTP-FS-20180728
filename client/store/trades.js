import {getUser} from './user'
import {IEXClient} from 'iex-api'
import axios from 'axios'

const QUANTITY_ERROR = 'QUANTITY_ERROR'
const SYMBOL_ERROR = 'SYMBOL_ERROR'
const OVERAGE_ERROR = 'OVERAGE_ERROR'
const RESET_ERRORS = 'RESET_ERRORS'

const intitialState = {
  quantityError: false,
  symbolError: false,
  overageError: false
}

const resetState = () => ({
  type: RESET_ERRORS
})

const quantityError = val => ({
  type: QUANTITY_ERROR,
  val
})

const symbolError = val => ({
  type: SYMBOL_ERROR,
  val
})

const overageError = val => ({
  type: OVERAGE_ERROR,
  val
})

export const buyStock = (symbol, quantity, availableCash) => async dispatch => {
  try {
    const fetch = window.fetch.bind(window)
    const iex = new IEXClient(fetch)
    const apiRes = await iex.stockQuote(symbol)
    const price = apiRes.latestPrice
    const resCheck = typeof apiRes !== 'string'
    const quantityCheck = quantity > 0 && !(quantity % 1)
    let cashCheck = true
    if (resCheck && quantityCheck) {
      cashCheck = quantity * price <= availableCash
    }
    if (resCheck && quantityCheck && cashCheck) {
      const resTrade = await axios.post('/api/trades/', {
        symbol,
        quantity,
        price
      })
      const resUser = await axios.get('/auth/me')
      dispatch(getUser(resUser.data))
      dispatch(resetState())
    } else {
      dispatch(symbolError(!resCheck))
      dispatch(quantityError(!quantityCheck))
      dispatch(overageError(!cashCheck))
    }
  } catch (error) {
    console.error(error)
  }
}

export default function(state = intitialState, action) {
  switch (action.type) {
    case RESET_ERRORS:
      return intitialState
    case QUANTITY_ERROR:
      return {...state, quantityError: action.val}
    case SYMBOL_ERROR:
      return {...state, symbolError: action.val}
    case OVERAGE_ERROR:
      return {...state, overageError: action.val}
    default:
      return state
  }
}
