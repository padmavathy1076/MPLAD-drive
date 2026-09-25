import joblib
import pandas as pd

models = {}

def load_models():
    global models
    if not models:
        models['if'] = joblib.load('ml/models/if_model.pkl')
        models['rf'] = joblib.load('ml/models/rf_model.pkl')
        models['xgb'] = joblib.load('ml/models/xgb_model.pkl')
        models['lgbm'] = joblib.load('ml/models/lgbm_model.pkl')

def predict_project(data):
    load_models()
    features = [
        'sanctioned_amount', 'expenditure', 'physical_progress_pct',
        'financial_progress_pct', 'num_payments', 'max_single_payment_pct',
        'days_since_sanction'
    ]
    
    df_input = pd.DataFrame([data])[features]

    rf_prob = float(models['rf'].predict_proba(df_input)[0][1])
    xgb_prob = float(models['xgb'].predict_proba(df_input)[0][1])
    lgbm_prob = float(models['lgbm'].predict_proba(df_input)[0][1])
    if_score = float(models['if'].score_samples(df_input)[0])

    avg_prob = (rf_prob + xgb_prob + lgbm_prob) / 3.0
    risk_score = round(avg_prob * 100, 1)

    phys = float(data.get('physical_progress_pct', 0))
    fin = float(data.get('financial_progress_pct', 0))
    exp = float(data.get('expenditure', 0))
    sanc = float(data.get('sanctioned_amount', 1))
    max_p = float(data.get('max_single_payment_pct', 0))

    if phys <= 5 and fin >= 50:
        archetype = "Ghost Project (High Financial, 0% Physical)"
    elif (fin - phys) > 40 or max_p >= 70:
        archetype = "Lump-Sum Siphoning Risk"
    elif exp > sanc:
        archetype = "Severe Cost Overrun"
    else:
        archetype = "Normal Execution Pattern"

    return {
        "risk_score": risk_score,
        "fraud_type": archetype,
        "anomaly_score": round(if_score, 3),
        "rf_probability": round(rf_prob, 3),
        "xgb_probability": round(xgb_prob, 3),
        "lgbm_probability": round(lgbm_prob, 3),
        "top_risk_factors": ["financial_progress_pct", "physical_progress_pct"] if risk_score > 50 else []
    }