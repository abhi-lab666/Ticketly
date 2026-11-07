import { Link } from 'react-router-dom'
import Footer from '../Components/Footer.jsx'
import Header from '../Components/Header.jsx'
import { formatPrice, getStoredBookings } from '../utils/storage.js'

function MyTickets({ user, onLogout }) {
  const bookings = getStoredBookings()
    .filter((booking) => booking.userId === user.id)
    .slice()
    .reverse()

  return (
    <>
      <Header user={user} onLogout={onLogout} />
      <main className="dashboard-page">
        <Link className="back-link" to="/dashboard">← Your dashboard</Link>
        <div className="dashboard-welcome"><div><p className="eyebrow">READY WHEN YOU ARE</p><h1>My tickets</h1><p>Your booked experiences, all in one place.</p></div></div>
        {bookings.length ? <div className="tickets-grid">{bookings.map((booking) => (
          <article className="digital-ticket" key={booking.id}>
            <div><small>BOOKING ID</small><strong>{booking.id}</strong></div>
            <h2>{booking.eventName}</h2>
            <p>{booking.eventDate} · {booking.eventTime}</p>
            <p>{booking.venue}, {booking.location}</p>
            <div className="ticket-bottom"><span>Seats: {booking.seats.join(', ')}</span><strong>{formatPrice(booking.totalAmount)}</strong></div>
          </article>
        ))}</div> : <div className="empty-state"><span>✳</span><h2>No tickets just yet</h2><p>Your confirmed bookings will appear here.</p><Link className="button button-primary" to="/">Explore events</Link></div>}
      </main>
      <Footer />
    </>
  )
}

export default MyTickets
