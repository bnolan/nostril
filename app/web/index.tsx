import { render } from "preact";
import Router from 'preact-router';
import Root from "../views/root";

import { user } from '../components/state'

const Main = () => (
  <>
    <Router>
      <Root path="/" />
    </Router>
  </>
);

document.addEventListener('DOMContentLoaded', () => {
  render(<Main />, document.body);
})

