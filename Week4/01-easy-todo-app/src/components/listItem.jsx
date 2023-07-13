
function ListItem(props) {
  const {
    todo: { id, title, description },
    deleteHandler,
    editHandler
  } = props;
  return (
    <div key={`${id}`}>
      <h3>
        {title} - {description}
      </h3>
      <button onClick={() => deleteHandler(id)}>Delete</button>
      <button onClick={() => editHandler(id)}>Edit</button>

    </div>
  );
}

export default ListItem;
