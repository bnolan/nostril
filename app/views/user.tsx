import { Author } from '../components/author';
import { Header } from './header'
import { FilterRecord } from "../../server/filters"

type wallet = string

interface UserProps {
  user: wallet
  filters: Array<FilterRecord>
}

export default function Home (props: UserProps) {
  return (
    <section>
      <Header />

      <h1>User</h1>
    </section>
  )
}
