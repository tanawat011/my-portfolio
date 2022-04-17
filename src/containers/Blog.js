/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
// import { parse } from 'rss-to-json'

export const Blog = () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const mediumUrl = 'https://medium.com/feed/@tanawat-p'
  const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=${mediumUrl}&api_key=8uxaweddr0gqiqu1jnjgs0cmrbtho6afqrcviclk`

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await fetch(rssUrl)
      const data = await rawData.json()
      const items = data.items?.filter(item => !item.content.includes('ลองมาทบทวน Dockerfile'))

      const temp = []

      items?.forEach((item, index) => {
        const fakeIndex = index + 1
        const { thumbnail, title, pubDate, content, link } = item

        if (fakeIndex % 2 !== 0) {
          temp.push([])
        }

        let tempHtml = document.createElement('DIV')
        tempHtml.innerHTML = content
        content = tempHtml.textContent || tempHtml.innerText || ''

        pubDate = new Date(pubDate)

        temp[temp.length - 1].push({
          image: thumbnail,
          title,
          date: `${months[pubDate.getMonth()]} ${pubDate.getDate()}, ${pubDate.getFullYear()}`,
          content: content.slice(0, 200),
          url: link,
        })
      })

      setBlogs(temp)
    }

    fetchData()
  }, [])

  return (
    <section id='blog' className='container blog'>
      <h1 className='title-container'>
        BLOG
      </h1>

      <hr className='title-bar' />

      <div className='blog__wrap'>
        <div className='blog__wrap-item'>
          {blogs.map((items, i) => {
            return (
              <div key={i + 'blog__wrap-item'} className='blog__wrap-item'>
                {items.map(({ image, title, date, content, url }, j) => {
                  return (
                    <a key={j + title} className='blog__item' href={url} target='_blank' rel='noreferrer'>
                      <div className='blog__item-img'>
                        <img src={image} alt={image} />
                      </div>

                      <p className='blog__item-title'>{title}</p>

                      <p className='blog__item-date'>{date}</p>

                      <hr className='blog__item-date-bar' />

                      <div className='blog__item-content'>{content}</div>
                    </a>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
