import React from 'react'
const ARTICLES_TOTAL = 42 // donn't ask me why !

export const makeData = (number = ARTICLES_TOTAL, titlePrefix = 'Article') => {
  const data = []
  for (let i = 1; i <= number; i++) {
    data.push({
        id: i,
        title: `${titlePrefix} ${i}`,
        content:
            <div>
                Content {i}: Accusamus enim nisi itaque voluptas nesciunt repudiandae velit. <br/>
                Ad molestiae magni quidem saepe et quia voluptatibus minima. <br/>
                Omnis autem distinctio tempore. Qui omnis eum illum adipisci ab. <br/>
            </div>
    });
  }
  return data
}

export const articles = makeData() 
export const initial = {
  open: [],
  active: 0
}


