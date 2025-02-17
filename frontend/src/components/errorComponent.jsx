const ErrorComponent = ({ message }) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-red-100 text-red-700 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold">Virhe</h2>
        <p>{message || "Jotain meni pieleen. Yritä uudelleen!"}</p>
      </div>
    </div>
  )
}
  
export default ErrorComponent