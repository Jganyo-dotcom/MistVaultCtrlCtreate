import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AddHospital() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1B34] relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full -top-20 -left-20" />
      <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full -bottom-20 -right-20" />

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8 z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 cursor-pointer" onClick={() => navigate(-1)}>
          <ArrowLeft />
          <span className="text-sm">BACK</span>
        </div>

        <h1 className="text-2xl font-semibold text-center mb-6">Register New Hospital</h1>

        {/* FORM */}
        <form className="space-y-6">
          {/* Hospital Info */}
          <div>
            <h2 className="font-semibold mb-3">Hospital Information*</h2>

            <div className="grid grid-cols-1 gap-4">
              <Input label="Hospital Name" />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <Input label="Official Email" />
              <Input label="Official Contact" />
            </div>

            <div className="mt-4">
              <Input label="Address" />
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <Input label="City" />
              <Input label="State" />
              <Input label="Postal Code" />
            </div>
          </div>

          {/* Representative */}
          <div>
            <h2 className="font-semibold mb-3">Representative Information*</h2>

            <Input label="Full Name" />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <Input label="Email" />
              <Input label="Contact" />
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button className="bg-blue-700 text-white px-8 py-2 rounded-lg hover:bg-blue-800 transition">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const Input = ({ label }) => (
  <div className="flex flex-col">
    <label className="text-sm mb-1">{label}</label>
    <input className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400" />
  </div>
);