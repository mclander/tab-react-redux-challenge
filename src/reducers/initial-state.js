import React from 'react'
import store from "store2"
import {STORE_KEY} from '../constants'
import translit from 'translit-rus-eng'

import snakeCase  from 'lodash/snakeCase'
import fromPairs from 'lodash/fromPairs'
import castArray from 'lodash/castArray'


const ARTICLES_TOTAL = 42 // donn't ask me why !

export const makeData = (number = ARTICLES_TOTAL, titlePrefix = 'Статья') => {
    const data = []
    for (let i = 1; i <= number; i++) {
        const title = `${titlePrefix} ${i}` 
        data.push({
            id: `${i}-${snakeCase(translit(title))}`,
            title,
            content: `
                <div>
                    <h2>${title}</h2>

                    <h3> tab-react-redux-challenge</h3>

                    Тестовое задание. Текст и "адресат" задания скрыты для усложнения жизни другим тестируемым.<p />

                    Основной проект стырен из lazy-loading-routes, так же остались следы заимсвований из react-slingshot и react-starter-kit <p />

                    <h3>Немного пояснений</h3>

                    Я использую в своей работе нотацию без точки с запятой (;), хоть это не очень распространённая 
                    нотация. Плюсом этой нотации идёт то, что видно что и где я творчески обработал из творчески
                    заимствованного кода.<p />

                    В этом проекте я использую kebab названия файлов (из чистого хулиганства, плюс мне 
                    нравится видеть имена файлов в этой нотации во вкладках редактора больше) <p/>

                    Я знаю, что lodash сильно утяжелит проект, но использую его внаглую, потому, что оптимизировать размер
                    можно разными способами и "потом"<p />

                    <h3> Вот, блин, поворот</h3>

                    В библиотеке react-tabtab есть ошибка с закрытием вкладок, чтобы закрыть вкладку надо кликать на самый верх квадратика с крестиком. Думаю, разберусь с этим позже<p />
                    
                    <h3># Что остётся? </h3>

                    Причесать стили, пофиксить react-tabtab, сделать eject проекту, чтобы формально 
                    выполнить условие про webpack, сократить влияние лодаша<p /> 
                
                </div>`
        })
  }
  return data
}

export const articles = makeData()
export const active = 0 // не запоминаем активную вкладку в сессии
export const indexes = fromPairs(articles.map((x, i) => [x.id, i]))
export const open = (castArray(store.session.get(STORE_KEY('open'), []))).filter(x => x in indexes) // запоминаем вкладки с сессии 

export const initial ={
    articles,
    open,
    indexes,
    active
} 

export default initial


