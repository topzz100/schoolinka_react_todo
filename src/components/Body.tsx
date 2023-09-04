import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import axios from "axios";
import TasksContent from "./TasksContent";

// import Calendar from 'react-calendar';
export type Todo = {
  id: number;
  completed: boolean;
  title: string;
  userId: string;
  date: any;
  duration: string;
};

const Body = () => {
  const [value, setValue] = useState<any>(dayjs(new Date()));
  //console.log(value.$d)
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [actions, setActions] = useState("calendar");
  const [editId, setEditId] = useState<number | null>(null);
  const getJobs = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
      console.log(res.data);
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(editId);

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <section className="main-content container mx-auto mb-5 px-2 lg:px-20  w-full">
      <div className="header mt-4 flex justify-between ">
        <div>
          <p className="text-gray-900 text-3xl font-semibold">Good morning!</p>
          <p className="text-gray-600 text-sm font-normal">
            You got some task to do.
          </p>
        </div>
        <button
          className="bg-[#3F5BF6] my-auto items-center rounded-lg space-x-3 px-3 py-2 hidden lg:flex"
          onClick={() => setActions("create")}
        >
          <img src="/images/Icon.png" alt="" />
          <span className="text-white text-sm">Create New Task</span>
        </button>
      </div>
      <div className="content-body flex space-x-4 flex-1 w-full  ">
        <TasksContent
          todos={todos}
          setTodos={setTodos}
          actions={actions}
          setActions={setActions}
          setEditId={setEditId}
        />
        <div
          className={`${
            actions === "calendar" && "hidden"
          } calendar  lg:block cal basis-1/3 flex-1  mt-4`}
        >
          {actions === "calendar" ? (
            <div className="calendar-container p-4 border border-gray-200">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateCalendar", "DateCalendar"]}>
                  <DemoItem>
                    <DateCalendar
                      value={value}
                      onChange={(newValue) => {
                        setActions("create");
                        setValue(newValue);
                      }}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </div>
          ) : actions === "edit" ? (
            <EditTask
              editId={editId}
              todos={todos}
              setTodos={setTodos}
              setActions={setActions}
            />
          ) : (
            <AddTask
              actions={actions}
              todos={todos}
              setTodos={setTodos}
              setActions={setActions}
              editId={editId}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Body;
