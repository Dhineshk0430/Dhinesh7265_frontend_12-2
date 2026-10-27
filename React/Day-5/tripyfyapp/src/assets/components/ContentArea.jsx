import { Link } from "react-router-dom";

const services = [
  {
    icon: "🏨",
    title: "Hotels & Rooms",
    description: "Discover comfortable accommodation for every budget.",
  },
  {
    icon: "🚕",
    title: "Cab Booking",
    description: "Arrange convenient transportation for your journey.",
  },
  {
    icon: "🏍️",
    title: "Bike Rentals",
    description: "Explore new places freely at your own pace.",
  },
  {
    icon: "🗺️",
    title: "Trip Planning",
    description: "Organize destinations, travel dates and activities.",
  },
];

const destinations = [
  {
    name: "Ooty",
    description: "Beautiful hills, tea gardens and peaceful escapes.",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Goa",
    description: "Beaches, sunsets and coastal adventures.",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Munnar",
    description: "Green valleys and refreshing mountain views.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Jaipur",
    description: "Royal heritage, architecture and culture.",
    image:
      "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=80",
  },
];

function ContentArea() {
  return (
    <>
      {/* Services */}
      <section className="bg-slate-50 px-6 py-20 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="font-bold tracking-widest text-teal-600">
              EVERYTHING IN ONE PLACE
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-blue-950 md:text-4xl">
              Your Journey, Simplified
            </h2>

            <p className="mt-4 text-slate-600">
              Everything you need for your next adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Link
                to="/book"
                key={service.title}
                className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <span className="text-5xl">{service.icon}</span>

                <h3 className="mt-5 text-xl font-bold text-blue-950">
                  {service.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {service.description}
                </p>

                <span className="mt-5 inline-block font-semibold text-teal-600">
                  Explore service →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular destinations */}
      <section id="destinations" className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="font-bold tracking-widest text-teal-600">
              FIND YOUR NEXT FAVOURITE PLACE
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-blue-950 md:text-4xl">
              Popular Destinations
            </h2>

            <p className="mt-4 text-slate-600">
              Discover amazing places and create unforgettable memories.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination) => (
              <Link
                to="/book"
                key={destination.name}
                className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl"
              >
                <div className="overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    loading="lazy"
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-blue-950">
                    {destination.name}
                  </h3>

                  <p className="mt-2 leading-6 text-slate-600">
                    {destination.description}
                  </p>

                  <p className="mt-4 font-semibold text-teal-600">
                    Discover destination →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose Tripyfy */}
      <section className="bg-blue-950 px-6 py-20 text-white md:px-12">
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-bold tracking-widest text-teal-300">
            WHY CHOOSE TRIPYFY?
          </p>

          <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">
            One Platform. Endless Possibilities.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
            Bring your travel planning, accommodation and transportation
            needs together. Spend less time coordinating and more time
            enjoying your journey.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
            <div>
              <span className="text-4xl">⚡</span>
              <h3 className="mt-4 text-xl font-bold">Easy Planning</h3>
              <p className="mt-2 text-slate-300">
                Organize your journey with greater convenience.
              </p>
            </div>

            <div>
              <span className="text-4xl">🧳</span>
              <h3 className="mt-4 text-xl font-bold">All-in-One Travel</h3>
              <p className="mt-2 text-slate-300">
                Explore essential travel services in one place.
              </p>
            </div>

            <div>
              <span className="text-4xl">🌍</span>
              <h3 className="mt-4 text-xl font-bold">Explore More</h3>
              <p className="mt-2 text-slate-300">
                Discover places and make lasting memories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final promotional banner */}
      <section className="bg-teal-50 px-6 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-blue-950 md:text-4xl">
          Your Next Adventure Is Calling!
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          Choose your destination, plan your journey and let Tripyfy
          bring your travel essentials together.
        </p>

        <Link
          to="/book"
          className="mt-8 inline-block rounded-full bg-teal-500 px-8 py-4 font-bold text-white transition hover:bg-teal-600"
        >
          Start Your Journey →
        </Link>
      </section>
    </>
  );
}

export default ContentArea;