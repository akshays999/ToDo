const inputBox = document.querySelector("#input-box");
const listContainer = document.querySelector("#list-container");
const dayNightButton = document.querySelector(".dayNight");

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

function toggleMode() {
  document.body.classList.toggle("light-mode");

  const isLightMode = document.body.classList.contains("light-mode");
  dayNightButton.innerHTML = `<img src="img/${
    isLightMode ? "day" : "night"
  }.png" />`;

  localStorage.setItem("mode", isLightMode ? "light" : "dark");

}

function applySavedMode() {
  // Get the saved mode from localStorage
  const savedMode = localStorage.getItem("mode");

  // If the saved mode is "light", apply the light mode
  if (savedMode === "light") {
    document.body.classList.add("light-mode");
    dayNightButton.innerHTML = `<img src="img/day.png" />`;
  } else {
    dayNightButton.innerHTML = `<img src="img/night.png" />`;
  }
}

dayNightButton.addEventListener("click", toggleMode);

applySavedMode();
showTask();
