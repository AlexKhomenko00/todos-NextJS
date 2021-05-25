import Link from "next/link";
import React from "react";

export default function HomePage(): JSX.Element {
  return (
    <>
      <main className="container">
        <h1 className="grey-text text-darken-3">Welcome to the TodoList! </h1>
        <p className="flow-text grey-text text-darken-4">
          This is the classic todo-list application build with the help of
          <span className="grey-text text-darken-1"> NextJS </span> and{" "}
          <span className="blue-text text-darken-3"> Typescript </span>.
        </p>
        <p className="flow-text grey-text text-darken-4">
          If you want to make your day busy, go to the Todo-List and add some
          tasks :)
        </p>
        <Link href="/todos">
          <a className="waves-effect waves-light btn-large mt-2">
            Make it busy!
          </a>
        </Link>
      </main>
    </>
  );
}
