import React, { useState, useEffect } from "react";
import './index.css';

export default function Banner() {
  const [news, setNews] = useState([]);
  const apiKey = "bqrZxpYkw4h0AygR9ctu3oqS3YWvgk5O";

  // use async/await to fetch data from API
  useEffect(() => {
    getData();

    async function getData() {
      const res = await fetch(
        `https://api.polygon.io/v2/reference/news?limit=100&order=desc&sort=published_utc&apiKey=${apiKey}`
      );
      const data = await res.json();
      const results = data.results;

      // store data into React state variables
      setNews(results);
    };
  }, []);

  if (!news) {
    return null;
  }
  
  return (
    <div>
      {/* display data from API */}
      {news && (
        <div className="news hwrap">
          <div className="hmove">
            {/* loop over the news */}
            {news.map((article, index) => (
              <div className="hitem" key={index}>
                <a href={article}>
                  <h6 className="newsTitle">{article.title}</h6>
                  <img className="newsImage" src={article.image_url} alt=""></img>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
