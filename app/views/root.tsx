import { FilterRecord } from "../../server/filters";
import { Author } from "../components/author";
import { Header } from "./header";

interface HomeProps {
  path: any;
  filters?: Array<FilterRecord>;
}

export default function Home(props: HomeProps) {
  let filters = props.filters?.map((p) => <code>{JSON.stringify(p)}</code>);

  // <li><b>Accessible</b> Free for everyone - paid upgrades remove storage limits</li>

  return (
    <section>
      <Header />
      <h2>The modern social network</h2>
      <p class="type-m">Coming to iOS 17 and Android 14.</p>
      <ol>
        <li>
          <b>Human</b> Chronologically ordered, no algorithmic filtering or
          suggested content
        </li>
        <li>
          <b>Addiction-free</b> Built to be used in 5-minute sessions
        </li>
        <li>
          <b>Ad-free</b> Our service has no advertising or sponsored content.
        </li>
      </ol>
      <p>
        We'll offer Pro accounts with HD photos and a cool namebadge once we hit
        1,000 users. For now we have day jobs.
      </p>
      <p>
        Built on the <a href="https://nostr.com/">Nostr</a> protocol.
      </p>
    </section>
  );
}
