import { Todo, todoHandler, todoHandlerAsync } from "interfaces/todo";
import React from "react";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  onToggle: todoHandler | todoHandlerAsync;
  onRemove: todoHandler | todoHandlerAsync;
};

const TodoList = ({
  todos,
  onToggle,
  onRemove,
}: TodoListProps): JSX.Element => {
  if (todos.length === 0) {
    return (
      <p className="center grey-text text-lighten-1 fs-1">
        You have no plans yet!
      </p>
    );
  }

  const removeHandler = (event: React.MouseEvent, id: number) => {
    event.preventDefault();
    onRemove(id);
  };

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          removeHandler={removeHandler}
        />
      ))}
    </ul>
  );
};

export default TodoList;
