import re

REQUIRED_FIELDS = ["Patient_Name", "Patient_Dob_Sex", "Insured_ID", "Diagnosis_Nature_Of_Illness", "Total_Charges"]

def run_validation(fields: dict):
    issues = []

    # Required fields
    for f in REQUIRED_FIELDS:
        if not fields.get(f) or fields[f].strip() == "":
            issues.append({"field": f, "issue": "missing"})

    # Check DOB format
    dob = fields.get("Patient_Dob_Sex", "")
    if dob and not re.search(r"\d{2}[\/\-]\d{2}[\/\-]\d{2,4}", dob):
        issues.append({"field": "Patient_Dob_Sex", "issue": "invalid_date"})

    # Check Total Charges
    total = fields.get("Total_Charges", "")
    if total and not re.search(r"\d+(\.\d{2})?", total):
        issues.append({"field": "Total_Charges", "issue": "invalid_amount"})

    return issues
