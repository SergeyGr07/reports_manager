from loguru._logger import Core as _Core
from loguru._logger import Logger
import os
import sys
from docx import Document
# from docx.shared import Pt
from io import BytesIO

LOG_PATH = "./log"


def add_logger(logger_name: str, script_name: str):
    logger_name = Logger(
        core=_Core(),
        exception=None,
        depth=0,
        record=False,
        lazy=False,
        colors=False,
        raw=False,
        capture=True,
        patchers=[],
        extra={},
    )

    logger_name.add(f"{LOG_PATH}/{script_name}.log", level="DEBUG", rotation="9:00")
    logger_name.add(sys.stdout, level="DEBUG")
    return logger_name


script_name = os.path.splitext(os.path.basename(__file__))[0]
logger = add_logger(f'logger_{script_name}', script_name)


def fill_document():
    current_directory = os.path.dirname(os.path.abspath(__file__))
    doc_path = os.path.join(current_directory, 'report.docx')
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

    # Открыть существующий документ
    doc = Document("Template.docx")

    # Заменить заполнители на соответствующие значения
    for paragraph in doc.paragraphs:
        for key, value in data.items():
            if '{{' + key + '}}' in paragraph.text:
                paragraph.text = paragraph.text.replace('{{' + key + '}}', value)

    # Сохранить документ
    doc.save(doc_path)

    # Вернуть True, чтобы показать, что заполнение прошло успешно
    return True



print(fill_document())
