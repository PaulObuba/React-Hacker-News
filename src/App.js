
import React, { useState, useEffect } from 'react'
import './App.css';


const App = () => {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState('react');
  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react');
  const [loading, setLoading] = useState(false)

  const fetchNews = () => {
    setLoading(true)
    fetch(url)
      .then(response => response.json())
      .then(data => (setNews(data.hits), setLoading(false)))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchNews()
  }, [url])

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${search}`);
    setSearch('');
  }

  return (
    <div id='app'>
      <h2>Hacker News</h2>
      {loading ? 'Loading...' :
        <form onSubmit={handleSubmit}>
          <input type='text' value={search} onChange={handleChange} placeholder='search news' />          
          <button type='submit'>submit</button>
        </form>
      }
       {news.length === 0 && <h1>No Result Found...</h1>}

      {news.map(item => <div key={item}>{item.title}</div>)}
    </div>
  )

}

export default App;


