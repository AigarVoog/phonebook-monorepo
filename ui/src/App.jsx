import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import InputForm from "./components/InputForm";
import ContactsList from "./components/ContactsList";
import Notification from "./components/Notification";
import contactService from "./services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("My Name");
  const [newNumber, setNewNumber] = useState("123-456789");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showingError, setShowingError] = useState(false);

  const filteredContacts = persons.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    contactService
      .getAll()
      .then((allPersons) => {
        setPersons(allPersons);
      })
      .catch((error) => {
        setShowingError(true);
        setNotificationMessage(error.response.data.error);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    const nameExists = persons.some((person) => person.name === newName);
    nameExists
      ? showAlert(newName)
      : contactService
          .create(personObject)
          .then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson));
            setNewName("");
            setNewNumber("");
            setShowingError(false);
            setNotificationMessage(
              `'${returnedPerson.name}' was successfully added to the phonebook!`
            );
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setShowingError(true);
            setNotificationMessage(error.response.data.error);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          });
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this contact?"
      )
    ) {
      contactService
        .remove(id)
        .then(
          setPersons(persons.filter((person) => person.id !== id)),
          setShowingError(false),
          setNotificationMessage(`Contact deleted successfully!`),
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000)
        )
        .catch((error) => {
          setShowingError(true);
          setNotificationMessage(error.response.data.error);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
  };

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterInputChange = (event) => {
    setFilter(event.target.value);
  };

  const showAlert = (name) => {
    if (
      window.confirm(
        `"${name}" is already added to phonebook! Replace the old number with a new one?`
      )
    ) {
      const person = persons.find((p) => p.name === name);
      const changedPerson = { ...person, number: newNumber };
      contactService
        .update(person.id, changedPerson)
        .then((returnedPerson) => {
          if (returnedPerson === null) {
            setPersons(persons.filter((n) => n.id !== person.id));
            throw new Error();
          }
          setPersons(
            persons.map((p) => (p.id === person.id ? returnedPerson : p))
          );
          setShowingError(false);
          setNotificationMessage(`'${person.name}' was successfully modified!`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setShowingError(true);
          if (error.response && error.response.data) {
            setNotificationMessage(error.response.data.error);
          } else {
            setNotificationMessage(
              `the person '${person.name}' was already deleted from server`
            );
          }
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <h3>TESTING 123</h3>
      <Notification message={notificationMessage} isError={showingError} />
      <Filter value={filter} onChange={handleFilterInputChange} />
      <h2>Add new contact</h2>
      <InputForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameInputChange={handleNameInputChange}
        newNumber={newNumber}
        handleNumberInputChange={handleNumberInputChange}
      />
      <h2>Numbers</h2>
      <ContactsList
        filteredContacts={filteredContacts}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
