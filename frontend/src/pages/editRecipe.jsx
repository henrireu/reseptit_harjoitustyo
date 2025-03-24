import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { toast, Toaster } from 'react-hot-toast'

import { getSingleRecipe, editRecipe, editRecipeWithImage } from "../services/recipes"
import LoadingPage from "../components/loadingPage"
import LoadingButton from "../components/loadingButton"
import FileUpload from "../components/fileUpload"
import Input from "../components/input"

const EditRecipe = () => {
  const [recipeName, setRecipeName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imageName, setImageName] = useState('')

  const [ingredients, setIngredients] = useState([])
  const [ingredient, setIngredient] = useState('')
  const [amount, setAmount] = useState('')
  const [unit, setUnit] = useState('')

  const [instructions, setInstructions] = useState([])
  const [instruction, setInstruction] = useState('')
  const [timeUsed, setTimeUsed] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [buttonLoading, setButtonLoading] = useState(false)

  const [changeImage, setChangeImage] = useState(false)
  const [imageFile, setImageFile] = useState(null)

  const { id } = useParams()
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    const getRecipe = async () => {
      if (user === null) {
        setError('Sinulla ei ole oikeuksia muokata tätä reseptiä.')
        return
      }

      try {
        const recipe = await getSingleRecipe(id)
        
        if (recipe?.user.id !== user.userId) {
          setError('Sinulla ei ole oikeuksia muokata tätä reseptiä.')
          return
        }  
        
        setError('')
        setRecipeName(recipe.name)
        setImageUrl(recipe.imageUrl)
        setImageName(recipe.imageName)
        setIngredients(recipe.ingredients)
        setInstructions(recipe.instructions)
        // muokkaa tämä myöhemmin samanlaiseksi kuin muut
        if(recipe.timeUsed) {
          setTimeUsed(recipe.timeUsed)
        }

      } catch(error) {
        console.error(error)
        setError('virhe')
      } finally {
        setLoading(false)
      }
    }

    getRecipe()
  }, [id, user])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if(recipeName.length < 3) {
      toast.error('Reseptin nimi täytyy olla vähintään 3 kirjainta pitkä.')
      return
    }
    if(ingredients.length < 1) {
      toast.error('Täytyy olla vähintään yksi ainesosa.')
      return
    }
    if(instructions.length < 1) {
      toast.error('Täytyy olla vähintään yksi ohje')
      return
    }

    if (changeImage === false) {
      setButtonLoading(true)
      try {
        const recipe = {
          name: recipeName,
          ingredients: ingredients,
          instructions: instructions,
          imageUrl: imageUrl,
          timeUsed: timeUsed
        }
  
        await editRecipe(id, recipe)
        toast.success('Resepti muokattu onnistuneesti')

        setTimeout(() => {
          navigate('/reseptit')
        },3000)
      } catch (error) {
        console.error(error)
        toast.error('Jokin meni vikaan reseptin muokkauksessa.')
      } finally {
        setButtonLoading(false)
      }
    } else {
      // tässä tehdään se jos tarvitsee muokata kuvaa
      setButtonLoading(true)
      try {
        const recipe = {
          name: recipeName,
          ingredients: ingredients,
          instructions: instructions,
          imageFile: imageFile,
          timeUsed: timeUsed
        }

        await editRecipeWithImage(id, recipe, imageName)
        toast.success('Resepti muokattu onnistuneesti')
        setTimeout(() => {
          navigate('/reseptit')
        },3000)
      } catch (error) {
        console.error(error)
        toast.error('Jokin meni vikaan reseptin muokkauksessa.')
      } finally {
        setButtonLoading(false)
      }
    }
    
  }

  const addIngredient = () => {
    if (ingredient.length < 3 || unit.length < 1 || amount.length < 1) {
      toast.error('Kaikki kentät on täytettävä')
      return
    } else if (ingredients.some(i => i.ingredient === ingredient)){
      toast.error('Ei voi lisätä samaa ainesosaa kahdesti')
      return
    } else {
      const singleIngredient = {
        amount: amount,
        unit: unit,
        ingredient: ingredient
      }
  
      setIngredients(ingredients.concat(singleIngredient))
      setAmount('')
      setUnit('')
      setIngredient('')
    }
  }

  const deleteIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  }

  const addInstruction = () => {
    if (instruction.length < 3) {
      toast.error('Ohjeen täytyy olla vähintään 3 merkkiä pitkä.')
      return
    } else {
      setInstructions(instructions.concat(instruction))
      setInstruction('')
    }
  }

  const deleteInstruction = (index) => {
    setInstructions(instructions.filter((_, i) => i !== index))
  }

  if (loading) {
    return (
      <LoadingPage />
    )
  }

  if (error !== '') {
    return (
      <p className="mt-[200px] text-3xl text-red-500 text-center">{error}</p>
    )
  }

  return (
    <div className="pt-[100px] px-10 pb-10">
      <Toaster />

      <form className="mx-auto max-w-xl" onSubmit={handleSubmit}>

        <div className="mb-5">
          <Input 
            label="Reseptin nimi"
            type="text"
            placeholder="Reseptin nimi"
            required={true}
            value={recipeName}
            setValue={setRecipeName}
          />
        </div>
 
        { changeImage === true ? (
          <div className="mb-5">
            <FileUpload file={imageFile} setFile={setImageFile}/>
          </div>
        ) : (
          <div className="mb-5 pb-5 flex border-b border-gray-300 w-full">
            <img src={imageUrl} className="object-cover h-64 w-64"/>
         
            <div className="cursor-pointer ml-2" onClick={() => setChangeImage(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </div>
      
          </div>
        )}

        <h3 className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Ainesosat</h3>

        {ingredients.map((ingredient, index) => (
          <div key={ingredient.ingredient} className="mt-3 flex gap-1 h-[30px]">
            <p>- {ingredient.ingredient}</p>
            <p>{ingredient.amount}</p>
            <p>{ingredient.unit}</p>
            <div
              className="ml-auto hover:cursor-pointer"
              onClick={() => deleteIngredient(index)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </div>
          </div>
        ))}

        <div className="flex space-x-2 mt-5 pb-5 border-b border-gray-300">
          <div className="w-4/6">
            <Input 
              label="Nimi"
              type="text"
              placeholder="Ainesosan nimi"
              required={false}
              value={ingredient}
              setValue={setIngredient}
              size="4/6"
            />
          </div>

          <div className="w-1/6">
            <Input 
              label="Määrä"
              type="text"
              placeholder="Määrä"
              required={false}
              value={amount}
              setValue={setAmount}
              size="1/6"
            />
          </div>

          <div className="w-1/6">
            <Input 
              label="Mitta"
              type="text"
              placeholder="Mitta"
              required={false}
              value={unit}
              setValue={setUnit}
              size="1/6"
            />
          </div>

          <button 
            type="button"
            className="bg-blue-500 h-1/2 mt-auto text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition hover:cursor-pointer"
            onClick={addIngredient}
          >
                +
          </button>
        </div>

        <div className="mb-5 pb-5 border-b border-gray-300">
          <h3 className="block mb-2 mt-5 text-md font-medium text-gray-900 dark:text-white">Ohjeet</h3>

          {instructions.map((instruction, index) => (
            <div key={instruction} className="mt-3 flex gap-1 min-h-[30px]">
              <div className="flex gap-2">
                <span className="bg-gray-300 h-7 flex items-center justify-center rounded-full aspect-square">{index + 1}.</span> 
                {instruction}
              </div>
              <div
                className="ml-auto hover:cursor-pointer"
                onClick={() => deleteInstruction(index)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </div>
            </div>
          ))}

          <div className="my-5 flex gap-1">
            <div className="w-full">
              <Input 
                type="text"
                placeholder="Ohjeet"
                required={false}
                value={instruction}
                setValue={setInstruction}
              />
            </div>

            <button
              type="button"
              className="bg-blue-500 h-1/2 mt-auto text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition hover:cursor-pointer"
              onClick={addInstruction}
            >
                +
            </button>
          </div>

        </div>

        <div className="mb-5">
          <Input 
            label="Arvioitu valmistusaika"
            type="text"
            placeholder="Valmistusaika"
            required={true}
            value={timeUsed}
            setValue={setTimeUsed}
          />
        </div>

        {buttonLoading === true ? (
          <LoadingButton />
        ) : (
          <button 
            type="submit" 
            className="mb-5 w-[100px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
          >Tallenna</button>  
        )}      

      </form>
    </div>
  )
}

export default EditRecipe