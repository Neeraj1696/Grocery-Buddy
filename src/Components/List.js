import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function List({ items, editItem, removeItem }) {
  return (
    <div className=" mr-4">
      {items.map((item) => {
        const { id, title } = item;

        return (
          <article className="mt-2 flex justify-center items-center ">
            <p className=" w-60 bg-slate-200 p-1 rounded-sm">{title}</p>
            <div className="">
              <button type="button" onClick={() => editItem(id)}>
                <FaEdit className="ml-2" />
              </button>
              <button
                className="ml-2 "
                type="button"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default List;
