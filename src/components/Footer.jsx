import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";



const Footer = () => {
    const footerLinks = [
        {
          title: 'Our story',
          links: ['FAQ', 'Contact', 'Template'],
        },
        {
          title: 'Services',
          links: ['Build Resume', 'Cover Letter'],
        },
        {
          title: 'About us',
          links: ['Developers', 'Meet our team', 'Join Tabulio'],
        },
      ];

  return (

    <div className=" border-t border-slate-[#B1B1B1] py-16 px-20 flex justify-between " data-aos="fade-up">

      <div>
        <p className=" font-bold text-3xl mb-[50px]">
          Resum<span className=" text-[#8910F1]">o</span>
        </p>
        <div>
          <p className=" mb-3 text-lg font-normal">
            Updates right to your Inbox
          </p>
          <div className="flex items-center gap-3 mb-8">
            <input
              type="text"
              placeholder="Enter your email"
              className="rounded-lg border border-slate-300 outline-none px-3 h-12 w-80"
            />
            <button className="bg-[#8910F1] text-white px-6 py-3 rounded-xl shadow-md hover:bg-purple-700 transition-colors duration-300">
              Subscribe
            </button>
          </div>
          <div className=" font-semibold text-lg flex gap-8">
            <Link to='/'>
              © Resum<span className="text-[#8910F1]">o</span> 2022
            </Link>
            <p>Privacy policy</p>
            <p>Terms of use</p>
          </div>
        </div>
      </div>


      <div>
      <div className="grid grid-cols-3 gap-[60px]">
          {footerLinks.map((section, index) => (
            <div key={index} className=" text-lg">
              <h2 className="mb-4 font-semibold ">{section.title}</h2>
              <ul className=" font-normal text-[#2D2D2D] flex flex-col gap-4 ">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex space-x-10 mt-12 justify-center">
            <a href="#" className="text-purple-600 hover:text-purple-800">
            <FaFacebook size={25} />
            </a>
            <a href="#" className="text-purple-600 hover:text-purple-800">
            <FaLinkedin size={25} />
            </a>
            <a href="#" className="text-purple-600 hover:text-purple-800">
            <FaInstagram size={25} />
            </a>
            <a href="#" className="text-purple-600 hover:text-purple-800">
              <FaXTwitter size={25} />

            </a>
          </div>
      </div>
    </div>
  );
};

export default Footer;
