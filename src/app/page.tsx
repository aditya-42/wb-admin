"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

function AnimatedSection({ id, children }: { id: string; children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className="w-full min-h-[80vh] flex flex-col items-center justify-center py-16"
    >
      {children}
    </motion.section>
  );
}

const scrollToSection = (id: string) => {
  if (typeof window !== "undefined") {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white px-2">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 shadow flex items-center justify-center gap-4 py-3">
        <button onClick={() => scrollToSection("home")} className="px-4 py-2 font-semibold text-white hover:text-green-400 transition">Home</button>
        <button onClick={() => scrollToSection("download")} className="px-4 py-2 font-semibold text-white hover:text-green-400 transition">Download</button>
        <button onClick={() => scrollToSection("about")} className="px-4 py-2 font-semibold text-white hover:text-green-400 transition">About</button>
      </nav>

      {/* Home Section */}
      <AnimatedSection id="home">
        <header className="w-full max-w-2xl text-center mt-20">
          {/* Replace below div with your logo image if you have one */}
          <div className="mx-auto mb-6 flex items-center justify-center">
            <span className="inline-block bg-white rounded-full w-16 h-16 flex items-center justify-center">
              <span className="text-black font-extrabold text-2xl">CR</span>
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-2">
            Cash Register App
          </h1>
          <p className="text-lg text-gray-300">
            Simple, fast, and secure cash management for your business.
          </p>
        </header>
      </AnimatedSection>

      {/* Download Section */}
      <AnimatedSection id="download">
        <section className="w-full max-w-xl bg-[#181818] rounded-2xl shadow-lg p-8 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4 text-green-400">
            Download The App
          </h2>
          <p className="text-gray-300 mb-6 text-base text-center">
            Available on all platforms. Start using the Cash Register app now!
          </p>
          <div className="flex gap-4 mb-6 flex-col sm:flex-row">
            <a
              href="#"
              className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-200 transition"
            >
              {/* iOS Apple logo */}
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M19.665 13.824c-.027-2.693 2.193-3.98 2.288-4.042-1.25-1.822-3.198-2.072-3.883-2.097-1.651-.168-3.22.971-4.063.971-.842 0-2.145-.946-3.531-.92-1.815.026-3.5 1.05-4.435 2.664-1.887 3.266-.482 8.1 1.345 10.757.892 1.263 1.953 2.683 3.348 2.631 1.35-.053 1.86-.852 3.486-.852 1.626 0 2.077.852 3.52.826 1.463-.027 2.382-1.295 3.267-2.56.576-.845.819-1.293 1.281-2.262-3.356-1.285-3.875-4.684-3.848-4.907zm-3.687-9.575c.762-.922 1.276-2.208 1.137-3.249-1.098.044-2.422.733-3.208 1.646-.704.82-1.326 2.131-1.091 3.386 1.162.089 2.353-.594 3.162-1.783z" />
              </svg>
              iOS Download
            </a>
            <a
              href="#"
              className="flex items-center gap-2 bg-green-500 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-green-600 transition"
            >
              {/* Android logo */}
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M17.523 9.504l1.44-2.495c.138-.24.059-.548-.182-.687a.497.497 0 00-.687.182l-1.453 2.523A8.972 8.972 0 0012 9.077c-1.591 0-3.083.418-4.641 1.127L5.897 6.504a.497.497 0 00-.687-.182.5.5 0 00-.182.687l1.44 2.495A9.006 9.006 0 003 14.247c0 2.484 1.014 4.733 2.737 6.456A9.048 9.048 0 0012 24a9.048 9.048 0 006.263-3.297A9.006 9.006 0 0021 14.247c0-2.34-.868-4.5-2.477-6.025zM12 22c-4.419 0-8-3.581-8-8 0-1.385.342-2.691.966-3.812.023-.043.048-.085.074-.126l2.088 3.655c.128.225.428.33.697.204a.5.5 0 00.204-.697l-2.116-3.706A7.965 7.965 0 0112 6.247c1.361 0 2.68.33 3.883.96l-2.117 3.706a.5.5 0 00.204.697.497.497 0 00.697-.204l2.088-3.655c.027.041.051.083.074.126A7.973 7.973 0 0120 14.247c0 4.419-3.581 8-8 8z" />
              </svg>
              Android Download
            </a>
          </div>
          <ul className="text-gray-300 text-base list-disc ml-6 text-left">
            <li>Easy product selection and quantity input</li>
            <li>Automatic price calculation</li>
            <li>Manager mode: view history & restock items</li>
          </ul>
        </section>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection id="about">
        <section className="w-full max-w-2xl bg-[#181818] rounded-2xl shadow-lg p-8 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">About</h2>
          <p className="text-gray-200 mb-4 text-base text-center">
            The Cash Register App was built for businesses and individuals who want a fast, reliable way to manage sales, inventory, and more—right from their phone.
          </p>
          <p className="text-gray-200 text-base text-center">
            Created using cutting-edge technology, our mission is to simplify your cash management and give you more control. <br />
            <span className="font-semibold">Version 1.0</span> – {new Date().getFullYear()}
          </p>
        </section>
      </AnimatedSection>

      <footer className="w-full text-center text-gray-500 py-8 text-sm">
        &copy; {new Date().getFullYear()} Cash Register App. All rights reserved.
      </footer>
    </main>
  );
}
