import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EMPTY_PROFILE = {
  id: null,
  name: "",
  nickName: "",
  gender: "",
  country: "",
  language: "",
  timezone: "",
  email: "",
};

export default function Profile() {
  const navigate = useNavigate();

  const [profiles, setProfiles] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(EMPTY_PROFILE);

  /* LOAD */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("profiles") || "[]");
    if (saved.length) {
      setProfiles(saved);
      setActiveId(saved[0].id);
    }
  }, []);

  /* SAVE */
  useEffect(() => {
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }, [profiles]);

  const activeProfile = profiles.find((p) => p.id === activeId);

  const startNewProfile = () => {
    setForm({ ...EMPTY_PROFILE, id: Date.now() });
    setEditing(true);
  };

  const editProfile = () => {
    if (!activeProfile) return;
    setForm(activeProfile);
    setEditing(true);
  };

  const saveProfile = () => {
    if (!form.name.trim()) {
      alert("Name is required");
      return;
    }

    setProfiles((prev) => {
      const exists = prev.find((p) => p.id === form.id);
      if (exists) {
        return prev.map((p) => (p.id === form.id ? form : p));
      }
      return [...prev, form];
    });

    setActiveId(form.id);
    setEditing(false);
  };

  return (
    <div className="relative min-h-screen text-white">
      {/* 🎥 BACKGROUND VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
      >
        <source src="/profile-bg.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="fixed inset-0 bg-black/60 z-10" />

      <div className="relative z-20 px-6 md:px-10 py-10">
        {/* ⬅️ BACK */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
        >
          ⬅ Back
        </button>

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Welcome, {activeProfile?.name || "User"}
          </h1>
          <p className="text-white/70 text-sm">
            Manage your profiles
          </p>
        </div>

        {/* ADD PROFILE */}
        <button
          onClick={startNewProfile}
          className="mb-10 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition"
        >
          + Add Profile
        </button>

        {/* EMPTY STATE */}
        {!profiles.length && !editing && (
          <div className="mt-32 text-center text-white/70 text-lg">
            👉 Please click on{" "}
            <span className="text-indigo-400 font-semibold">
              Add Profile
            </span>{" "}
            to create profile
          </div>
        )}

        {/* PROFILE CARD */}
        {(editing || activeProfile) && (
          <div
            className="max-w-6xl mx-auto bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-white/40 text-gray-800"
            style={{
              boxShadow:
                "0 0 25px rgba(99,102,241,0.35), 0 0 60px rgba(236,72,153,0.25)",
            }}
          >
            {/* VIEW MODE */}
            {!editing && activeProfile && (
              <>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-5">
                    <Avatar name={activeProfile.name} />
                    <div>
                      <h2 className="text-xl font-semibold">
                        {activeProfile.name}
                      </h2>
                      <p className="text-gray-500 text-sm">
                        {activeProfile.email || "No email"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={editProfile}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Edit Profile
                  </button>
                </div>

                {/* 🔥 ALL INFO DISPLAY */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <Info label="Nick Name" value={activeProfile.nickName} />
                  <Info label="Gender" value={activeProfile.gender} />
                  <Info label="Country" value={activeProfile.country} />
                  <Info label="Language" value={activeProfile.language} />
                  <Info label="Time Zone" value={activeProfile.timezone} />
                  <Info label="Email" value={activeProfile.email} />
                </div>
              </>
            )}

            {/* EDIT / CREATE MODE */}
            {editing && (
              <>
                <h2 className="text-xl font-semibold mb-6">
                  Create / Edit Profile
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Full Name" value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })} />
                  <Input label="Nick Name" value={form.nickName}
                    onChange={(v) => setForm({ ...form, nickName: v })} />
                  <Input label="Gender" value={form.gender}
                    onChange={(v) => setForm({ ...form, gender: v })} />
                  <Input label="Country" value={form.country}
                    onChange={(v) => setForm({ ...form, country: v })} />
                  <Input label="Language" value={form.language}
                    onChange={(v) => setForm({ ...form, language: v })} />
                  <Input label="Time Zone" value={form.timezone}
                    onChange={(v) => setForm({ ...form, timezone: v })} />
                  <Input label="Email" value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })} />
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={saveProfile}
                    className="px-8 py-2 bg-pink-600 text-white rounded-lg hover:opacity-90"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="px-8 py-2 bg-gray-300 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* SMALL COMPONENTS */
function Avatar({ name }) {
  return (
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
      {name ? name[0].toUpperCase() : "U"}
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="bg-white/70 rounded-lg px-4 py-2">
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-medium">{value || "—"}</p>
    </div>
  );
}
