#!/usr/bin/python3
"""
Flask app that integrates with a RESTFul API
"""

from flask import Flask, render_template
from flask_cors import CORS
from views.app_views import app_views

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "0.0.0.0"}})
app.register_blueprint(app_views)


@app.errorhandler(404)
def page_not_found(e):
    """Return a custom 404 error"""
    return render_template('404.html'), 404


#

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", threaded=True, debug=True)
