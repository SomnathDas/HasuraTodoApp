import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import ADD_TODO from "../../GraphQL/ADD_TODO";
import GET_MY_TODOS from "../../GraphQL/GET_MY_TODOS";

const TodoInput = ({ isPublic = false }) => {
  const [todoInput, setTodoInput] = useState("");

  const updateCache = (cache, { data }) => {
    // If this is for the public feed, do nothing

    if (isPublic) {
      return null;
    }

    // Fetch the todos from the cache

    const existingTodos = cache.readQuery({
      query: GET_MY_TODOS,
    });

    // Add the new todo to the cache

    const newTodo = data.insert_todos.returning[0];

    cache.writeQuery({
      query: GET_MY_TODOS,

      data: { todos: [newTodo, ...existingTodos.todos] },
    });
  };

  const resetInput = () => {
    setTodoInput("");
  };

  const [addTodo] = useMutation(ADD_TODO, {
    update: updateCache,
    onCompleted: resetInput,
  });

  function isBlank(str) {
    return !str || /^\s*$/.test(str);
  }

  return (
    <form
      className="formInput"
      onSubmit={(e) => {
        e.preventDefault();
        isBlank(todoInput)
          ? 0
          : addTodo({ variables: { todo: todoInput, isPublic } });
      }}
    >
      <input
        className="input"
        placeholder="What needs to be done?"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
      />
      <i className="inputMarker fa fa-angle-right" />
    </form>
  );
};

export default TodoInput;
