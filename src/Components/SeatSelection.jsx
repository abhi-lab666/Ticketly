const seatRows = ['A', 'B', 'C', 'D', 'E', 'F']

function SeatSelection({ bookedSeats, selectedSeats, onToggle }) {
  return (
    <div className="seat-picker">
      <div className="screen-label"><span /> SCREEN</div>
      <div className="seat-rows">
        {seatRows.map((row) => (
          <div className="seat-row" key={row}>
            <span className="row-label">{row}</span>
            {Array.from({ length: 8 }, (_, index) => {
              const seat = `${row}${index + 1}`
              const isBooked = bookedSeats.includes(seat)
              const isSelected = selectedSeats.includes(seat)
              return (
                <button
                  aria-label={`${seat}${isBooked ? ', booked' : isSelected ? ', selected' : ', available'}`}
                  aria-pressed={isSelected}
                  className={`seat ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                  disabled={isBooked}
                  key={seat}
                  onClick={() => onToggle(seat)}
                  type="button"
                >
                  {index + 1}
                </button>
              )
            })}
            <span className="row-label">{row}</span>
          </div>
        ))}
      </div>
      <div className="seat-legend">
        <span><i className="available" /> Available</span>
        <span><i className="chosen" /> Selected</span>
        <span><i className="unavailable" /> Booked</span>
      </div>
    </div>
  )
}

export default SeatSelection
