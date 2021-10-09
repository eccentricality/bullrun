import { React, useEffect } from "react";
import ReactDOM from "react-dom";
import Script from "react-load-script";
import Trends from "../components/Trends/index.js";

export default function GoogleTrends({ type, keyword, url }) {

  useEffect(() => {
    fetch(
      "https://google-trends-related-search.p.rapidapi.com/?keyword=finance&timerange=last1hour&geo=US",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "google-trends-related-search.p.rapidapi.com",
          "x-rapidapi-key": "b77d1cca69mshb730bd2ea0e27e0p1b9cc9jsnfd64c00c7ea9:"
          // process.ENV.TRENDKEY,
        },
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleScriptLoad = (_) => {
    window.trends.embed.renderExploreWidgetTo(
      document.getElementById("widget"),
      type,
      {
        comparisonItem: [{ keyword, geo: "US", time: "today 12-m" }],
        category: 0,
        property: "",
      },
      {
        exploreQuery: `q=${encodeURI(keyword)}&geo=US&date=today 12-m`,
        guestPath: "https://trends.google.com:443/trends/embed/",
      }
    );
  };

  const renderGoogleTrend = (_) => {
    return (
      <>
        {/* <Script url={url} onLoad={handleScriptLoad} /> */}
        {/* <Trends trend = {data}/> */}
      </>
    );
  };

  // return <div className="googleTrend">{renderGoogleTrend()}</div>;
  return (
    <h1>Hello</h1>
  )
}
