import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getStoredAccounts } from '../utils/storage.js'

function Login({ onLogin }) {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    const enteredIdentifier = identifier.trim().toLowerCase()
    const registeredUser = getStoredAccounts().find((user) =>
      (user.email.toLowerCase() === enteredIdentifier || user.phone === identifier.trim()) &&
      user.password === password,
    )
    const account = registeredUser ? { ...registeredUser, role: 'User' } : null

    if (!account) {
      setErrorMessage('Those login details do not match an account. Please try again.')
      return
    }

    onLogin(account)
    navigate(account.role === 'Admin' ? '/admin' : '/dashboard', {
      replace: true,
      state: { message: `Welcome back, ${account.name}!` },
    })
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link className="brand auth-brand" to="/"><img src="/images/logo.png" alt="" /><span>TICKETLY</span></Link>
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Good to see you.</h1>
        <p className="auth-description">Sign in to pick up where the good times left off.</p>
        <form className="form-stack" onSubmit={handleSubmit}>
          <label>Email or phone number
            <input autoComplete="username" onChange={(event) => setIdentifier(event.target.value)} required value={identifier} />
          </label>
          <label>Password
            <input autoComplete="current-password" onChange={(event) => setPassword(event.target.value)} required type="password" value={password} />
          </label>
          {errorMessage && <p className="form-message error" role="alert">{errorMessage}</p>}
          <button className="button button-primary button-wide" type="submit">Log in <span aria-hidden="true">→</span></button>
        </form>
        <p className="auth-switch">New to Ticketly? <Link to="/signup">Create an account</Link></p>
        <p className="auth-switch"><Link to="/login">← Choose a different sign-in module</Link></p>
      </section>
    </main>
  )
}

export default Login
