const NewRecipeCard = ({ recipeName }) => {
  return (
    <div className="mx-auto max-w-xl">
      <div>
        <p>Name: {recipeName}</p>
      </div>
    </div>
  )
}

export default NewRecipeCard