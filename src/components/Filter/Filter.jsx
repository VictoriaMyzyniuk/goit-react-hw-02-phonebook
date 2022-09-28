export const Filter = ({ filter, onFilterChange }) => {
  return (
    <section>
      <label htmlFor="text">
        Find contacts by name
        <input
          type="text"
          name="filter"
          value={filter}
          onChange={onFilterChange}
        />
      </label>
    </section>
  );
};
