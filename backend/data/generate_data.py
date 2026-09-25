import pandas as pd
import numpy as np
import os

np.random.seed(42)
n = 1000

states = ['Karnataka','Maharashtra','Bihar','Tamil Nadu',
          'Telangana','Punjab','West Bengal','Madhya Pradesh',
          'Rajasthan','Uttar Pradesh']

work_types = ['Road Construction','School Building','Water Supply Scheme',
              'Public Toilet Complex','Anganwadi Centre','Community Hall']

vendors = [f'VEND{str(i).zfill(3)}' for i in range(1, 80)]

def generate_row(fraud_type):
    state    = np.random.choice(states)
    district = state + '_D' + str(np.random.randint(1,6))
    wtype    = np.random.choice(work_types)
    vendor   = np.random.choice(vendors)
    sanctioned = round(np.random.uniform(0.5, 5.0), 2)   # Crores

    if fraud_type == 'normal':
        phys  = round(np.random.uniform(40, 95), 1)
        fin   = round(phys + np.random.uniform(-5, 5), 1)
        exp   = round(sanctioned * fin / 100, 2)
        nPay  = np.random.randint(3, 10)
        maxP  = round(np.random.uniform(15, 35), 1)
        days  = np.random.randint(180, 730)
        label = 0

    elif fraud_type == 'lump_sum':
        phys  = round(np.random.uniform(5, 25), 1)
        fin   = round(np.random.uniform(70, 99), 1)
        exp   = round(sanctioned * fin / 100, 2)
        nPay  = np.random.randint(1, 3)
        maxP  = round(np.random.uniform(70, 99), 1)
        days  = np.random.randint(30, 180)
        label = 1

    elif fraud_type == 'ghost':
        phys  = round(np.random.uniform(0, 5), 1)
        fin   = round(np.random.uniform(80, 99), 1)
        exp   = round(sanctioned * fin / 100, 2)
        nPay  = np.random.randint(1, 4)
        maxP  = round(np.random.uniform(60, 95), 1)
        days  = np.random.randint(60, 300)
        label = 1

    elif fraud_type == 'cost_overrun':
        phys  = round(np.random.uniform(30, 70), 1)
        fin   = round(np.random.uniform(95, 130), 1)
        exp   = round(sanctioned * fin / 100, 2)
        nPay  = np.random.randint(5, 15)
        maxP  = round(np.random.uniform(20, 50), 1)
        days  = np.random.randint(365, 900)
        label = 1

    risk = round(
        (fin - phys) * 0.4 +
        maxP * 0.3 +
        (1 - nPay/15) * 20 +
        np.random.uniform(0, 10), 1
    )
    risk = max(0, min(100, risk))

    return {
        'state': state, 'district': district,
        'work_type': wtype, 'vendor_id': vendor,
        'sanctioned_amount': sanctioned,
        'expenditure': exp,
        'physical_progress_pct': phys,
        'financial_progress_pct': fin,
        'num_payments': nPay,
        'max_single_payment_pct': maxP,
        'days_since_sanction': days,
        'risk_score': risk,
        'fraud_type': fraud_type,
        'is_fraud_label': label
    }

# 60% normal, 15% lump-sum, 15% ghost, 10% cost overrun
types = (['normal']*600 + ['lump_sum']*150 +
         ['ghost']*150 + ['cost_overrun']*100)
np.random.shuffle(types)

rows = [generate_row(t) for t in types]
df   = pd.DataFrame(rows)
df.insert(0, 'work_id', [f'WRK{str(i).zfill(4)}' for i in range(1, n+1)])
df.insert(1, 'work_name', df['work_type'] + ' - ' + df['district'])

os.makedirs('data', exist_ok=True)
df.to_csv('data/mplads_dataset.csv', index=False)
print(f"✅ Dataset created: {len(df)} rows")
print(df['fraud_type'].value_counts())