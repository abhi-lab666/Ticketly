const categories = [
  { name: 'Movies', icon: '▣', note: 'Big-screen nights' },
  { name: 'Concerts', icon: '♫', note: 'Live & loud' },
  { name: 'Sports', icon: '◉', note: 'Feel the action' },
  { name: 'Events', icon: '✳', note: 'Something special' },
  { name: 'Activities', icon: '⌁', note: 'Try something new' },
]

function Category({ selectedCategory, onSelect }) {
  return (
    <section className="category-strip" aria-label="Browse by category">
      {categories.map((category) => (
        <button
          aria-pressed={selectedCategory === category.name}
          className={selectedCategory === category.name ? 'category-tile selected' : 'category-tile'}
          key={category.name}
          onClick={() => onSelect(category.name)}
          type="button"
        >
          <span className="category-icon">{category.icon}</span>
          <span><strong>{category.name}</strong><small>{category.note}</small></span>
          <span className="category-arrow" aria-hidden="true">↗</span>
        </button>
      ))}
    </section>
  )
}

export default Category
