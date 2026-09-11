import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CountDown() {
  // Launch date: October 29, 2025 at 3:00 PM
  const targetDate = new Date("2025-10-29T15:00:00").getTime()

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance <= 0) {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-gray-800 text-center text-white px-6">
      {/* Title */}
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-10 tracking-wide"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        🚀 Coming Soon
      </motion.h1>

      {/* Countdown Container */}
      <motion.div
        className="flex flex-wrap justify-center gap-6 bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-10 shadow-2xl border border-white/10 font-orbitron"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Minutes", value: timeLeft.minutes },
          { label: "Seconds", value: timeLeft.seconds },
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center w-24">
            <span className="text-6xl sm:text-7xl font-mono font-bold text-blue-400 drop-shadow-lg">
              {String(item.value).padStart(2, "0")}
            </span>
            <span className="uppercase text-sm tracking-widest text-gray-300 mt-2">
              {item.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Footer text */}
      <motion.p
        className="mt-10 text-gray-300 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        We’re launching{" "}
        <span className="font-semibold text-blue-400">October 29th, 2025</span>{" "}
        at <span className="font-semibold text-blue-400">3:00 PM</span> 🎉
      </motion.p>
    </div>
  )
}
