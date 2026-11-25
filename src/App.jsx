import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './Components/ProtectedRoute.jsx'
import AdminDashboard from './Pages/AdminDashboard.jsx'
import AdminLogin from './Pages/AdminLogin.jsx'
import Booking from './Pages/Booking.jsx'
import CategoryPage from './Pages/CategoryPage.jsx'
import EventDetails from './Pages/EventDetails.jsx'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import LoginChoice from './Pages/LoginChoice.jsx'
import ManageEvents from './Pages/ManageEvents.jsx'
import MyTickets from './Pages/MyTickets.jsx'
import NotFound from './Pages/NotFound.jsx'
import Signup from './Pages/Signup.jsx'
import UserDashboard from './Pages/UserDashboard.jsx'
import { getCurrentUser, getStoredAccounts, getStoredEvents, STORAGE_KEYS, writeStorage } from './utils/storage.js'
import './App.css'

function App() {
  const [user, setUser] = useState(getCurrentUser)
  const [events, setEvents] = useState(getStoredEvents)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('Vijayawada')
  const [loginNotice, setLoginNotice] = useState('')

  useEffect(() => {
    writeStorage(STORAGE_KEYS.events, events)
  }, [events])

  function handleLogin(account) {
    writeStorage(STORAGE_KEYS.currentUser, account)
    window.localStorage.setItem(STORAGE_KEYS.loggedIn, 'true')
    setUser(account)
    setLoginNotice(`Welcome back, ${account.name}!`)
  }

  function handleRegister(account) {
    const accounts = getStoredAccounts()
    const isDuplicate = accounts.some((storedAccount) =>
      storedAccount.email?.toLowerCase() === account.email.toLowerCase() ||
      storedAccount.phone === account.phone,
    )

    if (isDuplicate) return false

    writeStorage(STORAGE_KEYS.accounts, [...accounts, account])
    return true
  }

  function handleLogout() {
    window.localStorage.removeItem(STORAGE_KEYS.currentUser)
    window.localStorage.setItem(STORAGE_KEYS.loggedIn, 'false')
    setUser(null)
    setLoginNotice('')
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Home
          events={events}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          user={user}
          onLogout={handleLogout}
        />}
      />
      {['Movies', 'Events', 'Concerts', 'Sports', 'Activities'].map((category) => (
        <Route
          key={category}
          path={`/${category.toLowerCase()}`}
          element={<CategoryPage
            category={category}
            events={events}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            user={user}
            onLogout={handleLogout}
          />}
        />
      ))}
      <Route
        path="/login"
        element={user
          ? <Navigate replace to={user.role === 'Admin' ? '/admin' : '/dashboard'} state={{ message: `Welcome back, ${user.name}!` }} />
          : <LoginChoice />}
      />
      <Route
        path="/user/login"
        element={user
          ? <Navigate replace to={user.role === 'Admin' ? '/admin' : '/dashboard'} />
          : <Login onLogin={handleLogin} />}
      />
      <Route
        path="/admin/login"
        element={user
          ? <Navigate replace to={user.role === 'Admin' ? '/admin' : '/dashboard'} />
          : <AdminLogin onLogin={handleLogin} />}
      />
      <Route
        path="/signup"
        element={user
          ? <Navigate replace to={user.role === 'Admin' ? '/admin' : '/dashboard'} state={{ message: `Welcome back, ${user.name}!` }} />
          : <Signup onRegister={handleRegister} />}
      />
      <Route path="/register" element={<Navigate replace to="/signup" />} />
      <Route
        path="/event/:id"
        element={<EventDetails
          events={events}
          user={user}
          onLogout={handleLogout}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />}
      />
      <Route
        path="/booking/:id"
        element={<ProtectedRoute user={user} allowedRole="User"><Booking
          events={events}
          user={user}
          onLogout={handleLogout}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        /></ProtectedRoute>}
      />
      <Route
        path="/dashboard"
        element={<ProtectedRoute user={user} allowedRole="User"><UserDashboard
          user={user}
          events={events}
          notice={loginNotice}
          onLogout={handleLogout}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        /></ProtectedRoute>}
      />
      <Route
        path="/tickets"
        element={<ProtectedRoute user={user} allowedRole="User"><MyTickets
          user={user}
          onLogout={handleLogout}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        /></ProtectedRoute>}
      />
      <Route
        path="/admin"
        element={<ProtectedRoute user={user} allowedRole="Admin"><AdminDashboard user={user} events={events} notice={loginNotice} onLogout={handleLogout} /></ProtectedRoute>}
      />
      <Route
        path="/admin/events"
        element={<ProtectedRoute user={user} allowedRole="Admin"><ManageEvents user={user} events={events} setEvents={setEvents} onLogout={handleLogout} /></ProtectedRoute>}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
