const countAverageRating = (reviews) => {
  const numbers = reviews.map(r => r.stars)
  const sum = numbers.reduce((acc, n) => acc + n, 0)
  const result = sum / reviews.length
  return Number(result.toFixed(1))
}
  
const getDate = () => {
  const date = new Date()
  const fullDate = date.getDate().toString() + "." + date.getMonth().toString() + "." + date.getFullYear().toString()
  return fullDate
}
  
export { countAverageRating, getDate }