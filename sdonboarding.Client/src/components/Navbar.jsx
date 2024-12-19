import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
          <div className="flex items-center">
            <span className="text-white text-lg font-bold">React</span>
          </div>
          {/* Main Navigation */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {/* NavLinks */}
                <NavLink
                  to="/customers"
                  className={({ isActive }) =>
                    isActive
                      ? 'rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white'
                      : 'rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                  }
                >
                  Customers
                </NavLink>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    isActive
                      ? 'rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white'
                      : 'rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                  }
                >
                  Products
                </NavLink>
                <NavLink
                  to="/stores"
                  className={({ isActive }) =>
                    isActive
                      ? 'rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white'
                      : 'rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                  }
                >
                  Stores
                </NavLink>
                <NavLink
                  to="/sales"
                  className={({ isActive }) =>
                    isActive
                      ? 'rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white'
                      : 'rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                  }
                >
                  Sales
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              isActive
                ? 'block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white'
                : 'block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
            }
          >
            Customers
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? 'block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white'
                : 'block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/stores"
            className={({ isActive }) =>
              isActive
                ? 'block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white'
                : 'block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
            }
          >
            Stores
          </NavLink>
          <NavLink
            to="/sales"
            className={({ isActive }) =>
              isActive
                ? 'block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white'
                : 'block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
            }
          >
            Sales
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
