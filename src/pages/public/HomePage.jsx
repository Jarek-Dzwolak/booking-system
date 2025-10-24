import Navbar from "../../components/shared/Navbar";
import Hero from "../../components/public/Hero";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      {/* Tutaj sekcje */}
    </div>
  );
};

export default HomePage;
