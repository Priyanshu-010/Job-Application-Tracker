import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "lucide-react";

const Navbar = ({ theme, handleTheme }) => {
  return (
    <header className="">
      <nav className="">
        <Link to={"/"}>
          <span>TrackHunt</span>
        </Link>
        <div>
          <ul>
            <li>
              <button onClick={handleTheme}>
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </button>
            </li>
            <li>Add Job</li>
            <li>Login</li>
            <li>Register</li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
