import { Link } from "react-router-dom";
import { CgShortcut } from "react-icons/cg";

export function Header() {
  return (
    <header className="header">
      <div className="logo">
        <CgShortcut />
        <Link to="/">URL Shortener</Link>
      </div>

      <ul>
        <li className="header-link">
          <Link to="/admin">List</Link>
        </li>
        <li className="header-link">
          <Link to="/new-url">New</Link>
        </li>
      </ul>
    </header>
  );
}
