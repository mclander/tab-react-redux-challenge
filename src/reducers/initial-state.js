import React from 'react'
import * as _ from 'lodash'
import store from "store2"
import {STORE_KEY} from '../constants'

const ARTICLES_TOTAL = 42 // donn't ask me why !

export const makeData = (number = ARTICLES_TOTAL, titlePrefix = 'Article') => {
    const data = []
    // const lines = 2 + Math.floor(10 * Math.random()) 
    for (let i = 1; i <= number; i++) {
        const title = `${titlePrefix} ${i}` 
        data.push({
            id: `${i}-${_.kebabCase(title)}`,
            title,
            content:
                <div>
                    <h2>{title}</h2>
                    Content {i}: Accusamus enim nisi itaque voluptas nesciunt repudiandae velit. <br/>
                    Ad molestiae magni quidem saepe et quia voluptatibus minima. <br/>
                    Omnis autem distinctio tempore. Qui omnis eum illum adipisci ab. <br/>
                </div>
        })
  }
  return data
}

export const articles = makeData()
export const open = store.get(STORE_KEY('open'), []) // запоминаем вкладки с сессии 
export const active = 0 // не запоминаем активную вкладку в сессии
export const indexes = _.fromPairs(_.map(articles, (x, i) => [x.id, i + 1]))

export const initial ={
    articles,
    open,
    indexes,
    active
} 

export default initial


