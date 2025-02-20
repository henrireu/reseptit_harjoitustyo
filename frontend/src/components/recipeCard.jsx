import { Link } from "react-router-dom"

const RecipeCard = ({ recipe }) => {
  const createdDate = new Date(recipe.createdAt)
  const formattedDate = createdDate.toLocaleDateString ('fi-FI')

  return (
    <div 
      className="w-1/1 md:w-1/4 bg-gray-100 hover:bg-gray-300 rounded-lg shadow-md max-w-[300px] pb-4 hover:cursor-pointer"
    >
      <Link to={`/reseptit/${recipe.id}`}>
        <img src={recipe.imageUrl} className="w-full h-[250px] object-cover"/>
        <p className="text-center mt-4 font-semibold">{recipe.name}</p>
        <div className="flex justify-between px-3 pt-3">
          <p>{formattedDate}</p>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <p>{recipe.user.username}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default RecipeCard