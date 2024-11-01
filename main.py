from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ask-mirror', methods=['POST'])
def ask_mirror():
    question = request.json['question']
    # Here, you'd integrate the Gemini API to get the response
    response = f"The mirror says: {question[::-1]}"  # Sample response (reversed question)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
