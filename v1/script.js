console.log("Hello hff!");

const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");

factsList.innerHTML = "";
const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

// Load data from supabase.
loadFacts();
async function loadFacts() {
  const res = await fetch(
    "https://jnnwamiqzevnjcuiakio.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpubndhbWlxemV2bmpjdWlha2lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ1MjI4ODAsImV4cCI6MTk5MDA5ODg4MH0.q92HI1rsZm4-o5QcLON8O9hZ0V4cm_xThoArpRTyFlc",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpubndhbWlxemV2bmpjdWlha2lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ1MjI4ODAsImV4cCI6MTk5MDA5ODg4MH0.q92HI1rsZm4-o5QcLON8O9hZ0V4cm_xThoArpRTyFlc",
      },
    }
  );
  const data = await res.json();
  //   console.log(data);
  createFactsList(data);
}

function createFactsList(dataArray) {
  const htmlArr = dataArray.map(
    (fact) =>
      `<li class="fact"><p>
        ${fact.text}
        <a
          class="source"
          href="${fact.source}"
          target="_blank"
          >(Source)</a
        >
      </p>
      <span class="tag" style="background-color:${
        CATEGORIES.find((cat) => cat.name === fact.category).color
      }"
        >${fact.category}</span
      >
      </li>`
  );
  const html = htmlArr.join("");
  factsList.insertAdjacentHTML("afterbegin", html);
}

btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share a fact";
  }
});
