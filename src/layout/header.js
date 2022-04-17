import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

function Header() {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const [overlay, setOverlay] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);

  useEffect(() => {
    if(activeMenu) setOverlay(true);
  }, [activeMenu])

  useEffect(() => {
    if(!overlay) setActiveMenu(false);
  }, [overlay])

  return (
    <React.Fragment>
      <header className="w-full fixed top-0 flex flex-col md:flex-row shadow-sm z-50 bg-white">
        <div className="container mx-auto px-4 md:px-6 py-4 flex flex-row items-center justify-between">
          <button
            className="p-2 md:hidden disabled:text-gray-300"
            onClick={() => navigate(-1)}
            disabled={pathname === '/'}
          >
            <Icon icon="bi:arrow-left" className="text-2xl" />  
          </button>
          <img
            src={require("assets/img/pokeball.png")}
            className="w-8"
            alt="pokemon"
          />
          <button
            className="p-2 md:hidden"
            onClick={() => setActiveMenu(!activeMenu)}
          >
            <Icon icon="iconoir:menu-scale" className="text-2xl" />
          </button>
        </div>
        <nav className={`${!activeMenu ? 'hidden' : ''} border-t-2 md:border-t-0 md:flex justify-end w-full py-2 md:py-4 md:px-2`}>
          <ul className="list-none flex flex-nowrap flex-col md:flex-row">
            <li>
              <Link to="/" onClick={() => setActiveMenu(false)}>
                <span className="block px-4 py-2">Pokemons</span>
              </Link>
            </li>
            <li>
              <Link to="/my-pokemons" onClick={() => setActiveMenu(false)}>
                <span className="block px-4 py-2  ">My Pokemons</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {overlay &&
        <div
          onClick={() => setOverlay(false)}
          className="absolute top-0 bottom-0 left-0 right-0 z-40"
        />
      }
    </React.Fragment>
  );
};

export default Header;