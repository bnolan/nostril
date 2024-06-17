import { user } from "../components/state";

interface HeaderProps {
  minimal?: boolean;
}

export function Header(props: HeaderProps) {
  return (
    <header>
      <div class="logo">
        <a href="/">
          <img src="/n-logo.png" />
        </a>
      </div>
    </header>
  );
}
