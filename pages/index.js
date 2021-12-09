import Link from 'next/link'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'

export default function HomePage({ news }) {
  return (
    <Layout>
      <h1>Upcoming news</h1>
      {news.length === 0 && <h3>No news to show</h3>}

      {news.map((nw) => (
        <EventItem key={nw.id} nw={nw} />
      ))}

      {news.length > 0 && (
        <Link href='/news'>
          <a className='btn-secondary'>View All news</a>
        </Link>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/news?_sort=date:ASC&_limit=3`)
  const news = await res.json()

  return {
    props: { news },
    revalidate: 1,
  }
}
