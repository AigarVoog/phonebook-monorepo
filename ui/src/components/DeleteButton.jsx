const DeleteButton = ({ id, handleDelete }) => {
  return <button onClick={() => handleDelete(id)}>delete</button>;
};

export default DeleteButton;
