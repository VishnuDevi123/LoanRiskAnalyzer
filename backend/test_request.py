import requests

url = 'http://127.0.0.1:5000/predict'

data = {
    "Age": 46,
    "Income": 84208,
    "LoanAmount": 129188,
    "CreditScore": 451,
    "MonthsEmployed": 26,
    "NumCreditLines": 3,
    "InterestRate": 21.17,
    "LoanTerm": 24,
    "DTIRatio": 0.31,
    "Education": 2,           # Master's
    "EmploymentType": 2,      # Unemployed
    "MaritalStatus": 1,       # Divorced
    "HasMortgage": 1,         # Yes
    "HasDependents": 1,       # Yes
    "LoanPurpose": 0,         # Auto
    "HasCoSigner": 0          # No
}

response = requests.post(url, json=data)
print("Prediction:", response.json())
