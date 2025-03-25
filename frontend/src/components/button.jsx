const Button = ({ text, type, width, height, color, handleClick, disabled }) => {
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

export default Button