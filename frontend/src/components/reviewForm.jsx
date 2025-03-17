import { useState } from "react"
//import { createReview } from "../services/reviewsService"
//import { getDate } from "../helpers/reviewHelper"

const ReviewForm = ({leaveForm /*, serviceId, fetchData*/}) => {
  const [starCount, setStarCount] = useState(0)
  const [clickedCount, setClickedCount] = useState(0)
  const [comment, setComment] = useState("")

  //const [messageState, setMessageState] = useState("")

  const handleStarX = () => {
    setStarCount(0)
    setClickedCount(0)
  }

  /*const handleCreate = async () => {
    if (clickedCount === 0) {
      window.alert("Choose between 1-5 stars")
      return
    }
    setMessageState("loading")
    try {
      const newReview = {
        serviceId: serviceId,
        userName: "testikäyttäjä77",
        stars: starCount,
        comment: comment,
        date: getDate()
      }
      await createReview(newReview)
      setMessageState("success")
      fetchData()
      setStarCount(0)
      setClickedCount(0)
      setComment("")

      setTimeout(() => {
        setMessageState("")
        leaveForm()
      },[5000])

    } catch (error) {
      setMessageState("error")
      console.error(error)

      setTimeout(() => {
        setMessageState("")
      },[5000])
    } 
  }*/

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center">
      {/*<button 
        className="absolute top-30 right-30 text-white hover:text-orange-400 focus:outline-none"
        onClick={leaveForm}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>*/}

      <div className="flex-row items-center text-xl w-[270px] sm:w-[400px]">

        <div className="flex justify-end">
          <button 
            className="text-white hover:text-orange-400 focus:outline-none mb-5 cursor-pointer"
            onClick={leaveForm}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <p className="text-white">How many stars do you give?</p>
        {clickedCount > 0 ? (
          <div className="flex items-center gap-2 mt-2 h-[40px]">
            <StarRow number={clickedCount} />
            <p className="text-white text-xl">{`(${clickedCount})`}</p>

            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="ml-auto hover:cursor-pointer size-7 text-red-500"
              onClick={handleStarX}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>

          </div>
        ) : (
          <div className="flex items-center hover:cursor-pointer mt-2 h-[40px]">
            <div
              onMouseEnter={() => setStarCount(1)}
              onMouseLeave={() => setStarCount(0)}
              onClick={() => setClickedCount(1)}
            >
              {starCount >= 0.5 ? ( <YellowStar />) : ( <GrayStar />)}
            </div>
            <div
              onMouseEnter={() => setStarCount(2)}
              onMouseLeave={() => setStarCount(0)}
              onClick={() => setClickedCount(2)}
            >
              {starCount >= 1.5 ? ( <YellowStar />) : ( <GrayStar />)}
            </div>
            <div
              onMouseEnter={() => setStarCount(3)}
              onMouseLeave={() => setStarCount(0)}
              onClick={() => setClickedCount(3)}
            >
              {starCount >= 2.5 ? ( <YellowStar />) : ( <GrayStar />)}
            </div>
            <div
              onMouseEnter={() => setStarCount(4)}
              onMouseLeave={() => setStarCount(0)}
              onClick={() => setClickedCount(4)}
            >
              {starCount >= 3.5 ? ( <YellowStar />) : ( <GrayStar />)}
            </div>
            <div
              onMouseEnter={() => setStarCount(5)}
              onMouseLeave={() => setStarCount(0)}
              onClick={() => setClickedCount(5)}
            >
              {starCount >= 4.5 ? ( <YellowStar />) : ( <GrayStar />)}
            </div>
          </div>
        )}

        <p className="text-white mt-2">Comment: </p>
        <textarea
          className="mt-2 p-2 w-full h-32 rounded border border-gray-300 resize-none text-white"
          rows="5"
          placeholder="Write your comment here..."
          value={comment}
          onChange={e => setComment(e.target.value)}
        ></textarea>

        <div 
          className="mt-2 bg-goldish flex items-center gap-2 text-white p-2 rounded hover:cursor-pointer hover:bg-goldish2"
          //onClick={handleCreate}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
          </svg>
          <p className="text-xl">Send review</p>
        </div>

        <div className="h-[50px] mt-2">
          {/*messageState === "success" && (
            <div className="bg-green-600 rounded w-full h-full flex text-white p-2">
              <p>Review created successfully</p>
            </div> 
          )*/}

          {/*messageState === "loading" && (
            <div className="h-full flex items-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )*/}

          {/*messageState === "error" && (
            <div className="bg-red-600 rounded w-full h-full flex text-white p-2">
              <p>Review creation failed</p>
            </div> 
          )*/}

        </div>

      </div>

    </div>
  )
}

const StarRow = ({number}) => {
  return (
    <div className="flex items-center">
      {number >= 0.5 ? ( <YellowStar />) : ( <GrayStar />)}
      {number >= 1.5 ? ( <YellowStar />) : ( <GrayStar />)}
      {number >= 2.5 ? ( <YellowStar />) : ( <GrayStar />)}
      {number >= 3.5 ? ( <YellowStar />) : ( <GrayStar />)}
      {number >= 4.5 ? ( <YellowStar />) : ( <GrayStar />)}
    </div>
  )
}


const YellowStar = () => {
  return (
    <svg className="w-6 h-6 text-yellow-300 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
  )
}
  
const GrayStar = () => {
  return (
    <svg className="w-6 h-6 text-gray-300 dark:text-gray-500 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
  )
}

export default ReviewForm