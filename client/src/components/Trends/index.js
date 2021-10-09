import { useQuery } from "@apollo/client";
import { QUERY_GOOGLE_TRENDS } from "../../utils/queries";

export default function Trends({ trend, title }) {
  const { loading, error, data } = useQuery(QUERY_GOOGLE_TRENDS, {
    variables: { input: { geo: "US", category: "all" } },
  });

  if (loading) return <p>STILL LOADING</p>;
  if (error) return `Error! ${error.message}`;

  const trends = data?.googleTrends || [];

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
      )}
    </>
  );
}
