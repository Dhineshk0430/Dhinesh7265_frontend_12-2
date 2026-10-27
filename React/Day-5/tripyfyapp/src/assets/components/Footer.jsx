import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-950 px-6 py-12 text-white md:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="text-3xl font-extrabold">
            Tripy<span className="text-teal-400">fy</span>
          </h2>

          <p className="mt-4 leading-7 text-slate-400">
            Plan Less. Explore More. Your travel companion for
            discovering destinations and organizing every journey.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-bold">Explore</h3>
          <div className="flex flex-col gap-3 text-slate-400">
            <Link className="hover:text-teal-400" to="/">Home</Link>
            <Link className="hover:text-teal-400" to="/book">Book a Trip</Link>
            <Link className="hover:text-teal-400" to="/about">About Us</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-bold">Support</h3>
          <div className="flex flex-col gap-3 text-slate-400">
            <Link className="hover:text-teal-400" to="/help">Help Center</Link>
            <Link className="hover:text-teal-400" to="/help">FAQs</Link>
            <Link className="hover:text-teal-400" to="/help">Contact Support</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-bold">Ready to Explore?</h3>
          <p className="mb-4 text-slate-400">
            Your next adventure starts with a plan.
          </p>
          <Link
            to="/book"
            className="inline-block rounded-lg bg-teal-500 px-5 py-3 font-bold hover:bg-teal-600"
          >
            Plan a Trip →
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-slate-800 pt-6 text-center text-sm text-slate-400">
        © 2026 Tripyfy. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;