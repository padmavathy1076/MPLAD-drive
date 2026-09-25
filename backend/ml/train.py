import pandas as pd
import numpy as np
import json
import joblib
import os
from sklearn.model_selection import train_test_split
from sklearn.ensemble import (
    RandomForestClassifier,
    IsolationForest,
    GradientBoostingClassifier,
    HistGradientBoostingClassifier
)
from sklearn.metrics import accuracy_score, f1_score, roc_auc_score

print("Loading dataset...")
df = pd.read_csv('data/mplads_dataset.csv')

# Define features
features = [
    'sanctioned_amount', 'expenditure', 'physical_progress_pct',
    'financial_progress_pct', 'num_payments', 'max_single_payment_pct',
    'days_since_sanction'
]
X = df[features]
y = df['is_fraud_label']

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print("Training Isolation Forest (Unsupervised Anomaly Detection)...")
if_model = IsolationForest(contamination=0.1, random_state=42)
if_model.fit(X)

print("Training Random Forest...")
rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)

print("Training XGBoost equivalent (Gradient Boosting)...")
xgb_model = GradientBoostingClassifier(n_estimators=100, random_state=42)
xgb_model.fit(X_train, y_train)

print("Training LightGBM equivalent (Hist Gradient Boosting)...")
lgbm_model = HistGradientBoostingClassifier(random_state=42)
lgbm_model.fit(X_train, y_train)

# Helper function to evaluate models
def evaluate(model, X_t, y_t):
    preds = model.predict(X_t)
    probs = model.predict_proba(X_t)[:, 1]
    return {
        "accuracy": round(float(accuracy_score(y_t, preds)), 3),
        "f1": round(float(f1_score(y_t, preds)), 3),
        "auc": round(float(roc_auc_score(y_t, probs)), 3)
    }

print("Evaluating models...")
stats = {
    "random_forest": evaluate(rf_model, X_test, y_test),
    "xgboost": evaluate(xgb_model, X_test, y_test),
    "lightgbm": evaluate(lgbm_model, X_test, y_test),
}

# Feature Importance
importance = xgb_model.feature_importances_
feat_imp = {features[i]: float(round(importance[i], 3)) for i in range(len(features))}
stats["feature_importance"] = dict(sorted(feat_imp.items(), key=lambda item: item[1], reverse=True))

# Risk Correlation
correlations = X.corrwith(y).to_dict()
stats["risk_correlation"] = {k: float(round(v, 3)) for k, v in correlations.items()}

# Save Models and Stats
print("Saving models...")
os.makedirs('ml/models', exist_ok=True)
joblib.dump(if_model, 'ml/models/if_model.pkl')
joblib.dump(rf_model, 'ml/models/rf_model.pkl')
joblib.dump(xgb_model, 'ml/models/xgb_model.pkl')
joblib.dump(lgbm_model, 'ml/models/lgbm_model.pkl')

with open('data/model_stats.json', 'w') as f:
    json.dump(stats, f, indent=4)

print("✅ All models trained and saved successfully!")