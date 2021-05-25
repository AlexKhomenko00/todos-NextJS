import { Todo, todoHandler } from "interfaces/todo";
import React, { useRef } from "react";

interface TodoInputProps {
  onAdd: ((newTodo: Todo) => Promise<void>) | ((newTodo: Todo) => void);
}

const TodoInput = ({ onAdd }: TodoInputProps): JSX.Element => {
  const ref = useRef<HTMLInputElement>(null);

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      const newTodo: Todo = {
        id: Date.now(),
        title: ref.current!.value,
        completed: false,
      };

      onAdd(newTodo);

      ref.current!.value = "";
    }
  };

  return (
    <div className="input-field mt-2">
      <input
        ref={ref}
        type="text"
        id="title"
        placeholder="Input task"
        onKeyPress={keyPressHandler}
      />
      <label htmlFor="title" className="active">
        Create Todo
      </label>
    </div>
  );
};

export default TodoInput;
