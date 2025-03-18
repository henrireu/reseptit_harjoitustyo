const countAverageRating = (reviews) => {
  const numbers = reviews.map(r => r.rating)
  const sum = numbers.reduce((acc, n) => acc + n, 0)
  const result = sum / reviews.length
  return Number(result.toFixed(1))
}
  
const getDate = () => {
  const date = new Date()
  const fullDate = date.getDate().toString() + "." + date.getMonth().toString() + "." + date.getFullYear().toString()
  return fullDate
}

const formatDate = (wholeDate) => {
  const date = new Date(wholeDate)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}
  
export { countAverageRating, getDate, formatDate }