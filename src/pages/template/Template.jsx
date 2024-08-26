import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { resumeTemplates } from "../../utilities/constant";
import { useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Template = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < 2) setCurrentIndex((s) => s + 1);
  };
  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex((s) => s - 1);
  };

  const currentTemplate = resumeTemplates[currentIndex];
  return (
    <div>
      <div className=" sticky top-0 z-10">
        <Header />
      </div>

      <div className=" pl-10 my-2 flex justify-between gap-[100px]">
        <div
          className="flex flex-col mt-[140px] max-w-[380px] gap-[30px] relative"
          data-aos="fade-right"
          data-aos-duration="3000"
        >
          <div className=" flex gap-2">
            <p className=" font-bold text-5xl text-[#B1B1B1]">
              {currentTemplate.id}
            </p>
            <p className=" font-bold text-5xl">{currentTemplate.name}</p>
          </div>
          <p className=" font-medium text-[20px]">
            {currentTemplate.description}
          </p>
          <div className=" flex gap-[10px]">
            <p className=" size-[65px] bg-[#2F635A]"></p>
            <p className=" size-[65px] bg-[#FECB00]"></p>
            <p className=" size-[65px] bg-[#F63C7C]"></p>
          </div>
          <button className="bg-[#8910F1] text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-300 mb-[15px]">
            <Link to={'/auth/sign-in'} >Select this template </Link>
          </button>
          <p className=" text-[#6A6A6A] font-normal text-lg">
            You can always change your template later.
          </p>
          <img
            src={currentTemplate.Arrow}
            alt=""
            className={`${
              currentIndex === 1
                ? " absolute bottom-[100%] left-[-20%]"
                : currentIndex === 2
                ? " absolute top-[-5%] left-[150%]"
                : currentIndex === 0
                ? " absolute top-[68%] left-[-30%]"
                : ""
            }  `}
          />
        </div>

        <div>
          <img
            src={currentTemplate.image}
            alt=""
            className=" relative mr-[-50px] h-[850px]"
          />
          <img
            src={currentTemplate.imageSrc}
            alt=""
            className=" absolute top-[40%] left-[42%]"
          />
          <button
            onClick={handlePrevious}
            className={`${currentIndex < 1 ? "hidden" : ""}`}
          >
            <MdOutlineKeyboardArrowLeft
              size={40}
              className=" bg-white shadow-lg rounded-full text-[#191919] absolute top-[70%] left-[40.5%]"
            />
          </button>
          <button
            onClick={handleNext}
            className={`${currentIndex >= 2 ? "hidden" : ""}`}
          >
            <MdOutlineKeyboardArrowRight
              size={40}
              className=" bg-white shadow-lg rounded-full text-[#191919] absolute top-[70%] right-[28%]"
            />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Template;
