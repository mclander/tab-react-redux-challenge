import * as types from '../constants/action-types'

export const openOrSelectArticle = id => ({
    type: types.ARTICLE_OPEN,
    id
})

export const closeArticle  =  id => ({
    type: types.ARTICLE_CLOSE,
    id
})

export const swapArticleIndexes  = (from, to) => ({
    type: types.ARTICLE_SWAP,
    from,
    to
})