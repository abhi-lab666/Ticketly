import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import EventCard from '../Components/EventCard.jsx'
import Footer from '../Components/Footer.jsx'
import Header from '../Components/Header.jsx'
import { formatPrice, getStoredBookings, readStorage, STORAGE_KEYS, writeStorage } from '../utils/storage.js'

function UserDashboard({
  user,
  events,
  notice,
  onLogout,
  searchTerm,
  setSearchTerm,
  selectedLocation,
  setSelectedLocation,
}) {
  const location = useLocation()
  const [favorites, setFavorites] = useState(() => readStorage(STORAGE_KEYS.favorites, {}))
  const userBookings = useMemo(
    () => getStoredBookings().filter((booking) => booking.userId === user.id),
    [user.id],
  )
  const favoriteIds = favorites[user.id] || []
  const favoriteEvents = events.filter((event) => favoriteIds.includes(event.id))
  const recommendations = events.filter((event) => !favoriteIds.includes(event.id)).slice(0, 3)

  function toggleFavorite(eventId) {
    const updated = {
      ...favorites,
      [user.id]: favoriteIds.includes(eventId)
        ? favoriteIds.filter((id) => id !== eventId)
        : [...favoriteIds, eventId],
    }
    writeStorage(STORAGE_KEYS.favorites, updated)
    setFavorites(updated)
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
      <main className="dashboard-page">
        <div className="dashboard-welcome">
          <div>
            <p className="eyebrow">YOUR TICKETLY</p>
            <h1>Welcome back, {user.name.split(' ')[0]}.</h1>
            <p>Your next great memory is only a ticket away.</p>
          </div>
          <Link className="button button-primary" to="/">Explore events <span aria-hidden="true">→</span></Link>
        </div>
        {(notice || location.state?.message) && <p className="success-message" role="status">{notice || location.state.message}</p>}
        <div className="dashboard-columns">
          <section className="dashboard-panel profile-panel">
            <p className="eyebrow">YOUR DETAILS</p>
            <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
            <h2>{user.name}</h2>
            <p>{user.email}</p><p>{user.phone}</p>
            <div className="profile-links">
              <Link to="/tickets">My tickets <span>{userBookings.length} bookings</span></Link>
              <Link to="/dashboard#favorites">Favourite events <span>{favoriteEvents.length} saved</span></Link>
            </div>
          </section>
          <section className="dashboard-main">
            <div className="dashboard-panel booking-panel">
              <div className="section-heading">
                <div><p className="eyebrow">YOUR PLANS</p><h2>My bookings</h2></div>
                <Link className="text-link" to="/tickets">All tickets ↗</Link>
              </div>
              {userBookings.length ? userBookings.slice().reverse().map((booking) => (
                <article className="booking-list-item" key={booking.id}>
                  <div className="booking-date-icon">{booking.eventDate?.slice(8) || 'TK'}</div>
                  <div className="booking-item-content">
                    <strong>{booking.eventName}</strong>
                    <span>{booking.eventDate} · Seats {booking.seats.join(', ')}</span>
                  </div>
                  <strong>{formatPrice(booking.totalAmount)}</strong>
                </article>
              )) : <div className="empty-inline"><p>No bookings yet. Find a show you love and make a night of it.</p><Link to="/">Find an event →</Link></div>}
            </div>
            <section className="dashboard-panel" id="favorites">
              <div className="section-heading"><div><p className="eyebrow">SAVE IT FOR LATER</p><h2>Favourite events</h2></div></div>
              {favoriteEvents.length ? (
                <div className="event-grid">{favoriteEvents.map((event) => (
                  <div className="favorite-card" key={event.id}>
                    <EventCard event={event} />
                    <button className="text-link" onClick={() => toggleFavorite(event.id)} type="button">Remove favourite</button>
                  </div>
                ))}</div>
              ) : <p className="muted-copy">Your saved events will show up here.</p>}
            </section>
            <section className="dashboard-panel">
              <div className="section-heading"><div><p className="eyebrow">PICKED FOR YOU</p><h2>Recommended events</h2></div></div>
              <div className="event-grid">{recommendations.map((event) => (
                <div className="favorite-card" key={event.id}>
                  <EventCard event={event} />
                  <button className="text-link" onClick={() => toggleFavorite(event.id)} type="button">＋ Add to favourites</button>
                </div>
              ))}</div>
            </section>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default UserDashboard
