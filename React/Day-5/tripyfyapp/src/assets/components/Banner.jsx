import { Link } from "react-router-dom";
import hero from "../hero.png";

function Banner() {
  return (
    <section
      className="flex min-h-[540px] items-center bg-cover bg-center px-6 py-20 md:px-16"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(5,28,54,0.9), rgba(5,28,54,0.25)), url(${hero})`,
      }}
    >
      <div className="max-w-2xl text-white">
        <p className="font-bold tracking-[4px] text-teal-300">
          YOUR JOURNEY, OUR PLAN
        </p>

        <h1 className="mt-5 text-5xl leading-tight font-extrabold md:text-7xl">
          Explore More.
          <br />
          Worry Less.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-100">
          Discover destinations, find comfortable stays, arrange
          transportation and plan your entire journey with Tripyfy.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/book"
            className="rounded-full bg-teal-500 px-7 py-4 font-bold text-white transition hover:bg-teal-600"
          >
            Plan Your Trip →
          </Link>

          <a
            href="#destinations"
            className="rounded-full border border-white px-7 py-4 font-bold transition hover:bg-white hover:text-blue-950"
          >
            Explore Destinations
          </a>
        </div>
      </div>
    </section>
  );
}

export default Banner;