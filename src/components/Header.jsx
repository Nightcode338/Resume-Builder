import { NavLink, Link } from "react-router-dom";
import { IoGlobeOutline } from "react-icons/io5";
import { UserButton, useUser } from '@clerk/clerk-react'
// import { Button } from '../ui/button'


const Header = () => {
  const { isSignedIn } = useUser();

  return (
    <div className=" flex py-5 px-20 bg-gr justify-between items-center bg-gradient-to-b from-[#F4E7FF] to-[#fff]">
      <p className=" font-bold text-3xl">Resum<span className=" text-[#8910F1]">o</span></p>
      <div className=" nav text-xl font-bold flex gap-8">
        <NavLink to="/"> Home</NavLink>
        <NavLink to="/template"> Template</NavLink>
        <NavLink to="/Join"> Join Tabulio</NavLink>
        <NavLink to="/About"> About</NavLink>
     </div>
     <div className=" flex gap-8 font-medium text-lg">
        <div className=" flex items-center gap-2">
            <IoGlobeOutline />
            <p>English</p>
        </div>

        {
          isSignedIn ? ( 
            <div className='flex gap-2 items-center'>
                    <Link to={'/dashboard'}>
                        <button>Dashboard</button>
                    </Link>
                    <UserButton />
                </div>
          ) : (
        <div className=" px-8 py-2 bg-[#8910F1] rounded-lg  text-white cursor-pointer shadow-md hover:bg-purple-700 transition-colors duration-300">
        <Link to={'/auth/sign-in'}> Start</Link>
        </div>

          )
        }

     </div>
    </div>
  )
}

export default Header
