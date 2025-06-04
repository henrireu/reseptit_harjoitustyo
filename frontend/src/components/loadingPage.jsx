import LoadingSpinner from "./loadingSpinner"

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen"> 
      <div className="flex flex-col items-center justify-center">
        <LoadingSpinner size="big" />
      </div>
    </div>
  )
}
  
export default LoadingPage