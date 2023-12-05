import { Author } from '../components/author';
import { Header } from './header'
import { FilterRecord } from "../../server/filters"
import { user } from '../components/state'
import { useEffect, useState } from 'preact/hooks';

interface AccountProps {
  path: string
}

export default function Account (props: AccountProps) {
  const [filters, setFilters] = useState([]);

  async function fetchFilters () {
    let f = await fetch('/api/filters')
    let j = await f.json()

    setFilters(j.filters)
  }

  useEffect(() => { fetchFilters() }, [])

  const createFilter = async (e) => {
    e.preventDefault()

    let f = await fetch('/f/create', { method: 'post', credentials: 'include' })
    let { filter } = await f.json()

    console.log(filter)

    fetchFilters()
    // window.location.replace(`/f/${filter.id}/edit`)
  } 

  let list = filters.map(p => <li><a href={`/f/${p.id}`}>{p.name}</a></li>)

  return (
    <section>
      <Header />

      <h1>Account</h1>

      <p>
        Logged in as { user.value.email }. <a data-native href="/logout">Logout</a>.
      </p>

      <div class='col-1'>
        <ul>{ list }</ul>

        <div>
          <button onClick={createFilter}> Create Filter</button>
        </div> 
      </div>

      <div class='col-1'>
      </div>
    </section>
  )
}

