import { render } from 'preact'
import './index.css'
import './app.css'
import { Homepage } from './components/Homepage'

render(<Homepage />, document.getElementById('app')!)
