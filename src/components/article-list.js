import React, {Component} from 'react'
import { Link } from 'react-router-dom'

export const ArticleList = props => <div>
    <h2>Список статей</h2>
    <ol>
        { props.articles.map((article, index) => 
            <li key={index}>
                <Link to={`${props.linkBase}/${article.id}`}  >{article.title}</Link>
            </li>
        )}
    </ol>
</div>


export default ArticleList