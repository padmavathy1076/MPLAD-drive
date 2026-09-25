from flask import Blueprint, jsonify
import json

analytics_bp = Blueprint('analytics', __name__)

@analytics_bp.route('/api/model-stats', methods=['GET'])
def get_stats():
    with open('data/model_stats.json') as f:
        stats = json.load(f)
    return jsonify(stats)