import React, { useState } from "react";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    // simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    toast.success("🎉 You have subscribed successfully!");
    setEmail("");
  };

  return (
    <footer className="mt-24">
      {/* MAIN FOOTER */}
      <div className="bg-[#1b1b3a] text-white py-20 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold tracking-widest mb-4">
          MOVIE <span className="text-orange-400">BOX</span>
        </h2>

        <p className="text-white/70 max-w-xl text-sm mb-8">
          For the latest updates, subscribe to our newsletter and get exclusive
          news, giveaways and freebies
        </p>

        {/* SUBSCRIBE */}
        <div className="flex w-full max-w-md">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email Address"
            className="
              flex-1 px-4 py-3
              bg-[#23235b]
              text-white
              placeholder:text-white/50
              outline-none
              rounded-l-md
            "
          />

          <button
            onClick={handleSubscribe}
            className="
              bg-orange-400
              text-black
              font-semibold
              px-6
              rounded-r-md
              hover:bg-orange-500
              transition
            "
          >
            SUBSCRIBE
          </button>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-[#101026] py-4 text-center text-xs text-white/50">
        © Copyright 2025 | All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
