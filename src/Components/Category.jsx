import { Link } from 'react-router-dom'

const categories = [
  { name: 'Movies', icon: '▣', note: 'Big-screen nights' },
  { name: 'Concerts', icon: '♫', note: 'Live & loud' },
  { name: 'Sports', icon: '◉', note: 'Feel the action' },
  { name: 'Events', icon: '✳', note: 'Something special' },
  { name: 'Activities', icon: '⌁', note: 'Try something new' },
]

function Category() {
  return (
    <section className="category-strip" aria-label="Browse by category">
      {categories.map((category) => (
        <Link
          className="category-tile"
          key={category.name}
          to={`/${category.name.toLowerCase()}`}
        >
          <span className="category-icon">{category.icon}</span>
          <span><strong>{category.name}</strong><small>{category.note}</small></span>
          <span className="category-arrow" aria-hidden="true">↗</span>
        </Link>
      ))}
    </section>
  )
}

export default Category
