import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

export default function Navigation() {

    const getNavLinkClass = ({ isActive }) => {
        return clsx(isActive && css.active);
    };

    return (
        <nav className={css.nav}>
            <ul className={css.menuList}>
                <li>
                    <NavLink to="/" className={getNavLinkClass}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/movies" className={getNavLinkClass}>
                        Movies
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}