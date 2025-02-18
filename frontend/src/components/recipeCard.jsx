import { Link } from "react-router-dom"

const RecipeCard = ({ recipe }) => {
  const handleClick = () => {
    console.log(recipe)
  }
  return (
    <div 
      className="w-1/1 sm:w-1/4 bg-gray-100 hover:bg-gray-300 rounded-lg shadow-md max-w-[300px] pb-4 hover:cursor-pointer"
      onClick={handleClick}
    >
      <Link to={`/reseptit/${recipe.id}`}>
        <img src={recipe.imageUrl} className="w-full h-[250px] object-cover"/>
        <p className="text-center mt-4 font-semibold">{recipe.name}</p>
      </Link>
    </div>
  )
}

export default RecipeCard