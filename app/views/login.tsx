import { createRef } from 'preact'
import { Header } from './header'
import { useEffect, useState } from 'preact/hooks'

interface LoginProps {
  path: string
}

enum State {
  Email,
  Code,
}

const headers = {
  'Content-Type': 'application/json',
}

export default function Login(props: LoginProps) {
  const [state, setState] = useState(State.Email)
  const [email, setEmail] = useState('')

  const submit = (e) => {
    if (state == State.Email) {
      e.preventDefault()
      setState(State.Code)

      fetch('/login/code', { headers, method: 'POST', body: JSON.stringify({email}) })

      // @ts-ignore
      setTimeout(() => document.querySelector('input.code').focus())
    } else if (state == State.Code) {
      // allow form to submit
    }
  }

  return (
    <section>
      <Header />

      <form onSubmit={submit} action="/login/submit" method='POST'>
        <label>Email</label>
        <input autoFocus={state == State.Email} type="email" name="email" autoComplete='on' value={email} onInput={e => setEmail((e.target as HTMLInputElement).value) }/>

        {state == State.Email ? (
          <button type="submit">Continue</button>
        ) : (
          <>
            <p>We have emailed a 6 letter code to your email - please enter it here</p>
            <label>Code</label>
            <input type="text" class="code" name='code' />
            <button type="submit">Login</button>
          </>
        )}
      </form>
    </section>
  )
}
