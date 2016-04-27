export default ({count}) =>
  <p>
    Count:{" "}
    <button data-click={{type: 'decrement'}}> - </button>
    <span>{count}</span>
    <button data-click={{type: 'increment'}}> + </button>
  </p>
