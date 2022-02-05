
import  { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink className="navbar-brand mx-5" exact="true" to="/">Movie Management</NavLink>
            <div className="navbar-nav ml-auto">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item"><NavLink className="nav-link" exact="true" to="/">Home</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" exact="true" to="/user">User</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" exact="true" to="/movie">Movie</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" exact="true" to="/genre">Genre</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" exact="true" to="/genrerelation">Genre Relation</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" exact="true" to="/rating">Rating</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" exact="true" to="/suggest">Suggestion</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" exact="true" to="/person">Person</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" exact="true" to="/role">Role</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;