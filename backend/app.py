from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import shap

app = Flask(__name__)
CORS(app)

# Load the trained model from file
model = joblib.load('model/loan_default_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        print("⚡️ /predict endpoint hit")
        print("Request content-type:", request.content_type)
        print("Raw request data:", request.data)

        input_data = request.get_json()
        print("Received data:", input_data)

        input_df = pd.DataFrame([input_data])
        
        # Convert categorical columns to numeric
        numeric_cols = ['Age', 'Income', 'LoanAmount', 'CreditScore', 'MonthsEmployed',
                        'NumCreditLines', 'InterestRate', 'LoanTerm', 'DTIRatio',
                        'Education', 'EmploymentType', 'MaritalStatus',
                        'HasMortgage', 'HasDependents', 'LoanPurpose', 'HasCoSigner']

        for col in numeric_cols:
            input_df[col] = pd.to_numeric(input_df[col], errors='coerce')

        input_df = input_df.dropna()
        print("Input DataFrame after conversion:")
        print(input_df)

        # Make prediction
        prediction = int(model.predict(input_df)[0])
        print("Prediction result:", prediction)

        # SHAP explanation
        explainer = shap.Explainer(model)
        shap_values = explainer(input_df)
        feature_contributions = dict(zip(input_df.columns.tolist(), shap_values.values[0].tolist()))
        print("SHAP contributions:", feature_contributions)

        return jsonify({
            'prediction': prediction,
            'shap_values': feature_contributions
        })

    except Exception as e:
        print("ERROR occurred:")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)