import React, { useState, useEffect } from "react";
import { useQuery, useSubscription, useMutation } from "@apollo/client";
import TodoItem from "./TodoItem";
import TodoFilters from "./TodoFilters";
import SUBSCRIBE_MY_TODOS from "../../GraphQL/SUBSCRIBE_MY_TODOS";
import GET_MY_TODOS from "../../GraphQL/GET_MY_TODOS";
import CLEAR_COMPLETED from "../../GraphQL/CLEAR_COMPLETED";
import Loader from "../Loader";

const TodoList = (props) => {
  const [state, setState] = useState({
    filter: "all",
    clearInProgress: false,
  });

  const filterResults = (filter) => {
    setState({
      ...state,
      filter: filter,
    });
  };

  const [clearCompletedTodos] = useMutation(CLEAR_COMPLETED);

  const clearCompleted = () => {
    clearCompletedTodos({
      optimisticResponse: true,
      update: (cache, { data }) => {
        const existingTodos = cache.readQuery({ query: GET_MY_TODOS });
        const newTodos = existingTodos.todos.filter((t) => !t.is_completed);
        cache.writeQuery({ query: GET_MY_TODOS, data: { todos: newTodos } });
      },
    });
  };

  const { todos } = props;

  let filteredTodos = todos;

  if (state.filter === "active") {
    filteredTodos = todos.filter((todo) => todo.is_completed !== true);
  } else if (state.filter === "completed") {
    filteredTodos = todos.filter((todo) => todo.is_completed === true);
  }

  const todoList = [];
  filteredTodos.forEach((todo, index) => {
    todoList.push(<TodoItem key={index} index={index} todo={todo} />);
  });

  return (
    <>
      <div className="todoListWrapper">
        <ul>{todoList}</ul>
      </div>

      <TodoFilters
        todos={filteredTodos}
        currentFilter={state.filter}
        filterResultsFn={filterResults}
        clearCompletedFn={clearCompleted}
        clearInProgress={state.clearInProgress}
      />
    </>
  );
};

const TodoListQuery = () => {
  const { loading, error, data } = useSubscription(SUBSCRIBE_MY_TODOS);
  const { isLoading, isError, isData } = useQuery(GET_MY_TODOS);
  const [currentData, setCurrentData] = useState(isData);

  useEffect(() => {
    if (data !== undefined) {
      setCurrentData(data);
    }
  }, [data]);

  if (loading || error) {
    return (
      <div className="loading2">
        <Loader />
      </div>
    );
  }

  return currentData !== undefined ? (
    <TodoList todos={currentData.todos} />
  ) : (
    "Hold on"
  );
};

export default TodoListQuery;
