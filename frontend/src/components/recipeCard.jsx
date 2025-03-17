import { Link } from "react-router-dom"

const RecipeCard = ({ recipe }) => {
  const createdDate = new Date(recipe.createdAt)
  const formattedDate = createdDate.toLocaleDateString ('fi-FI')

  return (
    <div 
      className="bg-gray-300 hover:bg-gray-400 rounded-lg shadow-md pb-4 hover:cursor-pointer w-[300px] sm:w-[330px]"
    >
      <Link to={`/reseptit/${recipe.id}`}>
        <img src={recipe.imageUrl} className="w-full h-[250px] object-cover"/>
        <p className="text-center mt-4 font-semibold">{recipe.name}</p>

        <div className="mt-3 flex gap-1 justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <div className="font-semibold text-md">{recipe.timeUsed}</div>
        </div>

        <div className="flex justify-between px-3 mt-2">
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