import { useQuery } from '@apollo/client';
import { QUERY_GOOGLE_TRENDS } from '../../utils/queries'

export default function Trends({ trend, title }) {
    const { loading, data } = useQuery(QUERY_GOOGLE_TRENDS, {
        variables: { input: { geo: "US", category: "all" }}
    })
    const trends = data?.googleTrends || [];
    const topTrend = trends[0]
    // const checkTrendsNow = trends[0].shareUrl

    if (trends) {
        return (
            <>
                <div>
                    THE TOP TRENDING TOPICS ARE: {topTrend.title}
                </div>
            </>
        )
    }
}