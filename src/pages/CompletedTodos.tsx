import React from "react";
import NavBar from "../components/NavBar";
import CompletedTodoList from "../components/CompletedTodoList";
import { getLoginInfo } from "../utils/Logininfo";
import custom_axios from "../axios/AxiosSetup";
import { ApiConstants } from "../api/ApiConstants";
import { toast } from "react-toastify";

interface TodoModel {
  title: string;
  date: string;
  id: number;
}

const CompeletedTodos = () => {
  const [todos, setTodos] = React.useState<TodoModel[]>([]);

  const getAllCompletedTodos = async () => {
    const userId = getLoginInfo()?.userId;
    if (userId != null) {
      const response = await custom_axios.get(ApiConstants.TODO.FIND_COMPLETED(userId), { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
      setTodos(response.data);
    } else {
      toast.info("Sorry you are not authenticated");
    }
  };

  React.useEffect(() => {
    if (todos.length == 0) getAllCompletedTodos();
  }, []);

  return (
    <div>
      <NavBar></NavBar>
      <h1>Completed Todos</h1>
      <div>
        <ul>
          {todos.map((todo) => {
            return (
              <CompletedTodoList
                key={todo.id}
                dateTime={todo.date}
                deleteTodo={async () => {
                  const response = await custom_axios.delete(ApiConstants.TODO.DELETE(todo.id), { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
                  getAllCompletedTodos();
                  toast.success("Todo Deleted Sucessfully!!");
                }}
                id={todo.id}
                todo={todo.title}
              ></CompletedTodoList>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CompeletedTodos;