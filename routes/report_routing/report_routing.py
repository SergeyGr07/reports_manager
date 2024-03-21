from flask import Blueprint, render_template
import os
from config import add_logger
from flask import send_file
from docx import Document
from io import BytesIO
# from docx.shared import Inches
# from openpyxl import load_workbook


script_name = os.path.splitext(os.path.basename(__file__))[0]
logger = add_logger(f'logger_{script_name}', script_name)


report = Blueprint("reports", __name__)


@report.route('/')
def reports():
    return render_template('reports.html')


@report.route('/export_docx')
def fill_document():
    report_file = BytesIO()
    doc = Document("Template.docx")

    data = {
        'date': '21 марта 2024',
        'names': 'Налётов В.А, Петров П.П.',
        'name_machine': 'Оборудование X',
        'company': 'Компания ABC',
        'location': 'ул. Пушкина, д.10',
        'start_time': '10:00',
        'end_time': '12:00',
        'temp': '25',
    }

    data_pipe = {
        'Труба 1': {
            'nominal1': [356],
            'Measurements1': list(range(300, 311)),
            'Average1': [433],
            'Allowance1': ["что-то"],
            'Geometry1': ["что-то"]
        }
    }

    for paragraph in doc.paragraphs:
        for key, value in data.items():
            if '{{' + key + '}}' in paragraph.text:
                paragraph.text = paragraph.text.replace('{{' + key + '}}', value)
        for key, value in data_pipe.items():
            if '{{' + key + '}}' in paragraph.text:
                paragraph.text = paragraph.text.replace('{{' + key + '}}', value)

    # Замена плейсхолдеров в таблицах
    for table in doc.tables:
        for row in table.rows:
            for cell in row.cells:
                for name, pipe_data in data_pipe.items():
                    for key, value in pipe_data.items():
                        placeholder = '{{' + key + '}}'
                        if placeholder in cell.text:
                            cell.text = cell.text.replace(placeholder, ', '.join(map(str, value)))

    doc.save(report_file)
    report_file.seek(0)

    return send_file(report_file, as_attachment=True, download_name='report.docx', mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
