from flask import Flask, jsonify
from flask_cors import CORS
from routes.projects import projects_bp
from routes.ml_predict import predict_bp
from routes.analytics import analytics_bp
from routes.audit import audit_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(projects_bp)
app.register_blueprint(predict_bp)
app.register_blueprint(analytics_bp)
app.register_blueprint(audit_bp)

@app.route('/api/health')
def health():
    return jsonify({"status": "ok", "message": "MPLADS Sentinel API running"})

if __name__ == '__main__':
    app.run(debug=True, port=5001)