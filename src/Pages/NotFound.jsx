import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <main className="empty-page not-found">
      <span className="eyebrow">404 · THIS SHOW IS OVER</span>
      <h1>Looks like you took a wrong turn.</h1>
      <p>The page you’re looking for isn’t here, but your next experience is.</p>
      <Link className="button button-primary" to="/">Back to Ticketly <span aria-hidden="true">→</span></Link>
    </main>
  )
}

export default NotFound
