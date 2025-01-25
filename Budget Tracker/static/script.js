// Function to load restaurants based on location input
function loadRestaurants() {
  let location = document.getElementById('location').value;
  fetch(`/get_restaurants?location=${location}`)
      .then(response => response.json())
      .then(data => {
          if (data.length > 0) {
              document.getElementById('restaurant-section').style.display = 'block';
              populateRestaurantSelect(data);
          } else {
              alert("No restaurants found for this location.");
          }
      });
}

// Function to populate the restaurant dropdown for each meal
// Function to populate the restaurant dropdown for each meal with prices
function populateRestaurantSelect(restaurants) {
  const mealTypes = ['breakfast', 'lunch', 'dinner'];
  mealTypes.forEach(meal => {
      let select = document.getElementById(meal);
      select.innerHTML = ""; // Clear any previous options
      restaurants.forEach(restaurant => {
          let option = document.createElement('option');
          const price = restaurant.meal_prices[meal];
          option.value = restaurant.name;
          option.textContent = `${restaurant.name} - $${price}`;
          select.appendChild(option);
      });
  });
}


// Function to calculate the total cost based on selected restaurants
function calculateTotalCost() {
  let selectedRestaurants = {
      breakfast: document.getElementById('breakfast').value,
      lunch: document.getElementById('lunch').value,
      dinner: document.getElementById('dinner').value
  };

  fetch('/calculate_cost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedRestaurants)
  })
  .then(response => response.json())
  .then(data => {
      document.getElementById('total-cost').style.display = 'block';
      document.getElementById('cost').textContent = data.total_cost;
  });
}
