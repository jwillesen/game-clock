import TimeDisplay from './time-display'
import './app.css'

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <TimeDisplay duration={100000} />
      </header>
    </div>
  )
}
