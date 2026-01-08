import { cardCreator,createCardEventListener } from "./utils.js";

const dataContainer = document.getElementById("habitContainer");
const addHabitButton = document.getElementById("addHabitBtn");
const habitDescriptionInput = document.getElementById("habitInput");
const habitCategoryOption = document.getElementById("habitCategory");

// Example initial data
const initialData = [
  { category: "Health", description: "Go for a 30-minute walk", isDone: false },
  { category: "Work", description: "Finish project report", isDone: false },
  {
    category: "Personal",
    description: "Meditate for 10 minutes",
    isDone: false,
  },
];

class HabitManager {
  lastId = 1;
  constructor(data = []) {
    this.data = {};

    // Load from localStorage if exists
    const saved = JSON.parse(localStorage.getItem("habits")) || [];
    if (saved.length) {
      saved.forEach((obj) => {
        this.data[this.lastId++] = obj;
      });
    } else {
      data.forEach((obj) => {
        this.data[this.lastId++] = obj;
      });
    }
  }

  // Save current data to localStorage
  saveData() {
    const arr = Object.values(this.data);
    localStorage.setItem("habits", JSON.stringify(arr));
  }

  // Render all cards
  updateData() {
    dataContainer.innerHTML = "";
    for (let i = 1; i < this.lastId; i++) {
      if (!Object.keys(this.data).includes(i.toString())) continue;

      const habit = this.data[i];
      dataContainer.insertAdjacentHTML(
        "beforeend",
        cardCreator(habit.category, habit.description, i)
      );
      createCardEventListener("click", i, this);
    }
  }

  // Add a new habit
  addHabit(habitCategory, habitDescription) {
    if (!habitDescription) return;
    this.data[this.lastId] = {
      category: habitCategory,
      description: habitDescription,
      isDone: false,
    };
    dataContainer.insertAdjacentHTML(
      "beforeend",
      cardCreator(habitCategory, habitDescription, this.lastId)
    );
    createCardEventListener("click", this.lastId, this);
    this.lastId++;
    this.saveData();
  }
}

// Initialize
const dataManager = new HabitManager(initialData);
dataManager.updateData();

// Add habit button
addHabitButton.addEventListener("click", () => {
  dataManager.addHabit(habitCategoryOption.value, habitDescriptionInput.value);
  habitDescriptionInput.value = "";
});
