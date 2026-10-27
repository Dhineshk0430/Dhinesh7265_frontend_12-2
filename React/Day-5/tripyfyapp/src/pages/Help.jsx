import { useState } from "react";

const faqs = [
  {
    question: "What is Tripyfy?",
    answer:
      "Tripyfy is a travel planning platform designed to bring trip organization, accommodation and transportation services together.",
  },
  {
    question: "How can I plan a trip?",
    answer:
      "Visit the Book page, enter your destination and travel date, and select the travel service you need.",
  },
  {
    question: "Can I find hotels and rooms?",
    answer:
      "Tripyfy is designed to help users discover accommodation options. Live availability and reservations require a connected booking provider.",
  },
  {
    question: "Can I book cabs and rent bikes?",
    answer:
      "Tripyfy aims to provide cab booking and bike rental options through supported service providers.",
  },
  {
    question: "How do cancellations and refunds work?",
    answer:
      "Cancellation and refund policies depend on the provider and the terms of your booking.",
  },
];

function Help() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <section className="bg-blue-950 px-6 py-20 text-center text-white">
        <p className="font-bold tracking-widest text-teal-300">
          TRIPYFY SUPPORT
        </p>

        <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">
          How Can We Help You?
        </h1>

        <p className="mx-auto mt-5 max-w-xl leading-8 text-slate-300">
          Find answers to common questions about bookings, payments
          and travel planning.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="mb-8 text-3xl font-extrabold text-blue-950">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white"
            >
              <button
                type="button"
                aria-expanded={openIndex === index}
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between gap-4 p-5 text-left font-bold text-blue-950 hover:bg-slate-50"
              >
                {faq.question}

                <span className="text-xl text-teal-600">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <p className="border-t border-slate-100 px-5 py-4 leading-7 text-slate-600">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-teal-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-950">
            Still Need Help?
          </h2>

          <p className="mt-3 text-slate-600">
            Contact our support team for help with your questions.
          </p>

          <a
            href="mailto:support@tripyfy.com"
            className="mt-6 inline-block rounded-full bg-teal-500 px-7 py-3 font-bold text-white hover:bg-teal-600"
          >
            Contact Support
          </a>
        </div>
      </section>
    </>
  );
}

export default Help;