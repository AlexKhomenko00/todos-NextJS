import React, { useEffect, useState } from "react";
import TodoInput from "components/TodoInput";
import TodoList from "components/TodoList";
import { Todo, todoHandler } from "interfaces/todo";
import { NextPageContext } from "next";

const Todos = ({ serverPosts }: { serverPosts: Todo[] }): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>(serverPosts || []);

  const isServer = serverPosts;

  useEffect(() => {
    const loadItems = async () => {
      const data: string = localStorage.getItem("todos") || "{}";

      const localTodos: Todo[] = await JSON.parse(data);

      setTodos(localTodos);
    };

    if (!isServer) {
      loadItems();
    }
  }, []);

  useEffect(
    () => localStorage.setItem("todos", JSON.stringify(todos)),
    [todos]
  );

  const handleAddTodo = (newTodo: Todo) =>
    setTodos((prevTodos) => [...prevTodos, newTodo]);

  const handleAddTodoAsync = async (todo: Todo): Promise<void> => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(todo),
    });

    const newTodo: Todo = await data.json();

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleRemoveTodo: todoHandler = (id) =>
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

  const handleRemoveTodoAsync: todoHandler = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleToggleTodo: todoHandler = (id) =>
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

  const handleToggleTodoAsync: todoHandler = async (id) => {
    const todo = todos.find((todo) => todo.id === id);

    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ completed: !todo?.completed }),
    });

    const updatedTodo: Todo = await data.json();

    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  return (
    <section className="container">
      <TodoInput onAdd={isServer ? handleAddTodoAsync : handleAddTodo} />
      <TodoList
        todos={todos}
        onRemove={isServer ? handleRemoveTodoAsync : handleRemoveTodo}
        onToggle={isServer ? handleToggleTodoAsync : handleToggleTodo}
      />
    </section>
  );
};

export const getServerSideProps = async ({ req }: NextPageContext) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
    const posts: Todo[] = await response.json();

    return {
      props: {
        serverPosts: posts,
      },
    };
  } catch (e) {
    return {
      props: {
        serverPosts: null,
      },
    };
  }
};

export default Todos;
