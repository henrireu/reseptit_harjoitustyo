const Button = ({ text, type, width, height, color, handleClick, disabled, loading }) => {
  let background = 'bg-blue-700'
  let hover = 'hover:bg-blue-800'
  let focus = 'focus:ring-blue-300'
  let darkBackground = 'dark:bg-blue-600'
  let darkHover = 'dark:hover:bg-blue-700'
  let darkFocus = 'dark:focus:ring-blue-800'
  let textColor = 'text-white'
  let disabledColor = 'bg-blue-800'

  if (color === 'blue') {
    background = 'bg-blue-700'
    hover = 'hover:bg-blue-800'
    focus = 'focus:ring-blue-300'
    darkBackground = 'dark:bg-blue-600'
    darkHover = 'dark:hover:bg-blue-700'
    darkFocus = 'dark:focus:ring-blue-800'
    textColor = 'text-white'
    disabledColor = 'bg-blue-800'
  }

  if (color === 'red') {
    background = 'bg-red-600' 
    hover = 'hover:bg-red-700' 
    focus = 'focus:ring-red-300' 
    darkBackground = 'dark:bg-red-500' 
    darkHover = 'dark:hover:bg-red-600' 
    darkFocus = 'dark:focus:ring-red-700' 
    textColor = 'text-white'
    disabledColor = 'bg-red-700'
  }

  if (color === 'gray') {
    background = 'bg-gray-300'
    hover = 'hover:bg-gray-400'
    focus = 'focus:ring-gray-300' 
    darkBackground = 'dark:bg-gray-400' 
    darkHover = 'dark:hover:bg-gray-500' 
    darkFocus = 'dark:focus:ring-gray-600' 
    textColor = 'text-gray-700'
  }

  if (color === 'orange') {
    background = 'bg-orange-400' 
    hover = 'hover:bg-orange-500' 
    focus = 'focus:ring-orange-300' 
    darkBackground = 'dark:bg-orange-600' 
    darkHover = 'dark:hover:bg-orange-700'
    darkFocus = 'dark:focus:ring-orange-800' 
    textColor = 'text-white' 
    disabledColor = 'bg-orange-500'
  }

  if (loading) { return <LoadingButton width={width} height={height} color={color} /> }

  if (disabled) {
    return (
      <button
        type={type}
        disabled
        className={`${width} ${height} ${disabledColor} ${textColor} ${hover} font-medium rounded-lg text-sm px-5 py-2.5 text-center ${darkBackground}`}
      >
        {text}
      </button>
    )
  }

  if(handleClick) {
    return (
      <button 
        type={type}
        onClick={handleClick}
        className={`${width} ${height} ${background} ${textColor} ${hover} focus:ring-4 focus:outline-none ${focus} font-medium rounded-lg text-sm px-5 py-2.5 text-center ${darkBackground} ${darkHover} ${darkFocus} hover:cursor-pointer`}
      >{text}</button>
    )
  }

  return (
    <button 
      type={type}
      className={`${width} ${background} text-white ${hover} focus:ring-4 focus:outline-none ${focus} font-medium rounded-lg text-sm px-5 py-2.5 text-center ${darkBackground} ${darkHover} ${darkFocus} hover:cursor-pointer`}
    >{text}</button>
  )
}

const LoadingButton = ({ width, height, color }) => {
  let background = 'bg-blue-800'
  let darkBackground = 'dark:bg-blue-700'

  if (color === 'blue') {
    background = 'bg-blue-800'
    darkBackground = 'dark:bg-blue-700'
  }

  if (color === 'red') {
    background = 'bg-red-700'
    darkBackground = 'dark:bg-red-600'
  }

  if (color === 'orange') {
    background = 'bg-orange-500'
    darkBackground = 'bg-orange-400'
  }

  return (
    <button
      disabled
      type="button"
      className={`${width} ${height} flex justify-center items-center text-white ${background} rounded-lg text-sm px-5 py-2.5 ${darkBackground}`}
    >
      <svg
        aria-hidden="true"
        role="status"
        className="w-5 h-5 text-white animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
    </button>
  )
}

export default Button