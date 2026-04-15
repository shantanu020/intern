import zipfile
import xml.etree.ElementTree as ET
import sys

def extract_text(filepath):
    try:
        z = zipfile.ZipFile(filepath)
        root = ET.fromstring(z.read('word/document.xml'))
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        
        with open('docx_output_full.txt', 'w', encoding='utf-8') as f:
            for p in root.findall('.//w:p', ns):
                text = "".join(node.text for node in p.findall('.//w:t', ns) if node.text)
                if text:
                    f.write(text + '\n')
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    extract_text('InternConnect_PRD_v1.0.docx')
