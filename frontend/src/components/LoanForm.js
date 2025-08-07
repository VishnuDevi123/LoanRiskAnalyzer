import React, { useState } from "react";

import SHAPBarChart from "./SHAPBarChart";

// LoanForm component for collecting user input and displaying predictions
const LoanForm = () => {
  const [formData, setFormData] = useState({
    Age: "",
    Income: "",
    LoanAmount: "",
    CreditScore: "",
    MonthsEmployed: "",
    NumCreditLines: "",
    InterestRate: "",
    LoanTerm: "",
    DTIRatio: "",
    Education: "",
    EmploymentType: "",
    MaritalStatus: "",
    HasMortgage: "",
    HasDependents: "",
    LoanPurpose: "",
    HasCoSigner: ""
  });

  // State for prediction and SHAP values
    const [prediction, setPrediction] = useState("");
    const [shapValues, setShapValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false); 

  // Options for dropdowns
  // These options can be modified based on your requirements

  const educationOptions = ["High School", "Bachelor's Degree", "Master's Degree"];
  const employmentOptions = ["Full-time", "Unemployed"];
  const maritalStatusOptions = ["Single", "Married", "Divorced"];
  const loanPurposeOptions = ["Other", "Business", "Education", "Home"];

  // Function to validate each field
  // This function checks if the input is valid and returns an error message if not
  const validateField = (name, value) => {
    const num = parseFloat(value);
    if (value === "") return "Required";

    switch (name) {
      case "Age":
        if (num < 18 || num > 100) return "Age must be between 18 and 100";
        break;
      case "CreditScore":
        if (num < 300 || num > 850) return "Credit score must be between 300 and 850";
        break;
      case "InterestRate":
        if (num < 0 || num > 100) return "Interest rate must be realistic (0–100%)";
        break;
      case "DTIRatio":
        if (num < 0 || num > 1) return "DTI Ratio must be between 0 and 1";
        break;
      default:
        if (isNaN(num)) return "Must be a number";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    for (const field in formData) {
        const error = validateField(field, formData[field]);
        if (error) newErrors[field] = error;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert("Please fix the errors in the form.");
        return;
    }
    // Validate all fields
    setIsLoading(true);
    try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
    
        const result = await response.json();
    
        if (result.error) {
          alert("Server Error: " + result.error);
        } else {
          setPrediction(result.prediction === 1 ? "High Risk (Likely to Default)" : "Low Risk (Likely to Repay)");
          setShapValues(result.shap_values || {});
        }
    
      } catch (error) {
        console.error("Error fetching prediction:", error);
        alert("An error occurred while fetching prediction.");
      } finally {
        setIsLoading(false); 
      }
    };

  // Render the form and prediction result
  return (
    <div  style={{ fontFamily: "Inter, sans-serif", padding: "40px 20px", background: "linear-gradient(to right, #eef2f3, #8e9eab)", minHeight: "100vh" }}>
    {/* Header */}
    <div style={{ backgroundColor: "#004080", color: "white", padding: "20px", textAlign: "center", borderRadius: "8px" }}>
      <h1>Loan Risk Analyzer</h1>
      <p>Predict if a borrower is likely to default</p>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit} style={{ maxWidth: "700px", margin: "30px auto" }}>
      {/* Card Wrapper */}
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        
        <fieldset style={{ border: "none" }}>
          <legend><strong>Personal Information</strong></legend>
          {["Age", "Income", "CreditScore", "MonthsEmployed", "NumCreditLines"].map((key) => (
            <div key={key} style={{ marginBottom: "10px" }}>
              <label>{key}: </label>
              <input
                type="number"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                step="any"
                placeholder={`Enter ${key}`}
                style={{
                    width: "40%",
                    padding: "12px 16px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                    outline: "none",
                    boxShadow: "inset 0 0 0 0 transparent"
                }}
                onFocus={(e) => e.target.style.boxShadow = "0 0 0 2px #3b82f6"}
                onBlur={(e) => e.target.style.boxShadow = "inset 0 0 0 0 transparent"}
              />
              {errors[key] && <div style={{ color: "red" }}>{errors[key]}</div>}
            </div>
          ))}
        </fieldset>

        <fieldset style={{ border: "none", marginTop: "20px" }}>
          <legend><strong>Loan Information</strong></legend>
          {["LoanAmount", "InterestRate", "LoanTerm", "DTIRatio"].map((key) => (
            <div key={key} style={{ marginBottom: "10px" }}>
              <label>{key}: </label>
              <input
                type="number"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                step="any"
                placeholder={`Enter ${key}`}
                style={{
                    width: "40%",
                    padding: "12px 16px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                    outline: "none",
                    boxShadow: "inset 0 0 0 0 transparent"
                }}
                onFocus={(e) => e.target.style.boxShadow = "0 0 0 2px #3b82f6"}
                onBlur={(e) => e.target.style.boxShadow = "inset 0 0 0 0 transparent"}
              />
              {errors[key] && <div style={{ color: "red" }}>{errors[key]}</div>}
            </div>
          ))}
        </fieldset>

        <fieldset style={{ border: "none", marginTop: "20px" }}>
          <legend><strong>Additional Information</strong></legend>

          <div style={{ marginBottom: "10px" }}>
            <label>Education: </label>
            <select name="Education" value={formData.Education} onChange={handleChange}>
              <option value="">Select</option>
              {educationOptions.map((option, idx) => (
                <option key={idx} value={idx}>{option}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Employment Type: </label>
            <select name="EmploymentType" value={formData.EmploymentType} onChange={handleChange}>
              <option value="">Select</option>
              {employmentOptions.map((option, idx) => (
                <option key={idx} value={idx}>{option}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Marital Status: </label>
            <select name="MaritalStatus" value={formData.MaritalStatus} onChange={handleChange}>
              <option value="">Select</option>
              {maritalStatusOptions.map((option, idx) => (
                <option key={idx} value={idx}>{option}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Loan Purpose: </label>
            <select name="LoanPurpose" value={formData.LoanPurpose} onChange={handleChange}>
              <option value="">Select</option>
              {loanPurposeOptions.map((option, idx) => (
                <option key={idx} value={idx}>{option}</option>
              ))}
            </select>
          </div>

          {["HasMortgage", "HasDependents", "HasCoSigner"].map((key) => (
            <div key={key} style={{ marginBottom: "10px" }}>
              <label>{key.replace("Has", "Has ")}: </label>
              <select name={key} value={formData[key]} onChange={handleChange}>
                <option value="">Select</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
          ))}
        </fieldset>

        <button type="submit" disabled={isLoading} style={{
          marginTop: "20px",
          backgroundColor: "#004080",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: isLoading ? "not-allowed" : "pointer"
        }}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>

    {/* Prediction Result */}
    {prediction && (
        <div style={{
            maxWidth: "700px",
            margin: "0 auto",
            backgroundColor: prediction.includes("High Risk") ? "#ffe6e6" : "#e6ffea",
            color: prediction.includes("High Risk") ? "#cc0000" : "#006600",
            border: `2px solid ${prediction.includes("High Risk") ? "#cc0000" : "#00cc66"}`,
            borderRadius: "8px",
            padding: "20px",
            marginTop: "20px",
            fontWeight: "bold",
            textAlign: "center"
        }}>
            Prediction: {prediction}
        </div>
    )}

    {Object.keys(shapValues).length > 0 && (
        <div style={{
            maxWidth: "700px",
            margin: "20px auto",
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            textAlign: "center"
        }}>
            <h3>SHAP Feature Contributions</h3>
            <p style={{ fontSize: "0.9em", color: "#555" }}>
              {/* SHAP values provide insights into how each feature contributes to the prediction.*/}
                SHAP (SHapley Additive exPlanations) values explain the impact of each feature on the prediction. 
                Positive values pushes the prediction towards HIGH RISK, while negative values pushes towards LOW RISK.
            </p>
            <SHAPBarChart shapValues={shapValues} />
        </div>
    )}
    <footer style={{ marginTop: "50px", textAlign: "center", fontSize: "0.9em", color: "#777" }}>
      © {new Date().getFullYear()} Loan Risk Analyzer. All rights reserved.
    </footer>
  </div>
);
};
    

export default LoanForm;
