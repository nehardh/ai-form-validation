import json
import pytesseract
from PIL import Image

# 👉 Point to Tesseract binary if PATH is not set
# pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def extract_fields(img_path: str, json_path: str) -> dict:
    # Load image
    img = Image.open(img_path).convert("RGB")

    # Load field definitions
    with open(json_path, "r") as f:
        boxes = json.load(f)

    extracted_data = {}
    for b in boxes:
        x, y, w, h = b["x"], b["y"], b["w"], b["h"]
        field_name = b["name"]

        # Crop region
        cropped = img.crop((x, y, x + w, y + h))

        # OCR on cropped field
        text = pytesseract.image_to_string(cropped, config="--psm 6").strip()
        extracted_data[field_name] = text

    return extracted_data


if __name__ == "__main__":
    import sys, json as js

    if len(sys.argv) < 3:
        print("Usage: python cms1500_extract_with_json.py <form_image> <form_fields.json>")
        sys.exit(1)

    img_path = sys.argv[1]
    json_path = sys.argv[2]

    result = extract_fields(img_path, json_path)

    print("\n📄 Extracted Data:")
    print(js.dumps(result, indent=2))
