import { useEffect, useState } from "react";
import { Todo } from "./Body";

type PropType = {
  editId: any;
  todos: Todo[];
  setTodos: any;
  setActions: any;
};
const EditTask = ({ editId, todos, setTodos, setActions }: PropType) => {
  const [task, setTask] = useState<Todo | null>(null);

  const deleteTask = () => {
    const array = todos.filter((todo, i) => todo.id !== editId);
    setTodos(array);
    setActions("calendar");
  };
  const dateConvert = (value: any) => {
    const date = new Date(value);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    // const formattedDate =  `${day}-${month}-${year}`;
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };
  useEffect(() => {
    const obj = todos.filter((todo, i) => todo.id === editId);
    setTask(obj[0]);
  }, [todos, editId]);

  return (
    <div className="edit-task p-4 border border-gray-200">
      <div className="flex justify-end">
        <img
          src="/images/cancel.png"
          alt=""
          onClick={() => setActions("calendar")}
        />
      </div>
      <p className="font-semibold text-lg mb-5">{task?.title}</p>
      <p className="flex items-center space-x-2 text-base font-medium mb-2">
        <img src="/images/calendar.png" alt="" />{" "}
        <span>
          {(task?.date && dateConvert(task?.date)) || "20th January, 2023"}
        </span>{" "}
      </p>
      <p className="flex items-center space-x-2 text-base font-medium">
        <img src="/images/clock.png" alt="" />{" "}
        <span>{task?.duration || "8:00 - 10:00AM"}</span>{" "}
      </p>
      <div className="flex justify-center space-x-3 mt-5">
        <button
          className="w-36 h-9 text-sm font-semibold border border-gray-300 rounded"
          onClick={deleteTask}
        >
          Delete
        </button>
        <button
          className="w-36 h-9 text-white font-semibold text-sm border border-[#3F5BF6] bg-[#3F5BF6] rounded"
          onClick={() => setActions("create-edit")}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditTask;
