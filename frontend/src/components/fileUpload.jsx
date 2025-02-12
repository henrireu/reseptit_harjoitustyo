const FileUpload = ({ file, setFile }) => {

  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']
  const MAX_FILE_SIZE = 2 * 1024 * 1024

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      if(!allowedFileTypes.includes(selectedFile.type)) {
        alert('Only image files (JPEG, PNG, GIF, SVG) are allowed!')
        return
      }
      if (selectedFile.size > MAX_FILE_SIZE) {
        alert('File size is too large. Max size is 2MB.')
        return
      }
      setFile(selectedFile)
    }
  }

  if(file) {
    return (
      <div className="mt-4">
        <div className="flex gap-3">
          <p className="text-sm font-medium text-gray-900 dark:text-white">Uploaded file: {file.name}</p>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="size-6 hover:cursor-pointer"
            onClick={() => setFile(null)}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </div>
        <img src={URL.createObjectURL(file)} alt="Preview" className="max-w-xs mt-2" />
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center w-full">
      <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Image*</p>
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
          {file && <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">{file.name}</p>}
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  )
}

export default FileUpload