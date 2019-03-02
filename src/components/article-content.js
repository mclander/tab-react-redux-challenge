import React from 'react'

export const ArticleContent = props =>  <div dangerouslySetInnerHTML={{__html: props.content}}></div>

export default ArticleContent