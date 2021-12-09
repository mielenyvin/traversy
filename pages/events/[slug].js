import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'
import EventMap from '@/components/EventMap'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'
import { useRouter } from 'next/router'

export default function EventPage({ nw }) {
  const router = useRouter()

  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(nw.date).toLocaleDateString('en-US')} at {nw.time}
        </span>
        <h1>{nw.name}</h1>
        <ToastContainer />
        {nw.image && (
          <div className={styles.image}>
            <Image
              src={nw.image.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{nw.performers}</p>
        <h3>Description:</h3>
        <p>{nw.description}</p>
        <h3>Venue: {nw.venue}</h3>
        <p>{nw.address}</p>

        <EventMap nw={nw} />

        <Link href='/news'>
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  )
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/news`)
//   const news = await res.json()

//   const paths = news.map((nw) => ({
//     params: { slug: nw.slug },
//   }))

//   return {
//     paths,
//     fallback: true,
//   }
// }

// export async function getStaticProps({ params: { slug } }) {
//   const res = await fetch(`${API_URL}/news?slug=${slug}`)
//   const news = await res.json()

//   return {
//     props: {
//       nw: news[0],
//     },
//     revalidate: 1,
//   }
// }

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/news?slug=${slug}`)
  const news = await res.json()

  return {
    props: {
      nw: news[0],
    },
  }
}
