import React from "react"

export default function About() {
  return (
    <div className="min-h-[100dvh] bg-[#1b1b1d] text-[#e8eaed] px-6 py-10 flex justify-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl lg:text-4xl font-extrabold mb-6 text-center">
          About{" "}
          <span className="text-[#22c55e]">Plant Disease Detector 🌱</span>
        </h1>

        <p className="text-lg leading-relaxed mb-6 text-center text-[#cbd5e1]">
          Plant Health AI is an intelligent web application designed to help
          farmers, gardeners, and agricultural enthusiasts quickly identify
          plant diseases and receive practical treatment recommendations.
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-bold mb-2">🌿 What does it do?</h2>
            <p className="text-[#d1d5db] leading-relaxed">
              Users upload a photo of a plant leaf, and the system analyzes the
              image to detect possible diseases. If a disease is identified, the
              app provides a confidence score along with suggested treatment and
              prevention steps.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">🧠 How does it work?</h2>
            <p className="text-[#d1d5db] leading-relaxed">
              Plant Health AI uses a vision-enabled artificial intelligence
              model trained on agricultural knowledge. The AI examines visual
              patterns on the leaf such as discoloration, spots, and texture to
              determine whether the plant is healthy or affected by disease.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">
              🌾 Why is this important?
            </h2>
            <p className="text-[#d1d5db] leading-relaxed">
              Early detection of plant diseases can prevent crop loss, reduce
              unnecessary chemical use, and improve food security. This project
              aims to make expert-level plant disease insights accessible to
              everyone, especially in regions with limited access to
              agricultural specialists.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">⚠️ Important note</h2>
            <p className="text-[#d1d5db] leading-relaxed">
              While Plant Health AI provides helpful guidance, it should not
              replace professional agricultural advice. Environmental factors,
              soil conditions, and crop variety can affect disease diagnosis.
              Always consult a qualified agricultural expert for critical
              decisions.
            </p>
          </section>
        </div>

        <div className="mt-10 text-center text-sm text-[#9ca3af]">
          Built with ❤️ using modern web technologies and AI
        </div>
      </div>
    </div>
  )
}
