class Meal {
  constructor(name,calories) {
    this.id = Math.random().toString(16).slice(2)
    this.calories = calories
    this.name = name
}
}

class Workout {
  constructor(name,calories) {
    this.id = Math.random().toString(16).slice(2)
    this.calories = calories
    this.name = name
}
}

export {
  Meal,
  Workout
}