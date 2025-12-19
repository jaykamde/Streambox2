import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const CinematicPage = ({ title, icon, children }) => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen text-white pt-24 px-10 pb-20 overflow-hidden">
      {/* 🎥 CINEMATIC VIDEO BG */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20"
      >
        <source src="/movie-bg.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70 -z-10" />

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-10">
        <button
          onClick={() => navigate(-1)}
          className="text-white/70 hover:text-white"
        >
          <Icon icon="mdi:arrow-left" className="text-2xl" />
        </button>

        <h1 className="text-3xl font-extrabold flex items-center gap-2">
          {icon && <Icon icon={icon} />}
          {title}
        </h1>
      </div>

      {children}
    </div>
  );
};

export default CinematicPage;
