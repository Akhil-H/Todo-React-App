import React, { useState } from "react";

function Todo() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(0);


const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${day}-${month}-${year}`;

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handlesubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const editTodo = todo.find((d) => d.id === editId);
      const updateTodo =todo.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, input })
          : { id: t.id, input: t.input }
      );
      setTodo(updateTodo);
      setEditId(0);
      setInput('');
      return;
    }

    if (input !== "") {
      setTodo([{ id: `${Date.now()}`, input }, ...todo]);
      console.log(todo);
      setInput("");
    }
  };

  const handleDelete = (id) => {
    const newTodo = todo.filter((deleteTodo) => deleteTodo.id !== id);
    setTodo([...newTodo]);
  };

  const handleEdit = (id) => {
    const editTodo = todo.find((edit) => edit.id === id);
    setInput(editTodo.input);
    setEditId(id);
  };

  return (
    <div className="container">
      <form className="formContainer" onSubmit={handlesubmit}>
        <input 
          onChange={handleChange}
          value={input}
          type="text"
          placeholder="Entre Todo"
          name="todo"
          id="todo"
        />
        <button type="submit">{editId ? "edit" : "Add"}</button>
      </form>

      <div className="outputContainer">
        {todo.map((singleTodo) => (
         
        
          <ul key={singleTodo.id}>
            <li>
              {singleTodo.input}
              <div className="btn ">
              <button onClick={() => handleDelete(singleTodo.id)}>
                delete
              </button>
              <button onClick={() => handleEdit(singleTodo.id)}>Edit</button>
              </div>
            </li>
          </ul>
        
        ))}
      </div>
    </div>
  );
}

export default Todo;
