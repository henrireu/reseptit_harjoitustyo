import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from '../assets/foodIcon.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from "../reducers/userSlice"
import { setShowLogin } from "../reducers/showLoginSlice"
import { setToken } from "../services/recipes"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = () => {
    setIsOpen(false)
    dispatch(setShowLogin(true))
  }

  const handleLogout = () => {
    console.log('logout')
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedRecipeAppUser')
    setToken(null)
    navigate('/')
  }

  return (
    <nav className="bg-gray-200 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-300 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer" onClick={() => navigate('/')}>
          <img src={logo} className="h-12 rounded-full" alt="Flowbite Logo" />
          <span className="hidden sm:block self-center text-2xl font-semibold whitespace-nowrap dark:text-white">OmatReseptit</span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user === null ? (
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleLogin}
            >
          Kirjaudu sisään
            </button>
          ) : (
            <div className="flex gap-5 items-center">
              <div className="hidden lg:block text-gray-900">
            Tervetuloa, {user.username}
              </div>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleLogout}
              >
            Kirjaudu ulos
              </button>
            </div>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div
          className={`${isOpen ? "block" : "hidden"} items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
          onClick={() => setIsOpen(false)}
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium text-md md:text-lg border border-gray-100 rounded-lg bg-gray-100 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-200 dark:bg-gray-900 dark:border-gray-700">
            {[
              { name: "Koti", link: "/" },
              { name: "Reseptit", link: "/reseptit" }
            ].map((item) => (
              <li key={item.name}>
                <Link to={item.link}>
                  <p
                    href={item.link}
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    {item.name}
                  </p>
                </Link>
              </li>
            ))}

            {user !== null && (
              <li>
                <Link to="/luo-resepti">
                  <p className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Lisää resepti
                  </p>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Navbar
