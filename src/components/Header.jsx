import { Link, NavLink } from "react-router-dom";

//grupofacilitti logo
import grupoFacilittiLogo from "../../src/assets/gf-logo.png";

const Header = () => {
  return (
    <nav className="nav-container">
      <Link className="" to="/">
        <img className="logo" src={grupoFacilittiLogo} alt="" />
      </Link>
      <div className="navigation-links">
        <NavLink to="/" className="">
          Formulário
        </NavLink>
        <NavLink to="/resumes" className="">
          Candidatos
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
