import React, { useState, useEffect } from "react";
import './index.css';

import Cookies from 'universal-cookie';

export default function Banner() {
  const [news, setNews] = useState([]);
  const apiKey = "bqrZxpYkw4h0AygR9ctu3oqS3YWvgk5O";

  // Set SameSite cookie policy using NPM universal-cookie
  const cookies = new Cookies();
  cookies.set('SameSite', 'Lax', { path: '/' });

  // use async/await to fetch data from API
  useEffect(() => {
    getData();

    async function getData() {
      const res = await fetch(
        `https://api.polygon.io/v2/reference/news?limit=100&order=desc&sort=published_utc&apiKey=${apiKey}`
      );
      const data = await res.json();
      const results = data.results;

      console.log(results[0]);

      // store data into React state variables
      setNews(results);
    };
  }, []);

  if (!news) {
    return null;
  }
  
  return (
    <div>
      <h3 className="newsHeader">Daily News Feed</h3>
      {/* display data from API */}
      {news && (
        <div className="news hwrap">
          <div className="hmove">
            {/* loop over the news */}
            {news.map((article, index) => (
              <div key={index}>
                <a href={article.article_url} target="_blank" rel="noreferrer"> 
                  <div className="hitem">
                      <h6 className="newsTitle">{article.title}</h6>
                      <img className="newsImage" src={article.image_url} alt=""></img>
                      <img className="newsLogo" src={article.publisher.logo_url} alt=""></img>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
