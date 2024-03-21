from flask import Flask
from routes import report
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.register_blueprint(report, url_prefix='/reports/')


@app.route('/')
def index():
    return 'Go to <a href="http://127.0.0.1:5000/reports">Report</a>'


if __name__ == '__main__':
    app.run()