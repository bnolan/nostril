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

      <h2>A modern social network</h2>

      <p class='type-m'>
        Your Facebook newsfeed from 2007 &mdash; rebuilt for iOS 17.
      </p>

      <ol>
        <li><b>Human</b> Chronologically ordered, no algorithmic filtering or recommended content</li>
        <li><b>Secure</b> Share family photos safely with end to end encryption</li>
        <li><b>Private</b> Your content is shared only with your friends</li>
      </ol>
    </section>
  )
}
