import Navbar from "../../components/shared/Navbar";
import Hero from "../../components/public/Hero";
import Services from "../../components/public/Services";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div id="home">
        <Hero />
        <Services />
      </div>
    </div>
  );
};

export default HomePage;
