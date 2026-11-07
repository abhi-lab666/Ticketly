import { Link } from 'react-router-dom'

const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <footer className="site-footer">
      <Link className="brand footer-brand" to="/"><img src="/images/logo.png" alt="" /><span>TICKETLY</span></Link>
      <p>Find your next unforgettable moment.</p>
      <span>© {currentYear} Ticketly · Made for experiences</span>
    </footer>
  )
}

export default Footer
