import { useQuery } from "@apollo/client";
import { QUERY_GOOGLE_TRENDS } from "../../utils/queries";

export default function Trends({ trend, title }) {
  const { loading, data } = useQuery(QUERY_GOOGLE_TRENDS, {
    variables: { input: { geo: "US", category: "all" } },
  });
  // console.log("What is data", data)
  const trends = data?.googleTrends || [];
  // const checkTrendsNow = trends[0].shareUrl
  // console.log('ENTITY NAMES', trends[0].entityNames);
  // console.log('WHAT IS TRENDS', trends[0].entityNames)

  if (trends) {
    // const trendingKeywords = trends[0].entityNames;
    // const trendingKeywords2 = trends[1].entityNames[0];
    return (
      <>
        {trends && (
          <>
          <div>
          <h3>#1 TRENDING TOPIC KEYWORDS: </h3> 
            {trends[0].entityNames.map((trends, index) => (
              <div key={index}>
                <h4>{trends}</h4>
              </div>
            ))}
          </div>
          <div>
          <h3>#2 TRENDING TOPIC KEYWORDS: </h3>
            {trends[1].entityNames.map((trends, index) => (
              <div key={index}>
                <h4>{trends}</h4>
              </div>
            ))}
          </div>
          <div>
            <h3>#3 TRENDING TOPIC KEYWORDS: </h3>
            {trends[2].entityNames.map((trends, index) => (
              <div key={index}>
                <h4>{trends}</h4>
              </div>
            ))}
          </div>
          <div>
            <h3>#4 TRENDING TOPIC KEYWORDS: </h3>
            {trends[3].entityNames.map((trends, index) => (
              <div key={index}>
                <h4>{trends}</h4>
              </div>
            ))}
          </div>
          <div>
            <h3>#5 TRENDING TOPIC KEYWORDS: </h3>
            {trends[4].entityNames.map((trends, index) => (
              <div key={index}>
                <h4>{trends}</h4>
              </div>
            ))}
          </div>
          </>
        )
        }
      </>
    );
  }
}
