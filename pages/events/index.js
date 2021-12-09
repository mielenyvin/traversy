import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import Pagination from '@/components/Pagination'
import { API_URL, PER_PAGE } from '@/config/index'

export default function newsPage({ news, page, total }) {
  return (
    <Layout>
      <h1>news</h1>
      {news.length === 0 && <h3>No news to show</h3>}

      {news.map((nw) => (
        <EventItem key={nw.id} nw={nw} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  )
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/news/count`)
  const total = await totalRes.json()

  // Fetch news
  const eventRes = await fetch(
    `${API_URL}/news?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  )
  const news = await eventRes.json()

  return {
    props: { news, page: +page, total },
  }
}
