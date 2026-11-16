const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = new Date().getFullYear();

const contactForm = document.querySelector("#contact-form");
const countryCodes = {
  Albania: "al", Austria: "at", Belarus: "by", Canada: "ca", "Costa Rica": "cr",
  "Czech Republic": "cz", Denmark: "dk", Finland: "fi", France: "fr", Germany: "de",
  Greece: "gr", Hungary: "hu", Iceland: "is", Italy: "it",
  Moldova: "md", UAE: "ae", Netherlands: "nl", "New Zealand": "nz",
  Norway: "no", Peru: "pe", Russia: "ru", Sweden: "se", Turkey: "tr",
  Switzerland: "ch", "United Kingdom": "gb", USA: "us"
};

document.querySelectorAll("#contact-destination, #destination-select").forEach((select) => {
  const flag = select.parentElement.querySelector(".selected-country-flag");
  const updateFlag = () => {
    const code = countryCodes[select.value];
    flag.hidden = !code;
    if (code) {
      flag.src = `https://flagcdn.com/w40/${code}.png`;
      flag.alt = `Flag of ${select.value}`;
    } else {
      flag.removeAttribute("src");
      flag.alt = "";
    }
  };
  select.addEventListener("change", updateFlag);
  updateFlag();
});

if (contactForm) {
  const requestedDestination = new URLSearchParams(window.location.search).get("destination");
  if (requestedDestination) {
    const destinationSelect = document.querySelector("#contact-destination");
    if ([...destinationSelect.options].some((option) => option.value === requestedDestination || option.text === requestedDestination)) {
      destinationSelect.value = requestedDestination;
      destinationSelect.dispatchEvent(new Event("change"));
    }
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const message = [
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `Country or destination: ${formData.get("destination") || "Open to options"}`,
      `Preferred travel or start time: ${formData.get("timing") || "Not specified"}`,
      "",
      "Plans, documents, travel, or support requested:",
      formData.get("message") || "No additional details provided."
    ].join("\n");
    const subject = `Vistagate services inquiry from ${formData.get("name")}`;
    const recipient = "info@vistagatetravels.com";

    window.location.href =
      `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  });
}
