
import  { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink className="navbar-brand" exact to="/">Movie Management</NavLink>
            <div className="navbar-nav ml-auto">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item"><NavLink className="nav-link" exact to="/">Home</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/movie">Movie</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/rating">Rating</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/suggest">Suggestion</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/person">Person</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;