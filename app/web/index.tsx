import { render } from "preact";
import Router from 'preact-router';
import Root from "../views/root";
import Invite from "../views/invite";

import { user } from '../components/state'

const Main = () => (
  <>
    <Router>
      <Root path="/" />
      <Invite path="/invite/:remaining_path*" />
    </Router>
  </>
);

document.addEventListener('DOMContentLoaded', () => {
  render(<Main />, document.body);
})

