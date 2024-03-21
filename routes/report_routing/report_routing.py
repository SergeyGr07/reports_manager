from flask import Blueprint, render_template
# import folium
# import traceback
import os
# import requests
from config import add_logger
from flask import send_file
from docx import Document
# from docx.shared import Pt
from io import BytesIO


script_name = os.path.splitext(os.path.basename(__file__))[0]
logger = add_logger(f'logger_{script_name}', script_name)


report = Blueprint("reports", __name__)


@report.route('/')
def reports():
    return render_template('reports.html')


@report.route('/export_docx')
def fill_document():

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

    doc = Document("Template.docx")

    for paragraph in doc.paragraphs:
        for key, value in data.items():
            if '{{' + key + '}}' in paragraph.text:
                paragraph.text = paragraph.text.replace('{{' + key + '}}', value)

    report_file = BytesIO()
    doc.save(report_file)
    report_file.seek(0)

    return send_file(report_file, as_attachment=True, attachment_filename='report.docx')
