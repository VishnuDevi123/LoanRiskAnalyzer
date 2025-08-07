
# Loan Default Risk Prediction Platform

A full-stack machine learning web application that predicts the risk of loan default based on user input. The system leverages a trained classification model with SHAP explainability, integrated into a React + Flask application.

---

# Features

- Predicts loan default risk using real-world financial attributes.
- Multi-step modern form for clean user interaction.
- SHAP bar chart explanations showing feature impact on prediction.
- Input validation with detailed feedback.
- Model trained using structured data with pre-processing and feature engineering.
- Modular frontend components for clarity and scalability.

---

# Tech Stack

### Frontend
- React.js
- CSS (with modern UI styling)
- Modular multi-step form structure

### Backend
- Flask (Python)
- Scikit-learn
- SHAP for explainability
- NumPy, Pandas for preprocessing

### Deployment (optional)
- Flask server running locally
- Frontend served via Vite or React Scripts
- Future-ready for deployment on AWS or Heroku

---

## Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/loan-risk-predictor.git
cd loan-risk-predictor

	2.	Set up Python backend

cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py

	3.	Set up React frontend

cd frontend
npm install
npm start

The app should now be running at http://localhost:3000

Sample Input Features
	•	Age
	•	Income
	•	Loan Amount
	•	Credit Score
	•	Months Employed
	•	Number of Credit Lines
	•	Interest Rate
	•	DTI Ratio
	•	Education Level
	•	Marital Status
	•	Employment Type
	•	Loan Purpose
	•	Has Co-signer / Mortgage / Dependents

Example Prediction Output
	•	Low Risk (Likely to Repay) or High Risk (Likely to Default)
	•	SHAP bar chart with feature contributions visualized


Did not focus more on the frontend part , this project was done just out of curiosity