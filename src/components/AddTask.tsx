import { useEffect, useState } from "react";
import { Todo } from "./Body";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type PropType = {
  todos: Todo[];
  setTodos: any;
  actions: string;
  setActions: any;
  editId: any;
};

const AddTask = ({
  todos,
  setTodos,
  actions,
  setActions,
  editId,
}: PropType) => {
  const [task, setTask] = useState<Todo | {}>({});
  const [startDate, setStartDate] = useState(new Date());
  const [start, setStart] = useState({ hour: "00", min: "00" });
  const [end, setEnd] = useState({ hour: "00", min: "00" });
  console.log("start", startDate);

  const [textValue, setTextValue] = useState("");
  const editTask = () => {
    const indexToUpdate = todos.findIndex((todo) => todo.id === editId);

    const updatedTodos = [...todos];

    updatedTodos[indexToUpdate] = {
      ...updatedTodos[indexToUpdate],
      title: textValue,
      date: startDate,
      duration: `${start.hour || "00"}:${start.min || "00"} - ${
        end.hour || "00"
      }:${end.min || "00"}`,
    };
    setTodos(updatedTodos);
    setActions("calendar");
  };

  const createTask = () => {
    const newTask = {
      id: todos.length + 1,
      title: textValue,
      date: dateConvert(startDate),
      duration: `${start.hour || "00"}:${start.min || "00"} - ${
        end.hour || "00"
      }:${end.min || "00"}`,
    };

    const updatedTodos = [newTask, ...todos];

    setTodos(updatedTodos);
    setActions("calendar");
  };

  const dateConvert = (value: any) => {
    const date = new Date(value);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    // const formattedDate =  `${day}-${month}-${year}`;
    const formattedDate = `${day}-${month}`;

    return formattedDate;
  };

  console.log("new", dateConvert(new Date()));

  useEffect(() => {
    if (actions === "create-edit") {
      const obj = todos.filter((todo, i) => todo.id === editId);
      setTask(obj[0]);
      setTextValue(obj[0]?.title);
      obj[0]?.date && setStartDate(obj[0]?.date);
    }
  }, [todos, actions]);

  console.log(task);

  return (
    <div
      className={`create-task p-4 border border-gray-200 ${
        actions === "create-edit" && "top-[150px]"
      } `}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-900 text-lg font-semibold">Add Task</span>
        <img
          src="/images/cancel.png"
          alt=""
          onClick={() => setActions("calendar")}
        />
      </div>
      <textarea
        name=""
        id=""
        cols={30}
        rows={5}
        className="border border-gray-300 rounded-lg w-full p-2 text-xs"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
      ></textarea>
      <div className=" calendar-date flex justify-between items-center mt-2">
        <DatePicker
          selected={startDate}
          onChange={(date: any) => setStartDate(date)}
          customInput={
            <div className=" flex items-center text-sm font-semibold text-gray-500 space-x-2 border border-gray-300 rounded-lg py-2 px-3">
              <img src="/images/calendar-1.png" alt="" />
              <span>
                {dateConvert(new Date()) === dateConvert(startDate)
                  ? "Today"
                  : dateConvert(startDate)}
              </span>
            </div>
          }
        />

        <div></div>
        <div className="flex space-x-3">
          <div className="flex items-center text-sm font-semibold text-gray-500 space-x-2 border border-gray-300 rounded-lg py-2 px-3">
            <img src="/images/clock-1.png" alt="" />
            <span className="flex border-none outline-none space-x-1">
              {" "}
              <input
                type="text"
                value={start.hour}
                onChange={(e) =>
                  setStart((prev) => ({ ...prev, hour: e.target.value }))
                }
                className="w-5 h-fit"
              />
              :{" "}
              <input
                type="text"
                value={start.min}
                onChange={(e) =>
                  setStart((prev) => ({ ...prev, min: e.target.value }))
                }
                className="w-5 h-fit"
              />
            </span>
          </div>
          <div className="flex items-center text-sm font-semibold text-gray-500 space-x-2 border border-gray-300 rounded-lg py-2 px-3">
            <img src="/images/clock-1.png" alt="" />
            <span className="flex border-none outline-none space-x-1">
              {" "}
              <input
                type="text"
                value={end.hour}
                onChange={(e) =>
                  setEnd((prev) => ({ ...prev, hour: e.target.value }))
                }
                className="w-5 h-fit"
              />
              :{" "}
              <input
                type="text"
                value={end.min}
                onChange={(e) =>
                  setEnd((prev) => ({ ...prev, min: e.target.value }))
                }
                className="w-5 h-fit"
              />
            </span>
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <p className="flex items-center text-base font-semibold text-gray-500 space-x-2 mt-3">
          {" "}
          <img src="/images/bell-01.png" alt="" />
          <span>10 minutes before</span>{" "}
        </p>
        <img src="/images/cancel.png" alt="" className="w-5" />
      </div>
      <div className="flex justify-center space-x-3 mt-6">
        <button
          className="flex-1 h-9 text-sm font-semibold border border-gray-300 rounded-md"
          onClick={() => setActions("calendar")}
        >
          Cancel
        </button>
        <button
          className="flex-1 h-9 text-white font-semibold text-sm border border-[#3F5BF6] bg-[#3F5BF6] rounded-md"
          onClick={() => {
            actions === "create-edit" ? editTask() : createTask();
          }}
        >
          {actions === "create-edit" ? "Save" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default AddTask;
