function SearchBar({ value, onChange }) {
  return (
    <label className="search-bar">
      <span aria-hidden="true">⌕</span>
      <input
        aria-label="Search events"
        onChange={(event) => onChange?.(event.target.value)}
        placeholder="Search events, movies, venues..."
        type="search"
        value={value}
      />
      <kbd>⌘ K</kbd>
    </label>
  )
}

export default SearchBar
