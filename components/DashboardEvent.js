import Link from 'next/link'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import styles from '@/styles/DashboardEvent.module.css'

export default function DashboardEvent({ nw, handleDelete }) {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/news/${nw.slug}`}>
          <a>{nw.name}</a>
        </Link>
      </h4>
      <Link href={`/news/edit/${nw.id}`}>
        <a className={styles.edit}>
          <FaPencilAlt /> <span>Edit Event</span>
        </a>
      </Link>
      <a
        href='#'
        className={styles.delete}
        onClick={() => handleDelete(nw.id)}
      >
        <FaTimes /> <span>Delete</span>
      </a>
    </div>
  )
}
