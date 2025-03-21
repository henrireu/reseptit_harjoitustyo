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
            <div className="flex gap-2 items-center">
              <div className="hidden lg:block text-gray-900">
                Tervetuloa, {user.username}
              </div>

              <div className="cursor-pointer hidden md:block relative group">
                <Link to="/muokkaa-profiilia">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-3 mb-2 w-max px-2 py-1 text-sm text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Muokkaa profiilia
                  </span>
                </Link>   
              </div>

              <button
                type="button"
                className="text-white ml-3 bg-blue-700 hover:bg-blue-800 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-100 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-200 dark:bg-gray-900 dark:border-gray-700">
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

            {user !== null && (
              <li className="block md:hidden">
                <Link to="/muokkaa-profiilia">
                  <p className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Muokkaa profiilia
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
