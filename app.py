from flask import Flask, render_template,request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')
    if query == 'Paris':
        return render_template('paris.html')
    if query == 'Romania':
        return render_template('romania.html')
    if query == 'New York':
        return render_template('new-york.html')
    # Add more conditions here for other places
    return render_template('index.html', error="No results found.")

if __name__ == '__main__':
    app.run(debug=True)

