from flask import Blueprint, jsonify
import pandas as pd

projects_bp = Blueprint('projects', __name__)

@projects_bp.route('/api/projects', methods=['GET'])
def get_projects():
    df = pd.read_csv('data/mplads_dataset.csv')
    return jsonify(df.to_dict(orient='records'))