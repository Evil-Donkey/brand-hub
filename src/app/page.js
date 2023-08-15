import Link from 'next/link'
import styles from './Homepage.module.scss'

export default function Home() {
  return (
    <main>
      <div>
        <Link href="/agencies">Agencies</Link>
      </div>
    </main>
  )
}
