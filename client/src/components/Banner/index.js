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

      // Create indexedDB instance for storing API response data
      var request = window.indexedDB.open("BannerNews", 1);
      // store data in IndexedDB for backup
      request.onsuccess = function(event) {
        // Assign response to db variable
        var db = request.result;
        // Create an object store called "articles"
        var articleStore = db.createObjectStore("articles", { autoIncrement : true });
        // Loop over data to add desired fields to db
        for (const article of results) {
          articleStore.add({
            title: article.title,
            image: article.image_url
          });
        };
      };

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
                <h6 className="newsTitle">{article.title}</h6>
                <img className="newsImage" src={article.image_url} alt=""></img>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
