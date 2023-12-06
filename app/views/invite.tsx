import { InviteRecord } from '../../server/filters';
import { Author } from '../components/author';
import { Header } from './header'
import { useEffect, useState } from 'preact/hooks'
let Buffer = require("buffer").Buffer

interface InviteProps {
  path: any
  invite?: InviteRecord
}

interface InvitePayload {
  sender: string
  group_key: string
  public_key: string
}

async function decryptData(encryptedData, keyString) {
    // Assuming encryptedData is a Base64 encoded string
    const dataBuffer = Buffer.from(encryptedData, 'base64');

    // Convert the key from a string to a format usable by the crypto API
    const keyBuffer = Buffer.from(keyString, 'utf-8');
    const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        keyBuffer,
        { name: 'AES-CBC' },
        false,
        ['decrypt']
    );

    // The IV should be known; it's usually at the start of the encrypted data or transmitted separately
    // For this example, we'll take the first 16 bytes of the encrypted data as the IV
    const iv = dataBuffer.slice(0, 16);
    const encrypted = dataBuffer.slice(16);

    // Decrypting the data
    const decrypted = await window.crypto.subtle.decrypt(
        {
            name: 'AES-CBC',
            iv: iv
        },
        cryptoKey,
        encrypted
    );

    // Convert decrypted data to a readable format, e.g., UTF-8 string
    return new TextDecoder().decode(decrypted);
}

let means = "Friends,Roommates,Colleagues,School,Hooked up,Online,Virtual events,Fitness,Hobby groups,I don't know them".split(',')

export default function Invite (props: InviteProps) {
  let invite = props.invite

  const [payload, setPayload] = useState({} as InvitePayload);

  const task = async () => {
    let invite = JSON.parse(document.querySelector('script#invite').innerHTML)
    let otp = window.location.hash.slice(1)
    let decrypted = await decryptData(invite.payload, otp)
    setPayload(JSON.parse(decrypted))
  }

  useEffect(() => {
    try {
      task()
    } catch (e) {

    }
  }, []);

  console.log('wtf')

  let options = means.map(c => <label><input type='radio' /> {c}</label>)

  return (
    <section class='invite'>
      <Header />

      <h2>Friend Request</h2>

      { payload.sender ? <div>
          <dl>
            <dt>Group key</dt><dd>{payload?.group_key}</dd>
            <dt>Author public key</dt><dd>{payload?.public_key}</dd>
          </dl>

          <h3>How do you know {payload?.sender}</h3>

          <fieldset>{options}</fieldset>

          <button>Confirm</button>
          <button>Ignore</button>
        </div> : <p>Loading...</p>
      }
    </section>
  )
}
