let filteredFoods = [];
let currentIndex = 0;

const card = document.getElementById("card");
const foodName = document.getElementById("foodName");
const foodMood = document.getElementById("foodMood");

function start() {
  const mood = document.getElementById("moodSelect").value;

  if (!mood) {
    alert("Please select a mood first!");
    return;
  }

  filteredFoods = foods.filter(food =>
    food.mood.includes(mood)
  );

  currentIndex = 0;

  if (filteredFoods.length === 0) {
    foodName.textContent = "No foods found 😢";
    foodMood.textContent = "";
    return;
  }

  showCard();
}

function showCard() {
  if (currentIndex >= filteredFoods.length) {
    foodName.textContent = "No more options 😢";
    foodMood.textContent = "";
    return;
  }

  foodName.textContent = filteredFoods[currentIndex].name;
  foodMood.textContent = filteredFoods[currentIndex].mood.join(" • ");
}

function swipe(direction) {

  if (direction === "right") {
    card.classList.add("swipe-right");

    // matchSound.currentTime = 0;   // restart sound if clicked fast
    // matchSound.play();


    setTimeout(() => {
      foodName.textContent =
        "🎉 MATCH! You chose " + filteredFoods[currentIndex].name;
      foodMood.textContent = "";
      card.classList.remove("swipe-right");
    }, 400);

    return;
  }

  if (direction === "left") {
    card.classList.add("swipe-left");

    setTimeout(() => {
      card.classList.remove("swipe-left");
      currentIndex++;
      showCard();
    }, 400);
  }
}