import EventCard from './EventCard.jsx'

function EventSection({ title, subtitle, events, actionLabel = 'Explore all', onAction }) {
  if (!events.length) return null

  return (
    <section className="event-section" id="events">
      <div className="section-heading">
        <div><p className="eyebrow">{subtitle}</p><h2>{title}</h2></div>
        {onAction
          ? <button className="section-action section-action-button" onClick={onAction} type="button">{actionLabel} <span aria-hidden="true">↗</span></button>
          : <span className="section-action">{actionLabel} <span aria-hidden="true">↗</span></span>}
      </div>
      <div className="event-grid">
        {events.map((event) => <EventCard event={event} key={event.id} />)}
      </div>
    </section>
  )
}

export default EventSection
