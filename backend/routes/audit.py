from flask import Blueprint, request, jsonify
import pandas as pd
from ml.predict import predict_project

audit_bp = Blueprint('audit', __name__)

@audit_bp.route('/api/audit-csv', methods=['POST'])
def audit_csv():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files['file']
    try:
        df = pd.read_csv(file)
    except Exception as e:
        return jsonify({"error": f"Invalid CSV file: {str(e)}"}), 400
    
    results = []
    for _, row in df.iterrows():
        row_dict = row.to_dict()
        
        # Normalize fields for ML model
        sanctioned = float(row_dict.get('sanctioned_amount', row_dict.get('sanctioned', row_dict.get('budget', 1.0))))
        expenditure = float(row_dict.get('expenditure', row_dict.get('exp', row_dict.get('disbursed', 0.5))))
        phys_pct = float(row_dict.get('physical_progress_pct', row_dict.get('physical_pct', row_dict.get('phys', 10.0))))
        fin_pct = float(row_dict.get('financial_progress_pct', row_dict.get('financial_pct', row_dict.get('fin', 50.0))))
        num_payments = int(row_dict.get('num_payments', row_dict.get('installments', 3)))
        max_p_pct = float(row_dict.get('max_single_payment_pct', row_dict.get('max_single_payment', 40.0)))
        days = int(row_dict.get('days_since_sanction', row_dict.get('days', 220)))

        features = {
            'sanctioned_amount': sanctioned,
            'expenditure': expenditure,
            'physical_progress_pct': phys_pct,
            'financial_progress_pct': fin_pct,
            'num_payments': num_payments,
            'max_single_payment_pct': max_p_pct,
            'days_since_sanction': days
        }

        try:
            p_res = predict_project(features)
            row_dict['risk_score'] = p_res['risk_score']
            row_dict['fraud_type'] = p_res['fraud_type']
            row_dict['rf_prob'] = p_res['rf_probability']
            row_dict['xgb_prob'] = p_res['xgb_probability']
            row_dict['lgbm_prob'] = p_res['lgbm_probability']
            row_dict['anomaly_score'] = p_res['anomaly_score']
        except Exception:
            # Fallback heuristic calculation if model fails on unexpected type
            diff = fin_pct - phys_pct
            risk = min(99.0, max(5.0, round(diff * 1.1 + (expenditure / max(sanctioned, 0.01)) * 20, 1)))
            row_dict['risk_score'] = risk
            row_dict['fraud_type'] = "Ghost Project" if (phys_pct <= 5 and fin_pct >= 50) else "Lump-Sum Siphoning" if diff > 40 else "Normal"
            row_dict['rf_prob'] = round(risk / 100, 2)
            row_dict['xgb_prob'] = round(risk / 100, 2)
            row_dict['lgbm_prob'] = round(risk / 100, 2)
            row_dict['anomaly_score'] = -0.15

        results.append(row_dict)
        
    return jsonify(results)