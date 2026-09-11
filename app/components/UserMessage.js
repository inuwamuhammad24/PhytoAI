import React from "react"
import { CheckCheck } from "lucide-react"

export default function UserMessage({ message, imagePreview }) {
  return (
    <div className="flex justify-end w-full">
      <div className="max-w-md sm:max-w-lg rounded-2xl rounded-tr-sm border border-emerald-800/60 bg-[#122319] p-3 shadow-lg shadow-black/40 text-zinc-100">
        {/* Leaf Specimen Image Card */}
        {imagePreview && (
          <div className="mb-2.5 overflow-hidden rounded-xl border border-emerald-700/50 bg-black/40">
            <img
              src={imagePreview}
              alt="Uploaded plant specimen"
              className="h-48 w-full object-cover transition duration-300 hover:scale-[1.02]"
            />
          </div>
        )}

        {/* Message Description */}
        <div className="flex items-end justify-between gap-4">
          <p className="text-xs sm:text-sm font-medium leading-relaxed text-emerald-100">
            {message}
          </p>
          <span className="flex items-center text-emerald-400/70 shrink-0">
            <CheckCheck size={14} />
          </span>
        </div>
      </div>
    </div>
  )
}
