import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Feature from "../../components/Feature";
import About from "../../components/About";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <div>
      <div className=" sticky top-0 z-10">
        <Header />
      </div>
      <div>
        <Hero />
        <Feature />
        <About />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
