"use client";

import { useState } from "react";
import MaterialIcon from "@/components/MaterialIcon";
import Link from "next/link";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Password tidak cocok!");
      return;
    }
    console.log(form);
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col md:flex-row">
        {/* Left Side: Visual Brand Area */}
        <section className="relative w-full md:w-1/2 min-h-[300px] md:min-h-screen flex items-center justify-center overflow-hidden">
          <img
            alt="People connecting through technology"
            className="absolute inset-0 w-full h-full object-cover"
            src="baground.jpg"
          />
          <div className="absolute inset-0 bg-green-600/30 mix-blend-multiply"></div>
          <div className="relative z-10 p-margin-base text-center max-w-md">
            <h1 className="font-headline-lg text-headline-lg text-surface-container-lowest mb-stack-sm italic">
              Hello from Wa One
            </h1>
            <p className="font-body-lg text-body-lg text-surface-container-lowest opacity-90">
              Discover a new, more elegant and efficient way to stay connected with the people who matter most to your business.
            </p>
          </div>
        </section>

        {/* Right Side: Registration Form Area */}
        <section className="w-full md:w-1/2 flex items-center justify-center p-margin-base bg-surface-container-lowest">
          <div className="w-full max-w-md space-y-gutter">

            {/* Logo Section - Centered */}
            <div className="flex justify-center mb-1">
              <img
                src="logo.jpg"
                alt="Wa One Logo"
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Header Section - Centered */}
            <header className="space-y-stack-xs text-center">
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Create an Account
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Fill in your details to get started
              </p>
            </header>

            <form className="space-y-gutter" onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="space-y-stack-xs">
                <label className="font-label-md text-label-md text-on-surface-variant block ml-1" htmlFor="name">
                  Full Name
                </label>
                <div className="relative">
                  <MaterialIcon
                    name="person"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]"
                  />
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-surface-container-low border-transparent focus:border-primary focus:ring-0 rounded-lg font-body-md text-body-md transition-all duration-200"
                    id="name"
                    name="name"
                    placeholder="full name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* WhatsApp Number Field */}
              <div className="space-y-stack-xs">
                <label className="font-label-md text-label-md text-on-surface-variant block ml-1" htmlFor="whatsapp">
                  Nomor WhatsApp
                </label>
                <div className="relative">
                  <MaterialIcon
                    name="phone"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]"
                  />
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-surface-container-low border-transparent focus:border-primary focus:ring-0 rounded-lg font-body-md text-body-md transition-all duration-200"
                    id="whatsapp"
                    name="whatsapp"
                    placeholder="whatsapp number"
                    type="tel"
                    value={form.whatsapp}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-stack-xs">
                <label className="font-label-md text-label-md text-on-surface-variant block ml-1" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <MaterialIcon
                    name="lock"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]"
                  />
                  <input
                    className="w-full pl-10 pr-12 py-3 bg-surface-container-low border-transparent focus:border-primary focus:ring-0 rounded-lg font-body-md text-body-md transition-all duration-200"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                  >
                    <MaterialIcon name={showPassword ? "visibility_off" : "visibility"} className="text-[20px]" />
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-stack-xs">
                <label className="font-label-md text-label-md text-on-surface-variant block ml-1" htmlFor="confirm_password">
                  Confirm Password
                </label>
                <div className="relative">
                  <MaterialIcon
                    name="lock_reset"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]"
                  />
                  <input
                    className="w-full pl-10 pr-12 py-3 bg-surface-container-low border-transparent focus:border-primary focus:ring-0 rounded-lg font-body-md text-body-md transition-all duration-200"
                    id="confirm_password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                  >
                    <MaterialIcon name={showConfirmPassword ? "visibility_off" : "visibility"} className="text-[20px]" />
                  </button>
                </div>
              </div>

              {/* Submit Button - Sesuai dengan gambar sebelah kiri */}
              <button
                className="w-full py-3.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-lg rounded-2xl shadow-lg transition-all duration-200 flex items-center justify-center group"
                type="submit"
              >
                Register
              </button>
              {/* Link kembali ke login */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-primary font-bold"
                  >
                    Go back to login page
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}