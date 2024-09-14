class Storage {

  static getCalorielimit(defaultLimit = 2000) {
     let calorieLimit;
     if (localStorage.getItem('calorieLimit') === null) {
       calorieLimit = defaultLimit
     } else {
       calorieLimit = parseFloat(localStorage.getItem('calorieLimit'))
     }
     return calorieLimit
     
   }
 
  static setCalorieLimit(calorieLimit) {
     localStorage.setItem('calorieLimit', calorieLimit)
   }
 
   // Update Total Calories
   static getTotalCalories(defaultCalorie = 0) {
     let totalCalorie;
     if (localStorage.getItem('totalCalorie') === null) {
       totalCalorie = defaultCalorie
     } else {
       totalCalorie = +localStorage.getItem('totalCalorie')
     }
     return totalCalorie
   }
 
   static updateTotalCalorie(totalCalorie) {
     localStorage.setItem('totalCalorie', totalCalorie)
   }
 
   // save Meal
 
   static getMeals() {
     let meals;
     if (localStorage.getItem('meals') === null) {
       meals = []
     } else {
       meals = JSON.parse(localStorage.getItem('meals'))
     } 
     return meals
   }
 
   static saveMeals(meal) {
     const meals = Storage.getMeals()
     meals.push(meal)
     localStorage.setItem('meals', JSON.stringify(meals))
   }
 
   // Remove Meal
   static removeMeal(id) {
     const meals = Storage.getMeals();
     meals.forEach((meal, index) => {
       if (meal.id === id) {
         meals.splice(index, 1);
       }
     });
     localStorage.setItem('meals', JSON.stringify(meals));
   }
 
   static getWorkouts() {
     let workouts;
     if (localStorage.getItem('workouts') === null) {
       workouts = []
     } else {
       workouts = JSON.parse(localStorage.getItem('workouts'))
     } 
     return workouts
   }
 
   static saveWorkouts(workout) {
     const workouts = Storage.getWorkouts()
     workouts.push(workout)
     localStorage.setItem('workouts', JSON.stringify(workouts))
   }
 
   // Remove Meal
   static removeWorkout(id) {
     const workouts = Storage.getWorkouts();
     workouts.forEach((workout, index) => {
       if (workout.id === id) {
         workouts.splice(index, 1);
       }
     });
     localStorage.setItem('workouts', JSON.stringify(workouts));
   }
 
   static clearAll() {
     localStorage.removeItem('totalCalorie')
     localStorage.removeItem('workouts')
     localStorage.removeItem('meals')
   }
 
}
 
export default Storage