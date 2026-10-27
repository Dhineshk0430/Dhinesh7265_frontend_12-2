import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <section className="bg-blue-950 px-6 py-24 text-center text-white">
        <p className="font-bold tracking-widest text-teal-300">
          ABOUT TRIPYFY
        </p>

        <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">
          Travel Planning, Made Simple.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-300">
          We believe travelling should be exciting, not complicated.
          Tripyfy brings trip planning, accommodation and transportation
          together in one convenient platform.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-2 md:px-12">
        <div>
          <p className="font-bold tracking-widest text-teal-600">
            OUR STORY
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-blue-950">
            One Platform for Every Journey
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Planning a trip can involve multiple tasks, from choosing
            destinations to arranging transport and finding accommodation.
            Tripyfy aims to bring these essential travel needs together
            in one accessible place.
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            Whether you are planning a weekend getaway, a family holiday
            or a long adventure, our goal is to make organizing your
            journey easier and more convenient.
          </p>

          <Link
            to="/book"
            className="mt-7 inline-block rounded-full bg-teal-500 px-7 py-3 font-bold text-white hover:bg-teal-600"
          >
            Start Planning →
          </Link>
        </div>

        <div className="grid gap-6">
          <div className="rounded-2xl bg-teal-50 p-8">
            <span className="text-4xl">🎯</span>
            <h3 className="mt-4 text-2xl font-bold text-blue-950">
              Our Mission
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              To simplify travel planning by bringing essential trip
              services together in one convenient platform.
            </p>
          </div>

          <div className="rounded-2xl bg-blue-50 p-8">
            <span className="text-4xl">🌍</span>
            <h3 className="mt-4 text-2xl font-bold text-blue-950">
              Our Vision
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              To inspire people to discover new places and create
              meaningful travel memories.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-blue-950">
          Plan Less. Explore More.
        </h2>
        <p className="mt-4 text-slate-600">
          Your next adventure starts with Tripyfy.
        </p>
      </section>
    </>
  );
}

export default About;