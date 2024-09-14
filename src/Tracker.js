import Storage from "./Storage";

class CalorieTracker {
  constructor() {
    this._calorieLimit = Storage.getCalorielimit();
    this._totalCalories = Storage.getTotalCalories()
    this._meals = Storage.getMeals()
      this._workouts = Storage.getWorkouts()
    this._displayCaloriesProgress()
  this._render()
   
  }

  addMeals(meal) {
    this._meals.push(meal)
    this._totalCalories += meal.calories
    Storage.updateTotalCalorie(this._totalCalories)
    Storage.saveMeals(meal)
    this._displayNewMeal(meal)
    this._render()
    
  }

  addWorkouts(workout) {
    this._workouts.push(workout)
    this._totalCalories -= workout.calories
    Storage.updateTotalCalorie(this._totalCalories)
    Storage.saveWorkouts(workout)
    this._displayNewWorkout(workout)
    this._render()
    
  }

  removeMeal(id) {
    const index = this._meals.findIndex((meal) => meal.id === id)
    const meal = this._meals[index]
    this._meals.splice(index, 1)
    this._totalCalories -= meal.calories
    Storage.updateTotalCalorie(this._totalCalories)
    Storage.removeMeal(id)
    this._render()
  }
  removeWorkout(id) {
    const index = this._workouts.findIndex((workout) => workout.id === id)
    const workout = this._workouts[index]
    this._workouts.splice(index, 1)
    this._totalCalories += workout.calories
    Storage.updateTotalCalorie(this._totalCalories)
    Storage.removeWorkout(id)
    this._render()
 

  }

  loadItems() {
    this._meals.forEach((meal) => this._displayNewMeal(meal))
    this._workouts.forEach((workout) => this._displayNewWorkout(workout))
    this._render()
  }

  reset() {
    this._calorieLimit = 2000;
    this._totalCalories = 0,
    this._meals = [],
      this._workouts = []
    Storage.clearAll()
    this._render()
  }

  limit(calorieLimit) {
    this._calorieLimit = calorieLimit
    Storage.setCalorieLimit(calorieLimit)
    this._displayCalorieLimits()
    this._render()
    
  }

  // Private method
  _displayCalorieLimits() {
    const calorieLimits = document.getElementById('calories-limit')
    calorieLimits.innerHTML = this._calorieLimit
  }
  _displayCalorieTotal() {
    const totalCalorie = document.getElementById('calories-total')
    
    totalCalorie.innerHTML = this._totalCalories
  }


  _displayCalorieConsumed() {
    const calorieConsumed = document.getElementById('calories-consumed')
    const consumed = this._meals.reduce((total, meal) => total + meal.calories, 0)
    calorieConsumed.innerHTML = consumed

  }
  _displayCalorieBurned() {
    const calorieBurned = document.getElementById('calories-burned')
    const burned = this._workouts.reduce((total, workout) => total + workout.calories, 0)
    calorieBurned.innerHTML = burned
  }
  _displayCalorieRemain() {
    const caloriesRemainingEl = document.getElementById('calories-remaining');
    const progressEl = document.getElementById('calorie-progress')
    const remaining = this._calorieLimit - this._totalCalories;
   

    caloriesRemainingEl.innerHTML = remaining;

  
    

    if (remaining <= 0) {
      caloriesRemainingEl.parentElement.classList.remove('bg-light')
      caloriesRemainingEl.parentElement.classList.add('bg-danger')
      progressEl.classList.add('bg-danger')
      progressEl.classList.remove('bg-success')
    } else {
       caloriesRemainingEl.parentElement.classList.add('bg-light')
      caloriesRemainingEl.parentElement.classList.remove('bg-danger')
       progressEl.classList.add('bg-success')
      progressEl.classList.remove('bg-danger')
    }
  }

  _displayCaloriesProgress() {
    const progressEl = document.getElementById('calorie-progress');
    const percentage = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(percentage, 100);
    progressEl.style.width = `${width}%`;
  }
  _displayNewMeal(meal) {
    const mealEls = document.getElementById('meal-items')
    const mealsEl = document.createElement('div')
    mealsEl.classList.add('card', 'my-2')
    mealsEl.setAttribute('data-id', meal.id)
    mealsEl.innerHTML = `
        <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${meal.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
    `

    mealEls.appendChild(mealsEl)
    
  }


  _displayNewWorkout(workout) {
    const workoutsEl = document.getElementById('workout-items');
    const workoutEl = document.createElement('div');
    workoutEl.classList.add('card', 'my-2');
    workoutEl.setAttribute('data-id', workout.id);
    workoutEl.innerHTML = `
    <div class="card-body">
      <div class="d-flex align-items-center justify-content-between">
        <h4 class="mx-1">${workout.name}</h4>
        <div class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5">
          ${workout.calories}
        </div>
        <button class="delete btn btn-danger btn-sm mx-2">
          <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
  </div>
    `;
    workoutsEl.appendChild(workoutEl);
  }
  
  _render() {
    this._displayCalorieLimits()
    this._displayCalorieConsumed()
    this._displayCalorieBurned()
    this._displayCalorieTotal()
    this._displayCalorieRemain()
    this._displayCaloriesProgress()
  
}

}

export default CalorieTracker
