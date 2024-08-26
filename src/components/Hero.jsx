import Resume from "../assets/Resume.svg"
import user from "../assets/user.svg"
import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <div className=" flex justify-between px-10 py-12" >
        <div className=" flex items-center gap-[100px]" data-aos="zoom-out-right" data-aos-duration="3000">

      <div>
            <div className=" max-w-[483px] flex flex-col gap-5">
            <p className=" text-2xl uppercase text-[#4E4D4D] ">Boost your career chasing</p>
            <p className="text-5xl font-extrabold">
                Land your dream job with already made
                <span className=" text-[#8910F1]"> Eye catchy Resumes.</span>
            </p>
            
        
            <p className="text-[#4E4D4D] text-2xl pb-[22px]">
                Create awesome resumes with one of our template in just few seconds.
            </p>
            </div>
            <button className="bg-[#8910F1] text-white px-6 py-3 rounded-md shadow-md hover:bg-purple-700 transition-colors duration-300">
            <Link to={'/auth/sign-in'}>Create Resume for free</Link>
           
            </button>
      </div>
        </div>
      <div>
            <div>
                <img src={Resume} alt="Resume" className=" relative"/>
                    <div className="absolute top-[35%] left-[50%] bg-white px-8 pt-8 pb-16 shadow-2xl">
                        <img src={user} alt=""/>
                        <p className=" w-[141px] mt-5 font-bold text-lg">
                        Mujhiz crEAtivO <span className=" text-[15px] text-[#4E4D4D]">UI Designer</span>
                        </p>
                  </div>
            </div>

      </div>
    </div>
  )
}

export default Hero
