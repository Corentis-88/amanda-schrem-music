const tracking = {
  fire(name, detail = {}) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...detail });
  }
};

document.querySelectorAll("[data-track]").forEach((el) => {
  el.addEventListener("click", () => {
    tracking.fire(el.dataset.track, {
      site: "amanda-schrem-music",
      label: el.dataset.label || el.textContent.trim()
    });
  });
});

const menuButton = document.querySelector("[data-menu-button]");
const navLinks = document.querySelector("[data-nav-links]");
if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

const chatToggle = document.querySelector("[data-chat-toggle]");
const chatPanel = document.querySelector("[data-chat-panel]");
if (chatToggle && chatPanel) {
  chatToggle.addEventListener("click", () => {
    const isOpen = chatPanel.classList.toggle("open");
    chatToggle.setAttribute("aria-expanded", String(isOpen));
    tracking.fire("chat_toggle", { site: "amanda-schrem-music", open: isOpen });
  });
}

const chatAnswer = document.querySelector("[data-chat-answer]");
document.querySelectorAll("[data-chat-reply]").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.chatReply;
    const answers = {
      qualifications: "Amanda is a Grade 8 pianist, Grade 8 violinist, former Uppingham music scholar and fully DBS checked qualified teacher. Lessons are calm, personal and built around the learner.",
      prices: "Current launch prices are £16 for a 20 minute starter lesson, £21 for 30 minutes, £31 for 45 minutes and £38 for 60 minutes. Home visits have a £5 supplement where agreed.",
      areas: "Amanda is best placed for Stockport, Cheadle, Cheadle Hulme, Bramhall, Hazel Grove, Sale, Altrincham, Manchester City Centre and selected South Manchester areas.",
      trial: "The best next step is to call, WhatsApp or text Amanda to discuss age, instrument, confidence, goals, location and the lesson length that would feel sensible."
    };
    if (chatAnswer) chatAnswer.textContent = answers[key] || answers.trial;
    tracking.fire("chat_quick_reply", { site: "amanda-schrem-music", topic: key });
  });
});
