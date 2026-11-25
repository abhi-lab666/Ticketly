import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../Components/Header.jsx'
import SeatSelection from '../Components/SeatSelection.jsx'
import { formatPrice, getStoredBookings, readStorage, STORAGE_KEYS, writeStorage } from '../utils/storage.js'

function createBookingId() {
  const uniqueId = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  return `TK-${uniqueId.toUpperCase()}`
}

function createBookingTimestamp() {
  return new Date().toISOString()
}

function Booking({
  events,
  user,
  onLogout,
  searchTerm,
  setSearchTerm,
  selectedLocation,
  setSelectedLocation,
}) {
  const { id } = useParams()
  const event = events.find((item) => item.id === id)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [booking, setBooking] = useState(null)
  const [message, setMessage] = useState('')
  if (!event) return <main className="empty-page"><h1>This event is no longer available.</h1><Link to="/">Back to events</Link></main>

  const seatMap = readStorage(STORAGE_KEYS.bookedSeats, {})
  const bookedSeats = seatMap[event.id] || []
  const total = selectedSeats.length * Number(event.ticketPrice)

  function toggleSeat(seat) {
    if (bookedSeats.includes(seat)) return
    setMessage('')
    setSelectedSeats((seats) => seats.includes(seat) ? seats.filter((item) => item !== seat) : [...seats, seat])
  }

  function confirmBooking() {
    if (!selectedSeats.length) {
      setMessage('Select at least one available seat to continue.')
      return
    }
    const latestSeatMap = readStorage(STORAGE_KEYS.bookedSeats, {})
    const latestBookedSeats = latestSeatMap[event.id] || []
    const unavailableSeats = selectedSeats.filter((seat) => latestBookedSeats.includes(seat))
    if (unavailableSeats.length) {
      setSelectedSeats((seats) => seats.filter((seat) => !unavailableSeats.includes(seat)))
      setMessage(`Sorry, ${unavailableSeats.join(', ')} just became unavailable. Please choose again.`)
      return
    }

    const newBooking = {
      id: createBookingId(),
      eventId: event.id,
      eventName: event.name,
      eventDate: event.date,
      eventTime: event.time,
      venue: event.venue,
      location: event.location,
      userId: user.id,
      userName: user.name,
      seats: [...selectedSeats],
      totalAmount: total,
      bookingDate: createBookingTimestamp(),
    }
    writeStorage(STORAGE_KEYS.bookedSeats, {
      ...latestSeatMap,
      [event.id]: [...latestBookedSeats, ...selectedSeats],
    })
    writeStorage(STORAGE_KEYS.bookings, [...getStoredBookings(), newBooking])
    setBooking(newBooking)
    setSelectedSeats([])
    setMessage('')
  }

  return (
    <>
      <Header
        user={user}
        onLogout={onLogout}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
      />
      <main className="booking-page">
        <Link className="back-link" to={`/event/${event.id}`}>← {event.name}</Link>
        {booking ? (
          <section className="ticket-confirmation">
            <span className="success-mark">✓</span>
            <p className="eyebrow">YOU'RE ALL SET</p>
            <h1>Your plans are official.</h1>
            <p>Your demonstration booking has been saved. No payment was taken.</p>
            <div className="digital-ticket">
              <div><small>BOOKING ID</small><strong>{booking.id}</strong></div>
              <h2>{booking.eventName}</h2>
              <p>{booking.eventDate} · {booking.eventTime}</p>
              <p>{booking.venue}, {booking.location}</p>
              <div className="ticket-bottom"><span>Seats: {booking.seats.join(', ')}</span><strong>{formatPrice(booking.totalAmount)}</strong></div>
            </div>
            <Link className="button button-primary" to="/tickets">View my tickets</Link>
          </section>
        ) : (
          <div className="booking-layout">
            <section className="booking-main">
              <p className="eyebrow">PICK YOUR SPOT</p>
              <h1>Select your seats</h1>
              <p className="auth-description">{event.name} · {event.date} · {event.venue}</p>
              <SeatSelection bookedSeats={bookedSeats} onToggle={toggleSeat} selectedSeats={selectedSeats} />
            </section>
            <aside className="booking-summary">
              <p className="eyebrow">YOUR EVENING</p>
              <h2>{event.name}</h2>
              <p>{event.date} · {event.time}</p>
              <p>{event.venue}, {event.location}</p>
              <hr />
              <div className="summary-row"><span>Selected seats</span><strong>{selectedSeats.length ? selectedSeats.join(', ') : 'None yet'}</strong></div>
              <div className="summary-row"><span>Price per seat</span><strong>{formatPrice(event.ticketPrice)}</strong></div>
              <div className="summary-total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
              {message && <p className="form-message error" role="alert">{message}</p>}
              <button className="button button-primary button-wide" onClick={confirmBooking} type="button">Confirm booking <span aria-hidden="true">→</span></button>
              <small>Demo checkout only. No real payment is processed.</small>
            </aside>
          </div>
        )}
      </main>
    </>
  )
}

export default Booking
