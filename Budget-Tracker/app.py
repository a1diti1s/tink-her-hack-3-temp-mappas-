from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# Load restaurant data from JSON file
import json
with open('data/restaurants.json', 'r') as file:
    restaurants_data = json.load(file)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_restaurants', methods=['GET'])
def get_restaurants():
    location = request.args.get('location')
    filtered_restaurants = [restaurant for restaurant in restaurants_data['restaurants'] if location.lower() in restaurant['location'].lower()]
    return jsonify(filtered_restaurants)

@app.route('/calculate_cost', methods=['POST'])
def calculate_cost():
    selected_restaurants = request.json
    total_cost = 0
    for meal, restaurant_name in selected_restaurants.items():
        for restaurant in restaurants_data['restaurants']:
            if restaurant['name'] == restaurant_name:
                total_cost += restaurant['meal_prices'].get(meal)
                break
    return jsonify({"total_cost": total_cost})

if __name__ == '__main__':
    app.run(debug=True,port=5001)
