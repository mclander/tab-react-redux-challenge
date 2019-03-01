import { ARTICLE_OPEN, ARTICLE_CLOSE, ARTICLE_SWAP } from '../constants/action-types'
import {STORE_KEY} from '../constants'
import store from 'store2'
import initialState from './initial-state'

// import * as _ from 'lodash'

export default function articlesReducer(state = initialState, action) {
    //console.log({state, action})
  let {active, open} = state

  switch (action.type) {
    case ARTICLE_OPEN:
        // Ищем статью в открытых, проверяем, что статья существует
        if (!~open.indexOf(action.id) && (action.id in state.indexes)) {
            open = [...open, action.id]
            store.session.set(STORE_KEY('open'), open)
        } else {
            // Попытку открыть несуществующую сатью (пока?) никак не обрабатываем

        }
        // хитрый финт ухом: нам надо сместить индекс на 1 чтобы попасть в индекс табов
        // а случай кода таб не найден самообрабытывается - -1 - превращается в 0 - страница стаьи
        active = open.indexOf(action.id) + 1
    
        return {...state, open, active}

    case ARTICLE_CLOSE:
        const index = open.indexOf(action.id)
        if (~index) {
            if (active === index + 1) active--
            open = open.slice()
            open.splice(index, 1)
            store.session.set(STORE_KEY('open'), open)
            return {...state, open, active}
        }

        return state
    case ARTICLE_SWAP:
        const {from, to} = action
        // меняем местми вкладки
        open = open.slice()
        let swap = open[from]
        open[from] = open[to]
        open[to] = swap
        store.session.set(STORE_KEY('open'), open)

        // устанавливаем новую активню вкладку
        active = to + 1
        return {...state, open, active}
    default:
        return state;
  }
}
