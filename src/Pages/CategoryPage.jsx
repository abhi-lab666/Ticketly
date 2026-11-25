import { useMemo } from 'react'
import EventSection from '../Components/EventSection.jsx'
import Footer from '../Components/Footer.jsx'
import Header from '../Components/Header.jsx'

const descriptions = {
  Movies: 'Find your next big-screen experience.',
  Events: 'Make room for a good time with events near you.',
  Concerts: 'Discover live music and unforgettable performances.',
  Sports: 'Feel the energy of live matches and sporting events.',
  Activities: 'Try something new and make the day memorable.',
}

function CategoryPage({
  category,
  events,
  user,
  onLogout,
  searchTerm,
  setSearchTerm,
  selectedLocation,
  setSelectedLocation,
}) {
  const filteredEvents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return events.filter((event) => {
      const matchesCategory = event.category === category
      const matchesQuery =
        !query ||
        [event.name, event.category, event.venue, event.location]
          .some((value) => String(value || '').toLowerCase().includes(query))
      const matchesLocation =
        !selectedLocation ||
        String(event.location || '').toLowerCase() === selectedLocation.toLowerCase()

      return matchesCategory && matchesQuery && matchesLocation
    })
  }, [category, events, searchTerm, selectedLocation])

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
      <main className="category-page">
        <div className="category-heading">
          <p className="eyebrow">EXPLORE BY CATEGORY</p>
          <h1>{category}</h1>
          <p>{descriptions[category]}</p>
        </div>
        {filteredEvents.length ? (
          <EventSection
            title={searchTerm ? `Results for "${searchTerm}"` : `${category} to explore`}
            subtitle={`${filteredEvents.length} EXPERIENCES IN ${selectedLocation.toUpperCase()}`}
            events={filteredEvents}
          />
        ) : (
          <div className="empty-state">
            <span>⌕</span>
            <h2>No {category.toLowerCase()} found</h2>
            <p>Try a different search or choose another city.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}

export default CategoryPage
