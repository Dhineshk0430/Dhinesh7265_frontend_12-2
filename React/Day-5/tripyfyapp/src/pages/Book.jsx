import { useState } from "react";

const services = [
  { icon: "🏨", title: "Hotels & Rooms" },
  { icon: "🚕", title: "Cab Booking" },
  { icon: "🏍️", title: "Bike Rentals" },
  { icon: "🗺️", title: "Travel Packages" },
];

function Book() {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [travellers, setTravellers] = useState("2");
  const [service, setService] = useState("Hotels & Rooms");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    setMessage(
      `Your ${service.toLowerCase()} search for ${destination} is ready. Live booking options will be available when a booking provider is connected.`
    );
  }

  return (
    <>
      <section className="bg-blue-950 px-6 py-20 text-center text-white">
        <p className="font-bold tracking-widest text-teal-300">
          YOUR NEXT ADVENTURE STARTS HERE
        </p>

        <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">
          Book Your Journey
        </h1>

        <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
          Find accommodation, arrange transportation and explore
          experiences for your next trip.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg md:p-10"
        >
          <h2 className="text-2xl font-bold text-blue-950">
            Plan Your Trip
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <label className="font-semibold text-slate-700">
              Destination
              <input
                type="text"
                required
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                placeholder="Where do you want to go?"
                className="mt-2 w-full rounded-lg border border-slate-300 p-3 font-normal outline-none focus:border-teal-500"
              />
            </label>

            <label className="font-semibold text-slate-700">
              Travel Date
              <input
                type="date"
                required
                min={new Date().toLocaleDateString("en-CA")}
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 p-3 font-normal outline-none focus:border-teal-500"
              />
            </label>

            <label className="font-semibold text-slate-700">
              Travellers
              <select
                value={travellers}
                onChange={(event) => setTravellers(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 p-3 font-normal"
              >
                <option value="1">1 Traveller</option>
                <option value="2">2 Travellers</option>
                <option value="3">3 Travellers</option>
                <option value="4">4 Travellers</option>
                <option value="5+">5+ Travellers</option>
              </select>
            </label>

            <label className="font-semibold text-slate-700">
              Service
              <select
                value={service}
                onChange={(event) => {
                  setService(event.target.value);
                  setMessage("");
                }}
                className="mt-2 w-full rounded-lg border border-slate-300 p-3 font-normal"
              >
                {services.map((item) => (
                  <option key={item.title} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-teal-500 py-4 font-bold text-white transition hover:bg-teal-600"
          >
            Search Your Journey →
          </button>

          {message && (
            <p
              role="status"
              className="rounded-lg bg-teal-50 p-4 leading-7 text-teal-800"
            >
              {message}
            </p>
          )}
        </form>
      </section>

      <section className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-extrabold text-blue-950">
            Everything for Your Trip
          </h2>

          <p className="mt-4 text-center text-slate-600">
            Choose the services you need for your journey.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((item) => (
              <button
                type="button"
                key={item.title}
                onClick={() => {
                  setService(item.title);
                  setMessage("");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`rounded-2xl border bg-white p-6 text-left transition hover:-translate-y-1 hover:shadow-lg ${
                  service === item.title
                    ? "border-teal-500 ring-2 ring-teal-100"
                    : "border-slate-200"
                }`}
              >
                <span className="text-4xl">{item.icon}</span>

                <h3 className="mt-4 font-bold text-blue-950">
                  {item.title}
                </h3>

                <p className="mt-4 font-semibold text-teal-600">
                  Select service →
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Book;