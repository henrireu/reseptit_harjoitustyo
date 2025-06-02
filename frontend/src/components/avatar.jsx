import avatarMan from "../assets/chefman.png"
import avatarWoman from "../assets/chefwoman.png"
import avatarMan2 from "../assets/chefman2.png"
import avatarDog from "../assets/dog.png"

const Avatar = ({ id }) => {
  console.log(id)

  return (
    <div className="flex justify-center items-center w-12 h-12 rounded-full bg-orange-300">
      { id === 1 ? (
        <img className="w-12 h-12 rounded-full p-1" src={avatarMan} alt="Rounded avatar" />
      ) : id === 2 ? (
        <img className="w-12 h-12 rounded-full p-1" src={avatarWoman} alt="Rounded avatar" />
      ) : id === 3 ? (
        <img className="w-12 h-12 rounded-full p-1" src={avatarMan2} alt="Rounded avatar" />
      ) : id === 4 ? (
        <img className="w-12 h-12 rounded-full p-1" src={avatarDog} alt="Rounded avatar" />
      ) : null}
    </div>
  )
}

export default Avatar