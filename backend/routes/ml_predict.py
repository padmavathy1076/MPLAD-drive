from flask import Blueprint, request, jsonify
from ml.predict import predict_project

predict_bp = Blueprint('predict', __name__)

@predict_bp.route('/api/predict', methods=['POST'])
def predict():
    data = request.json
    result = predict_project(data)
    return jsonify(result)