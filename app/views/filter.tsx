import { FilterRecord } from "../../server/filters"
import { Header } from "./header"

interface PostProps {
  filter?: FilterRecord
  path?: string
}

export default function Filter (props: PostProps) {
  let { filter } = props

  return (
    <section>
      <Header />

      <div class='post view'>
        <span>{filter.user}</span>
        <h1>{filter.name}</h1>

        <pre><code>{JSON.stringify(filter.content, null, 2)}</code></pre>
      </div>
    </section>
  )
}
