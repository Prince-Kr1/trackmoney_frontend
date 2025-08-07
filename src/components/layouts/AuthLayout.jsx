import mainImage from "../../assets/images/mainImage.png"

const AuthLayout = ({children}) => {
  return (
    <div className="flex">
        <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
            <h2 className="text-2xl font-semibold text-black">TrackMoney</h2>
            {children}
        </div>

        <div className="hidden md:block w-[40vw] h-screen bg-purple-100 bg-auth-bg-img">
            <img 
                src={mainImage} 
                className="w-64 lg:w-[40%] absolute mt-26"
                alt="image" 
            />
        </div>

    </div>
  )
}

export default AuthLayout