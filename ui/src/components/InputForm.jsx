const InputForm = ({ handleSubmit, newName, handleNameInputChange, newNumber, handleNumberInputChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name: <input value={newName} onChange={handleNameInputChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberInputChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default InputForm;
