import DeleteButton from './DeleteButton';

const ContactsList = ({ filteredContacts, handleDelete }) => {
  return (
    <div>
      {filteredContacts.map((person) => (
        <li key={person.id}>
          {person.name} {person.number} <DeleteButton id={person.id} handleDelete={handleDelete} />
        </li>
      ))}
    </div>
  );
};

export default ContactsList;
