import Hero from "../components/Home/Hero";
import Services from "../components/Home/Services";
import CircularCards from "../components/UI/cards/CircularCards";
import Recipes from "../components/Home/Recipes";
import Banner from "../components/Home/Banner";
import MasonaryGrid from "../components/UI/ImageGridGallery";
import Social from "../components/Home/Social";

import { bannerPizza, burger, fruits, icecream } from "../assets";
import { cuisines, serviceTypes } from "../utils/data";

import Footer from "../components/UI/Footer";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <>
      <Hero />
      <Services serviceTypes={serviceTypes} />
      <motion.section className="p-2">
        <div className="container">
          <h2 className="text-primary">Our best delivered cuisines</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            doeiusmod tempor incididunt ut labore et dolore
          </p>
          <CircularCards data={cuisines} divider link="/restaurants?cusine=" />
        </div>
      </motion.section>
      <Recipes />
      <motion.div
        initial={{ scale: 0.95 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5 }}>
        <Banner banner={bannerPizza}>
          <h1 className="text-white">
            Fastest food <span className="text-primary">delivery </span> in the
            town
          </h1>
        </Banner>
      </motion.div>

      <section className="offer-section">
        <div className="container p-2">
          <MasonaryGrid
            primaryImage={burger}
            overlayText={"Buy 2 get 1 free"}
            secondaryImage={icecream}
            ternaryImage={fruits}
            gridGap2x
            rounded
          />
        </div>
      </section>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}>
        <Social />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}>
        <Footer />
      </motion.div>
    </>
  );
};

export default Home;
