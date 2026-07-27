import fitz
import os

pdf_path = "powermetz products.pdf"
output_dir = "public/images/products"
os.makedirs(output_dir, exist_ok=True)

try:
    doc = fitz.open(pdf_path)
    count = 0
    for i in range(len(doc)):
        for img in doc.get_page_images(i):
            xref = img[0]
            pix = fitz.Pixmap(doc, xref)
            if pix.n - pix.alpha > 3:
                pix = fitz.Pixmap(fitz.csRGB, pix)
            pix.save(f"{output_dir}/page_{i+1}_img_{count}.png")
            pix = None
            count += 1
    print(f"Extraction complete. Extracted {count} images.")
except Exception as e:
    print(f"Error: {e}")
