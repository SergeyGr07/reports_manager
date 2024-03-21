from flask import Blueprint, jsonify, session, render_template
import folium
import traceback
import os
import requests
from config import add_logger

script_name = os.path.splitext(os.path.basename(__file__))[0]
logger = add_logger(f'logger_{script_name}', script_name)


report = Blueprint("reports", __name__)


@report.route('/')
def reports():
    return render_template('reports.html')