import { useState } from "react"

import Button from "./button"

const Popup = () => {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-orange-100 p-6 rounded-2xl shadow-lg max-w-sm w-full text-center">
        <p className="text-lg font-semibold mb-4">
          Huomioithan, että palvelun lataus voi kestää hetken ensimmäisella latauksella, koska backend toimii ilmaisella versiolla.
        </p>
        <Button text="Sulje" type="button" color="gold" handleClick={() => setIsOpen(false)} />
      </div>
    </div>
  )
}

export default Popup