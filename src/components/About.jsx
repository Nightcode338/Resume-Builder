import { Link } from "react-router-dom";
import Girl from "../assets/Girl.svg";

const About = () => {
  return (
    <div className=" pt-[200px] pb-[112px] flex justify-center px-28 gap-10">
      <div data-aos="zoom-out-right" data-aos-duration="2000">
        <span className=" font-bold text-6xl max-w-[410px]">
          Join the 2000+ Resum<span className=" text-[#8910F1]">o</span> family
        </span>
        <p className=" font-medium text-[#4E4D4D] text-[34px] max-w-[550px] leading-[48px]">
          Fames ac turpis egestas sed. Sagittis vitae et leo duis. Duis at
          consectetur lorem donec massa.
        </p>
        <button className="bg-[#8910F1] text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-300 mt-4">
          <Link to={'/auth/sign-in'}> Create Resume for free</Link>
        </button>
      </div>
      <div>
        <img src={Girl} alt="girl" className=" w-[700px]" />
      </div>
      
    </div>
     
  );
};

export default About;
