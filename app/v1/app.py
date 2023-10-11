#!/usr/bin/python3
"""
Flask app that integrates with a RESTFul API
"""

from flask import Flask, jsonify
from flask_cors import CORS
from app.v1.views import app_views

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "0.0.0.0"}})
app.register_blueprint(app_views)


@app.errorhandler(404)
def page_not_found(e):
    """Return a custom 404 error"""
    return jsonify({"error": "Not found"}), 404


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", threaded=True)
