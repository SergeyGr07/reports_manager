from flask import Flask, render_template
from routes import report
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.register_blueprint(report, url_prefix='/reports/')
# app.register_blueprint(bot, url_prefix='/bots')


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True, threaded=True)
