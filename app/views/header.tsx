import { user } from '../components/state'

interface HeaderProps {
  minimal? : boolean
}

export function Header (props: HeaderProps) {
  return (
    <header>
      <div class='logo'>
        <a href="/">
          <img src="/nostril.webp" />
        </a>
      </div>

    </header>

  )
}
