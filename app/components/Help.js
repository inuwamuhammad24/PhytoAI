import React from "react"

export default function Help() {
  return (
    <>
      <header>
        <h1>Help & Support</h1>
        <p>Get answers and guidance on using Matty</p>
      </header>

      <main>
        <section class="about">
          <h2>About Matty</h2>
          <p>The UniJos Chat Assistant helps students, staff, and visitors of the University of Jos find information easily. You can ask questions about admissions, courses, departments, fees, hostels, and more.</p>
        </section>

        <section class="search">
          <h2>Search Help Topics</h2>
          <input type="text" id="searchBox" placeholder="Type your question..." />
          <button onclick="searchHelp()">Search</button>
          <p id="searchResult"></p>
        </section>

        <section class="faq">
          <h2>Frequently Asked Questions</h2>

          <div class="faq-item">
            <button class="faq-question">When is UniJos resuming for the next semester?</button>
            <div class="faq-answer">
              <p>Usually, the new semester resumes in October, but check the official UniJos academic calendar for confirmation.</p>
            </div>
          </div>

          <div class="faq-item">
            <button class="faq-question">How do I check my admission status?</button>
            <div class="faq-answer">
              <p>You can check your admission status on the JAMB portal or the UniJos admission page using your registration number.</p>
            </div>
          </div>

          <div class="faq-item">
            <button class="faq-question">Where is the Faculty of Science located?</button>
            <div class="faq-answer">
              <p>The Faculty of Science is located at the Naraguta Campus of the University of Jos.</p>
            </div>
          </div>

          <div class="faq-item">
            <button class="faq-question">How can I contact the ICT department?</button>
            <div class="faq-answer">
              <p>You can contact the ICT department at the Permanent Site or email ict@unijos.edu.ng.</p>
            </div>
          </div>
        </section>

        <section class="contact">
          <h2>Need More Help?</h2>
          <p>If you have more questions, feel free to contact us:</p>
          <p>
            📧 Email: <a href="#">inuwamuhammad24@gmail.com</a>
            <br />
            ☎️ Phone: +234908822087
          </p>
        </section>
      </main>

      <footer>&copy; 2025 UniJos Chat Assistant. All rights reserved.</footer>
    </>
  )
}
