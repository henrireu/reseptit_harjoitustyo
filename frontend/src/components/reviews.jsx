import { useState } from "react"
import { useSelector } from "react-redux"


import { countAverageRating, formatDate } from "../helpers/reviewHelper"

import ReviewForm from "./reviewForm"

const Reviews = ({ reviews, recipeUserId, recipeId }) => {
  const [showForm, setShowForm] = useState(false)

  const user = useSelector(state => state.user)

  const leaveForm = () => {
    setShowForm(false)
  }

  return (
    <div className="border-t border-b mt-10 py-5">
      {showForm && (
        <ReviewForm leaveForm={leaveForm} recipeId={recipeId}/>
      )}
      <div>
        <h2 className="text-2xl">Arvostelut {'('}{reviews.length}{')'}</h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-5 min-h-[40px]">
          {reviews.length > 0 && (
            <RatingStars reviews={reviews}/>
          )}

          {user && recipeUserId !== user.userId && (
            <div 
              className="flex text-white bg-blue-700 hover:bg-blue-800 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setShowForm(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
              <p className="ml-1">Luo arvostelu</p>
            </div>
          )}
       
        </div>    

      </div>

      <div className="mt-5">
        {reviews.map(review => (
          <SingleReview key={review.id} review={review}/>
        ))}
      </div>
  
    </div>
  )
}

const SingleReview = ({review}) => {
  const date = formatDate(review.createdAt)
  console.log('review', review)
  return (
    <div className="flex flex-col sm:flex-row border gap-2 sm:gap-5 p-5 rounded mt-2">
      <div className="flex flex-col justify-between w-[175px]">
        <div>
          <StarRow number={review.rating}/>
        </div>
        <div className="flex mt-2 sm:mt-5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          {review.user ? (
            <p className="ms-1 font-semibold break-all">{review.user.username}</p>
          ) : (
            <p className="ms-1 font-semibold">{`(Poistettu käyttäjä)`}</p>
          )}
        
        </div>
      </div>

      <div className="break-words max-w-[800px] flex flex-col justify-between ml-0 sm:ml-10">
        <p className="font-semibold">{date}</p>
        <p className="mt-2">{review.comment}</p>
      </div>
      
    </div>
  )
}

const RatingStars = ({reviews}) => {
  const average = countAverageRating(reviews)
  return (
    <div className="flex">
      <StarRow number={average}/>
      <p className="text-xl ml-2 mt-1">{average}</p>
    </div>
  )
}

const StarRow = ({number}) => {
  return (
    <div className="flex items-center mt-1">
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
    <svg className="w-5 h-5 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
  )
}

const GrayStar = () => {
  return (
    <svg className="w-5 h-5 mr-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
  )
}

export default Reviews