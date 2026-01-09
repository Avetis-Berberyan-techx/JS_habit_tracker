// Create event listeners for each card
export function createCardEventListener(event, index, habitManager) {
  let currentHabitCategory = document.getElementById(
    `habit-card__category-${index}`
  );
  let currentHabitDescription = document.getElementById(
    `habit-card__name-${index}`
  );
  let currentHabitButton = document.getElementById(
    `habit-card__button-${index}`
  );
  let currentEdit = document.getElementById(`habit-card__edit-${index}`);
  let currentDelete = document.getElementById(`habit-card__delete-${index}`);
  let card = document.getElementById(`habit-card-${index}`);

  // Mark Done / Undo
  currentHabitButton.addEventListener(event, () => {
    if (!habitManager.data[index].isDone) {
      currentHabitCategory.style.cssText = `
        color: lightgreen;
        border: 2px solid lightgreen;
        padding: 0 12px;
        border-radius: 20px;
        padding: 10px auto;
      `;
      currentHabitDescription.style.cssText = `text-decoration:line-through;`;
      card.style.cssText = `
        border: 2px solid lightgreen;
        background: rgba(16, 185, 129, 0.08);
      `;
      currentHabitButton.innerText = "✓ Done";
      habitManager.data[index].isDone = true;
    } else {
      currentHabitCategory.style.cssText = "";
      currentHabitDescription.style.cssText = "";
      card.style.cssText = "";
      currentHabitButton.innerText = "Mark Done";
      habitManager.data[index].isDone = false;
    }
    habitManager.saveData();
  });

  // Edit habit
  currentEdit.addEventListener(event, () => {
    let newName = prompt("Edit Habit name", currentHabitDescription.innerText);
    if (newName) {
      currentHabitDescription.innerText = newName;
      habitManager.data[index].description = newName;
      habitManager.saveData();
    }
  });

  // Delete habit
  currentDelete.addEventListener(event, () => {
    delete habitManager.data[index];
    habitManager.updateData();
    habitManager.saveData();
    console.log(habitManager.data);
    isDoneValidation(habitManager.data);
  });
}

// creating habit Card
export function cardCreator(habitCategory, habitDescription, index) {
  return `
        <div class="habit-card" id=${`habit-card-${index}`}>
          <span class="habit-card__category" id=${`habit-card__category-${index}`}>${habitCategory}</span>
          <h3 class="habit-card__name" id=${`habit-card__name-${index}`}>${habitDescription}</h3>
          <button class="habit-card__button habit-card__button--primary" id=${`habit-card__button-${index}`}>
            Mark Done
          </button>
          <div class="habit-card__actions">
            <button class="habit-card__action" id=${`habit-card__edit-${index}`}>Edit</button>
            <button class="habit-card__action" id=${`habit-card__delete-${index}`}>Delete</button>
          </div>
        </div>
        `;
}

export function isDoneValidation(habitdata) {
  for (let [id, habit] of Object.entries(habitdata)) {
    let currentHabitCategory = document.getElementById(
      `habit-card__category-${id}`
    );
    let currentHabitDescription = document.getElementById(
      `habit-card__name-${id}`
    );
    let currentHabitButton = document.getElementById(
      `habit-card__button-${id}`
    );
    let currentEdit = document.getElementById(`habit-card__edit-${id}`);
    let currentDelete = document.getElementById(`habit-card__delete-${id}`);
    let card = document.getElementById(`habit-card-${id}`);
    if (habit.isDone) {
      currentHabitCategory.style.cssText = `
        color: lightgreen;
        border: 2px solid lightgreen;
        padding: 0 12px;
        border-radius: 20px;
        padding: 10px auto;
      `;
      currentHabitDescription.style.cssText = `text-decoration:line-through;`;
      card.style.cssText = `
        border: 2px solid lightgreen;
        background: rgba(16, 185, 129, 0.08);
      `;
      currentHabitButton.innerText = "✓ Done";
    } else {
      currentHabitCategory.style.cssText = "";
      currentHabitDescription.style.cssText = "";
      card.style.cssText = "";
      currentHabitButton.innerText = "Mark Done";
    }
  }
}
