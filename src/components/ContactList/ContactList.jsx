export const ContactList = ({ neddedCards, deleteCard }) => {
  return (
    <ul>
      {neddedCards.map(({ name, number, id }) => {
        return (
          <li key={id}>
            <h2>{name}</h2>
            <p>{number}</p>
            <button type="button" onClick={() => deleteCard(id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};
