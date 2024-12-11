
export default function Child({ buttonText, onChildClick }) {
  return (
    <div className="child">
      <button type="submit" onClick={onChildClick}>
        {buttonText}
      </button>
    </div>
  );
}

