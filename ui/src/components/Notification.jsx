const Notification = ({ message, isError }) => {
  const notificationStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
    paddingBottom: 16,
  };

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === null) {
    return null;
  }

  return <div style={isError ? errorStyle : notificationStyle}>{message}</div>;
};

export default Notification;
