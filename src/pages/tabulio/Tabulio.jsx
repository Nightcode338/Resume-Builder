import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Frame18 from "../../assets/Frame18.svg";
import Arrow1 from "../../assets/Arrow1.svg";
import Arrow2 from "../../assets/Arrow2.svg";
import { Link } from "react-router-dom";

const Tabulio = () => {
  return (
    <div className=" w-fit overflow-hidden">
      <Header />

      <div className=" px-20 my-24 flex justify-between gap-8">
        <div>
          <img src={Frame18} alt="laugh" className=" relative" />
          <p
            className=" bg-[#F63C7C] size-[65px] rounded-full absolute top-[24%]"
            data-aos="fade-up-left"
            data-aos-duration="3000"
          ></p>
          <p
            className=" bg-[#f63c7d5a] size-[65px] rounded-full absolute left-[40%] bottom-[-3%] -z-10"
            data-aos="fade-down-right"
            data-aos-duration="3000"
          ></p>
          <img
            src={Arrow1}
            alt=""
            className=" absolute left-[25%] bottom-[-2.7%] -z-10 "
            data-aos="fade-up-right"
            data-aos-duration="2000"
            data-aos-delay="5000"
          />
        </div>
        <div>
          <div className=" max-w-[735px] relative">
            <p
              className=" bg-[#f63c7d5a] size-[65px] rounded-full absolute left-[91%] bottom-[86%] -z-10"
              data-aos="fade-left"
              data-aos-duration="3000"
            ></p>
            <img
              src={Arrow2}
              alt=""
              className="absolute left-[78%] bottom-[42%]"
            />
            <p className=" font-bold text-4xl leading-[50px]">
              Create your professional resume in Just minutes
            </p>
            <div className=" flex flex-col gap-[30px] mt-[30px] mb-[40px] font-bold text-2xl">
              <div className=" flex gap-4">
                <p className=" size-[30px] bg-[#8910F1] rounded-full"></p>
                <p>Choose from our libraries your resume style</p>
              </div>
              <div className=" flex gap-4">
                <p className=" size-[30px] bg-[#8910F1] rounded-full"></p>
                <p>Fill every boxes as required</p>
              </div>
              <div className=" flex gap-4">
                <p className=" size-[30px] bg-[#8910F1] rounded-full"></p>
                <p>Download or print your resume</p>
              </div>
            </div>
            <button className="bg-[#8910F1] text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-300 mb-[15px]">
              <Link to={'/auth/sign-in'}>Build resume </Link>
            </button>
          </div>
          <p className=" text-lg font-bold leading-[22px] tracking-tighter">
            {" "}
            By clicking <span className=" text-[#8910F1]">Build resume</span>,
            you agree to our{" "}
            <span className=" text-[#407FF9] cursor-pointer">Terms of use</span>{" "}
            and{" "}
            <span className="text-[#407FF9] cursor-pointer">
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tabulio;
