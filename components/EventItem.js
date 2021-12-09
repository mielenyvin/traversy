import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/EventItem.module.css'

export default function EventItem({ nw }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            nw.image
              ? nw.image.formats.thumbnail.url
              : '/images/event-default.png'
          }
          width={170}
          height={100}
        />
      </div>

      <div className={styles.info}>
        <span>
          {new Date(nw.date).toLocaleDateString('en-US')} at {nw.time}
        </span>
        <h3>{nw.name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/news/${nw.slug}`}>
          <a className='btn'>Details</a>
        </Link>
      </div>
    </div>
  )
}
