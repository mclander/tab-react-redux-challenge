import  actions from './action-types'

export const STORE_BASE = 'tab-redux-challenge'
export const STORE_KEY = k => `${STORE_BASE}.${k}`

export default {
    actions,
    STORE_BASE,
    STORE_KEY
} 