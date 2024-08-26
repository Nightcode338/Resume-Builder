import Rectangle from "../assets/Rectangle.svg"
import Arrow from "../assets/Arrow.svg"
import Spiral from "../assets/Spiral.svg"

const Feature = () => {
  return (
    <div className=" py-10 px-20">
        <span className=" pb-10 flex justify-center text-5xl font-bold text-[#8910F1] " data-aos="fade-up" data-aos-duration="3000"> Feature</span>
        <div className=" flex justify-between gap-[110px]">
            <div className=" ">
                <div className=" flex flex-col gap-5">
                 <span className=" font-bold text-2xl text-[#191919]"> 30+ Templates</span>
                 <p className=" font-medium text-[17px] text-[#4E4D4D]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Euismod in pellentesque massa placerat duis
                </p>
                </div>
                <img src={Rectangle} alt="Spiral" className=" mt-[70px] mb-[67px]" data-aos="zoom-in" data-aos-duration="3000"/>
                <div className="flex flex-col gap-5">
                    <span className=" font-bold text-2xl text-[#191919]">Easy to Customize</span>
                    <p className="font-medium text-[17px] text-[#4E4D4D]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Euismod in pellentesque massa placerat duis</p>
                </div>
            </div>
            <div>
                <img src={Arrow} alt="Spiral"  data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500"/>
                <div className=" my-12 flex flex-col gap-5">
                 <span className="font-bold text-2xl text-[#191919]"> Free Cover Letter</span>
                 <p className=" font-medium text-[17px] text-[#4E4D4D]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Euismod in pellentesque massa placerat duis
                </p>
                </div>
                <img src={Spiral} alt="Spiral" className=" ml-[-80px]" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1800"/>
            </div>
        </div>
      
    </div>
  )
}

export default Feature
