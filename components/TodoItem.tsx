import React from "react";

import { Todo, todoHandler } from "interfaces/todo";

type TodoItemProps = {
  todo: Todo;
  onToggle: todoHandler;
  removeHandler(event: React.MouseEvent, id: number): void;
};

const TodoItem = ({
  todo,
  onToggle,
  removeHandler,
}: TodoItemProps): JSX.Element => {
  const classes: string[] = ["todo"];

  if (todo.completed) {
    classes.push("completed");
  }

  return (
    <li className={classes.join(" ")} key={todo.id}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle.bind(null, todo.id)}
        />
        <span>{todo.title}</span>
        <i
          className="material-icons red-text"
          onClick={(event) => removeHandler(event, todo.id)}
        >
          delete
        </i>
      </label>
    </li>
  );
};

export default TodoItem;
