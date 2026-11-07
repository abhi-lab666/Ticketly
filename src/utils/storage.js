export const STORAGE_KEYS = {
  accounts: 'ticketlyAccounts',
  currentUser: 'ticketlyCurrentUser',
  loggedIn: 'ticketlyLoggedIn',
  bookings: 'ticketlyBookings',
  events: 'ticketlyEvents',
  bookedSeats: 'ticketlyBookedSeats',
  favorites: 'ticketlyFavorites',
}

export const defaultEvents = [
  {
    id: 'movie-irumudi',
    name: 'Irumudi',
    category: 'Movies',
    date: '2026-11-10',
    time: '7:30 PM',
    venue: 'Vijayawada Multiplex',
    location: 'Vijayawada',
    ticketPrice: 150,
    poster: '/images/movie1.jpg',
    description:
      'A dramatic family saga set in the heart of Andhra Pradesh, packed with emotion, suspense and unforgettable performances.',
  },
  {
    id: 'movie-paradise',
    name: 'The Paradise',
    category: 'Movies',
    date: '2026-11-11',
    time: '6:30 PM',
    venue: 'City Lights Cinema',
    location: 'Vijayawada',
    ticketPrice: 180,
    poster: '/images/movie2.jpg',
    description:
      'A visually rich romantic drama where love, ambition and destiny collide in a golden city landscape.',
  },
  {
    id: 'movie-ranabali',
    name: 'Ranabali',
    category: 'Movies',
    date: '2026-11-12',
    time: '8:00 PM',
    venue: 'PVR Vijayawada',
    location: 'Vijayawada',
    ticketPrice: 200,
    poster: '/images/movie3.jpg',
    description:
      'High-energy thrills and dramatic twists make this action spectacle a must-watch for thrill lovers.',
  },
  {
    id: 'movie-ak47',
    name: 'AK47',
    category: 'Movies',
    date: '2026-11-13',
    time: '5:00 PM',
    venue: 'Metro Screen 7',
    location: 'Vijayawada',
    ticketPrice: 150,
    poster: '/images/movie4.jpg',
    description:
      'An intense action drama with slick visuals, military tension and a gripping final showdown.',
  },
  {
    id: 'event-live-music',
    name: 'Live Music Night',
    category: 'Events',
    date: '2026-11-15',
    time: '7:00 PM',
    venue: 'Vijayawada Arena',
    location: 'Vijayawada',
    ticketPrice: 499,
    poster: '/images/event1.jpg',
    description:
      'A soulful evening of live music, stage lights and performances by popular local and national artists.',
  },
  {
    id: 'event-rock-concert',
    name: 'Rock Concert',
    category: 'Concerts',
    date: '2026-11-18',
    time: '8:30 PM',
    venue: 'Prasad Labs Stadium',
    location: 'Vijayawada',
    ticketPrice: 799,
    poster: '/images/event2.jpg',
    description:
      'A powerful live rock experience with vibrant sound, energetic performances and front-row crowd energy.',
  },
  {
    id: 'event-cricket',
    name: 'Cricket Festival',
    category: 'Sports',
    date: '2026-11-20',
    time: '6:00 PM',
    venue: 'Indira Gandhi Stadium',
    location: 'Vijayawada',
    ticketPrice: 350,
    poster: '/images/event3.jpg',
    description:
      'A thrilling cricket celebration with live commentary, match excitement and family-friendly vibes.',
  },
  {
    id: 'event-comedy-night',
    name: 'Comedy Night',
    category: 'Activities',
    date: '2026-11-22',
    time: '7:15 PM',
    venue: 'Skyline Lounge',
    location: 'Vijayawada',
    ticketPrice: 299,
    poster: '/images/event4.jpg',
    description:
      'An evening of stand-up comedy, quick laughs and a relaxed vibe for friends, families and students.',
  },
]

export function readStorage(key, fallback) {
  try {
    const storedValue = window.localStorage.getItem(key)
    return storedValue === null ? fallback : JSON.parse(storedValue)
  } catch (error) {
    console.error(`Could not read Ticketly data from Local Storage (${key}).`, error)
    return fallback
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Could not save Ticketly data to Local Storage (${key}).`, error)
    throw error
  }
}

export function getStoredEvents() {
  const events = readStorage(STORAGE_KEYS.events, null)
  if (Array.isArray(events)) return events
  writeStorage(STORAGE_KEYS.events, defaultEvents)
  return defaultEvents
}

export function getStoredAccounts() {
  const accounts = readStorage(STORAGE_KEYS.accounts, [])
  return Array.isArray(accounts) ? accounts : []
}

export function getStoredBookings() {
  const bookings = readStorage(STORAGE_KEYS.bookings, [])
  return Array.isArray(bookings) ? bookings : []
}

export function getCurrentUser() {
  const user = readStorage(STORAGE_KEYS.currentUser, null)
  return user && window.localStorage.getItem(STORAGE_KEYS.loggedIn) === 'true'
    ? user
    : null
}

export function formatPrice(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)
}
