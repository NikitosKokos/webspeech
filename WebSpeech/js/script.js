const { speechSynthesis } = window;

const voicesSelect = document.querySelector("#voices");
const langSelect = document.querySelector("#langs");
const rate = document.querySelector("#rate");
const pitch = document.querySelector("#pitch");
const text = document.querySelector("#text");
let someLang = "ru-RU";

let voices = [];
let langs = [];

const generateVoices = () => {
  voices = speechSynthesis.getVoices();
  console.log(voices);
  const voicesList = voices
    .map(
      (voice, index) =>
        voice.lang === someLang &&
        `<option value=${index}>${voice.name} (${voice.lang})</option>`
    )
    .join("");
  voicesSelect.innerHTML = voicesList;
};

const newLang = () => {
  someLang = langSelect.value;
  generateVoices();
};

const generateLangs = () => {
  langs = speechSynthesis.getVoices();

  const langList = langs.map(
    (voice, index) => `<option>${voice.lang}</option>`
  );
  langSelect.innerHTML = Array.from(new Set(langList)).join("");
};

const speak = () => {
  if (speechSynthesis.speaking) {
    return;
  }
  if (text.value !== "") {
    const ssUtterance = new SpeechSynthesisUtterance(text.value);
    ssUtterance.voice = voices[voicesSelect.value];
    ssUtterance.pitch = pitch.value;
    ssUtterance.rate = rate.value;
    speechSynthesis.speak(ssUtterance);
  }
};

generateVoices();
generateLangs();

document
  .querySelector("#btn-stop")
  .addEventListener("click", () => speechSynthesis.cancel());
document.querySelector("#btn-start").addEventListener("click", speak);

rate.addEventListener(
  "change",
  () => (document.querySelector(".rate-value").textContent = rate.value)
);
pitch.addEventListener(
  "change",
  () => (document.querySelector(".pitch-value").textContent = pitch.value)
);

langSelect.addEventListener("change", newLang);
voicesSelect.addEventListener("change", speak);

speechSynthesis.addEventListener("voiceschanged", generateVoices);
speechSynthesis.addEventListener("voiceschanged", generateLangs);
