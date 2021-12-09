import qs from 'qs'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'

export default function SearchPage({ news }) {
  const router = useRouter()

  return (
    <Layout title='Search Results'>
      <Link href='/news'>Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {news.length === 0 && <h3>No news to show</h3>}

      {news.map((nw) => (
        <EventItem key={nw.id} nw={nw} />
      ))}
    </Layout>
  )
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  })

  const res = await fetch(`${API_URL}/news?${query}`)
  const news = await res.json()

  return {
    props: { news },
  }
}
