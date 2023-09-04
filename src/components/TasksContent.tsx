import React, { useEffect, useState } from "react";
import { Todo } from "./Body";

type PropType = {
  todos: Todo[];
  setTodos: any;
  actions: string;
  setActions: any;
  setEditId: any;
};

const TasksContent = ({
  todos,
  setTodos,
  actions,
  setActions,
  setEditId,
}: PropType) => {
  const [page, setPage] = useState<number>(1);
  const [startPage, setStartPage] = useState<number>(1);
  const lastPage = todos.length / 10;
  const [active, setActive] = useState(new Date().getDate());

  const [newTodos, setNewTodos] = useState<Todo[] | []>([]);

  //     const completeTask = (id: number) => {
  //     //    const index = todos.findIndex((todo, i) => todo.id === id)
  //     //    console.log("index",index)
  //     //    todos[index].completed = !todos[index].completed
  //     //    console.log(todos[index])
  //        const index = newTodos.findIndex((todo, i) => todo.id === id)
  //        console.log("index",index)
  //        newTodos[index].completed = !newTodos[index].completed
  //        console.log(todos[index])
  //        setPage(page)

  //     // let array = todos.map((todo: any, i) => {
  //     //     if(todo.id === id && todo.completed){
  //     //         todo.completed = !todo.completed
  //     //         console.log("todo....",todo)
  //     //     }
  //     // })

  //     //setTodos([...array])
  // }

  const completeTask = (id: number) => {
    const indexToUpdate = todos.findIndex((todo) => todo.id === id);

    const updatedTodos = [...todos];

    updatedTodos[indexToUpdate] = {
      ...updatedTodos[indexToUpdate],
      completed: !updatedTodos[indexToUpdate].completed,
    };
    setTodos(updatedTodos);
  };
  const dateConvert = (value: any) => {
    const date = new Date(value);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };
  const currentDate = new Date();

  // Get the year and month of the current date
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get the first day of the month
  const firstDayOfMonth = new Date(year, month, 1);

  // Get the last day of the month
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Create an array of dates for the entire month
  const daysOfMonth = [];
  for (
    let day = firstDayOfMonth;
    day <= lastDayOfMonth;
    day.setDate(day.getDate() + 1)
  ) {
    daysOfMonth.push(new Date(day));
  }

  const dayStrings = daysOfMonth.map((date) => {
    return date.toLocaleDateString("en-US", { weekday: "long" });
  });

  useEffect(() => {
    setNewTodos(todos.slice(page * 10 - 10, page * 10));
  }, [todos, page]);
  return (
    <div className="days mt-4 flex-1 basis-2/3  lg:border-r border-gray-200  pb-10">
      <h5 className="text-base font-semibold">September 2023</h5>
      <div className="days-row mt-2 flex space-x-2">
        {dayStrings.slice(0, 12).map((day, i) => (
          <div
            key={i}
            className={` day-box flex flex-col justify-center border border-gray-300 w-fit items-center p-3 rounded hover:bg-[#3f5bf6] text-sm  hover:text-white font-semibold ${
              active === i + 1 ? "bg-[#3f5bf6] text-white" : "text-gray-700"
            }`}
            onClick={() => setActive(i + 1)}
          >
            <span>{day.slice(0, 3)}</span>
            <span>{i + 1}</span>
          </div>
        ))}
      </div>

      <div className="tasks-container mt-4 ">
        <h5 className="text-base font-semibold">My Tasks</h5>
        <div className="tasks lg:mr-3 ">
          {newTodos.map((todo, i) => (
            <div
              key={i}
              className="task bg-gray-50 flex justify-between items-center px-5 py-4 mb-3  text-sm"
              aria-disabled={todo.completed}
              onClick={(e) => {
                //e.preventDefault()
                setActions("edit");
                setEditId(todo.id);
              }}
            >
              <div className="flex space-x-3  items-center">
                <img
                  src={
                    todo.completed
                      ? "/images/checkbox-done.png"
                      : "/images/checkbox.png"
                  }
                  alt=""
                  onClick={(e) => {
                    e.stopPropagation();
                    completeTask(todo.id);
                  }}
                />
                <div className=" ">
                  <p
                    className={`${
                      todo.completed ? "text-gray-300" : "text-gray-900"
                    } font-medium ${todo.completed && "line-through"}`}
                  >
                    {todo.title}
                  </p>
                  <p
                    className={` ${
                      todo.completed ? "text-gray-300" : "text-gray-600"
                    } ${todo.completed && "line-through"}`}
                  >
                    {todo?.duration || "10:30am to 11:30am"}
                  </p>
                </div>
              </div>
              <p className="text-gray-600">
                {(todo?.date && dateConvert(todo?.date)) || "Today"}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className=" bg-white fixed bottom-0 left-0 w-full  lg:hidden pt-2 pb-4 px-3">
        <div
          className="flex items-center space-x-2 border border-gray-300 rounded-md "
          onClick={() => setActions("create")}
        >
          <input
            type="text"
            placeholder="Input task"
            className="flex-1 py-2 px-2 text-base outline-none border-none"
          />
          <img src="/images/microphone-01.png" alt="" />
        </div>
      </div>
      <div className="pagenation flex justify-between items-center text-sm text-gray-600 py-5 border-gray-200 border-t lg:mr-3  mt-7">
        <div
          className="left-dir flex space-x-2"
          onClick={() => {
            setPage(page === 1 ? 1 : page - 1);
            page < 16 && setStartPage(page === 1 ? 1 : page - 1);
          }}
        >
          <img src="/images/arrow-left.png" alt="" />
          <span className="hidden lg:inline-block">Previous</span>
        </div>
        <div className="center flex  space-x-3">
          <span
            className={`w-5 h-5 lg:w-10 lg:h-10 ${
              page === startPage && "bg-gray-200"
            } inline-flex justify-center items-center rounded-full cursor-pointer`}
            onClick={() => {
              if (lastPage - 6 > startPage) {
                setPage(startPage);
                startPage > 2 && setStartPage(startPage - 2);
              } else {
                setPage(startPage);
                setStartPage(page - 2);
              }
            }}
          >
            {startPage}
          </span>
          <span
            className={`w-5 h-5 lg:w-10 lg:h-10 ${
              page === startPage + 1 && "bg-gray-200"
            } inline-flex justify-center items-center rounded-full cursor-pointer`}
            onClick={() => {
              if (lastPage - 6 > startPage) {
                setPage(startPage + 1);
                startPage + 1 < page &&
                  startPage !== 1 &&
                  setStartPage(startPage - 1);
                startPage + 1 > page && setStartPage(startPage + 1);
              } else {
                setPage(startPage + 1);
                setStartPage(page - 1);
              }
            }}
          >
            {startPage + 1}
          </span>
          <span
            className={`w-5 h-5 lg:w-10 lg:h-10 ${
              page === startPage + 2 && "bg-gray-200"
            } inline-flex justify-center items-center rounded-full cursor-pointer`}
            onClick={() => {
              if (lastPage - 6 > startPage) {
                setPage(startPage + 2);
                startPage + 2 < page &&
                  startPage !== 1 &&
                  setStartPage(startPage - 1);
                startPage + 2 > page && setStartPage(startPage + 2);
                startPage + 2 === page && setStartPage(startPage + 2);
              } else {
                setPage(startPage - 1);
                setStartPage(page - 1);
              }
            }}
          >
            {startPage + 2}
          </span>
          <span className="w-5 h-5 lg:w-10 lg:h-10 font-bold  inline-flex justify-center items-center rounded-full ">
            ...
          </span>
          <span
            className={`w-5 h-5 lg:w-10 lg:h-10 ${
              page === lastPage - 2 && "bg-gray-200"
            } inline-flex justify-center items-center rounded-full cursor-pointer`}
            onClick={() => {
              setPage(lastPage - 2);
              lastPage - 2 < page &&
                startPage !== 1 &&
                setStartPage(startPage - 1);
            }}
          >
            {lastPage - 2}
          </span>
          <span
            className={`w-5 h-5 lg:w-10 lg:h-10${
              page === lastPage - 1 && "bg-gray-200"
            } inline-flex justify-center items-center rounded-full cursor-pointer`}
            onClick={() => {
              setPage(lastPage - 1);
              lastPage - 2 < page &&
                startPage !== 1 &&
                setStartPage(startPage - 1);
            }}
          >
            {lastPage - 1}
          </span>
          <span
            className={`w-5 h-5 lg:w-10 lg:h-10 ${
              page === lastPage && "bg-gray-200"
            } inline-flex justify-center items-center rounded-full cursor-pointer`}
            onClick={() => setPage(lastPage)}
          >
            {lastPage}
          </span>

          {/* <span className="w-10 h-10  inline-flex justify-center items-center rounded-full" onClick={(e) => console.log(e.currentTarget.innerText)}>{lastPage}</span> */}
        </div>
        <div
          className="right-dir flex space-x-2"
          onClick={() => {
            lastPage - 5! > startPage &&
              setStartPage(page === lastPage ? lastPage : page + 1);
            setPage(page === lastPage ? lastPage : page + 1);
          }}
        >
          <span className="hidden lg:inline-block">Previous</span>
          <img src="/images/arrow-right.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default TasksContent;
