import { UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
    const { isSignedIn } = useUser();

  return (
    <div className=" flex py-5 px-20 bg-gr justify-between bg-gradient-to-b from-[#F4E7FF] to-[#fff]">
      <div className=' flex justify-center items-center gap-12'>
    <p className=" font-bold text-3xl">Resum<span className=" text-[#8910F1]">o</span></p>
      </div>
   
      <div className=" flex items-center gap-2">
      {
        isSignedIn && ( 
           <div className='flex gap-2 items-center'>
               <UserButton />
            </div> )
      }
      </div>
    
      </div>

  )
}

export default Navbar
