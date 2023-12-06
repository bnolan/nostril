import { FilterRecord } from '../../server/filters';
import { Author } from '../components/author';
import { Header } from './header'

interface HomeProps {
  path: any
  filters?: Array<FilterRecord>
}

export default function Home (props: HomeProps) {
  let filters = props.filters?.map(p => <code>{JSON.stringify(p)}</code>)

  return (
    <section>
      <Header />

      <h2>A retro-modern social network</h2>

      <p class='type-m'>
        Your 2007-era news feed rebuilt for iOS 17 and Android 14.
      </p>

      <ol>
        <li><b>Human</b> Chronologically ordered, without algorithmic filtering or recommended content</li>
        <li><b>Secure</b> Share your posts securely with end to end encryption</li>
        <li><b>Private</b> Your content is only viewable by your invited friends and family</li>
      </ol>
    </section>
  )
}
