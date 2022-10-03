import React, { useEffect, useState } from "react";
import Alert from "./Alert";
import "./App.css";
import List from "./Components/List";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  // console.log(name);

  const ClearList = (e) => {
    showAlert(true, "danger", "empty List");
    setList([]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Please Enter a Value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );

      setName("");
      setIsEditing(false);
      setEditId(null);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "item added to the List");

      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
      // console.log("item add");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    showAlert(true, "danger", "item is Edited");
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "item is removed from the List");
    setList(list.filter((item) => item.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div className="App w-full h-screen bg-slate-400">
      <section className="section-center p-20">
        <h3 className="text-4xl mb-8 font-bold">Grocery Buddy</h3>
        <form onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} />}
          <input
            className="outline-none rounded-md  p-1 w-60 justify-center "
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g.Eggs"
          />
          <button
            className="ml-2 bg-slate-200 p-1 rounded-md text-center"
            type="submit"
          >
            {isEditing ? "Edit" : "Submit"}
          </button>
        </form>
        {list.length > 0 && (
          <div>
            <List items={list} editItem={editItem} removeItem={removeItem} />

            <div>
              <button
                className="bg-white mr-16 p-1 mt-2 rounded-md"
                onClick={ClearList}
              >
                Clear Item{" "}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
