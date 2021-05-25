import React from "react";
import Link from "next/link";

const Navbar = (): JSX.Element => {
  return (
    <div className="navbar-fixed ">
      <nav>
        <div className="nav-wrapper blue darken-1">
          <Link href="/">
            <a className="brand-logo">TL</a>
          </Link>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link href="/">
                <a href="sass.html">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/todos">
                <a href="badges.html">Todos</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
