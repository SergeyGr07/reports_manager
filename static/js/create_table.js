document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById('ticketForm');
    var currentUrl = window.location.origin;
    var exportUrl = currentUrl + '/reports/select_detail';
    var putDataUrl = currentUrl + '/reports/put_data';
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        var selectedDetail = document.getElementById('ticket_type').value;
        
        fetch(exportUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                detail: selectedDetail
            })
        })
        .then(response => response.json())
        .then(data => {
            var rows = data.row;
            var cols = data.col;
            console.log(rows, cols)

            generateTable(rows, cols);
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
    });

    function generateTable(rows, cols) {
        var modalBody = document.getElementById('tableBody');
        var selectedDetail = document.getElementById('ticket_type').value;
        var table = document.createElement('table');
        table.classList.add('table', 'table-bordered');

        var tbody = document.createElement('tbody');

        for (var i = 0; i < rows; i++) {
            var row = document.createElement('tr');
            for (var j = 0; j < cols; j++) {
                var cell = document.createElement('td');
                if (i === 0) {
                    switch (j) {
                        case 0:
                            cell.textContent = 'Position';
                            break;
                        case 1:
                            cell.textContent = 'Nominal';
                            break;
                        case 2:
                            cell.textContent = 'Measurements';
                            break;
                        default:
                            cell.textContent = '';
                            break;
                    }
                } else {
                    if (j === 0) {
                        cell.textContent = i;
                    } else {
                        cell.setAttribute('contenteditable', 'true');
                    }
                }
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        }

        table.appendChild(tbody);
        modalBody.innerHTML = '';
        modalBody.appendChild(table);

        var modal = new bootstrap.Modal(document.getElementById('tableModal'));
        modal.show();

        var saveButton = document.getElementById('saveButton');
        saveButton.addEventListener('click', function() {
            var tableName = document.getElementById('ticket_title').value;
            // console.log(tableName)
            var tableData = [];
            var tbody = document.querySelector('table tbody');

            tbody.querySelectorAll('tr').forEach(function(row) {
            var rowData = [];
            row.querySelectorAll('td').forEach(function(cell, index) {
                if (row.rowIndex !== 0 && index !== 0) {
                    var cellData = cell.textContent.split(',').map(function(item) {
                        return item.trim(); // Удаляем пробелы в начале и конце каждого элемента
                    });
                    rowData.push(cellData);
                } else {
                    rowData.push(cell.textContent);
                }
            });
                tableData.push(rowData);
            });
            console.log(selectedDetail)
            var dataToSend = {
                [tableName]: {
                    [selectedDetail]: tableData
                }
            };
            
            console.log(dataToSend);

            fetch(putDataUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            })
            .then(response => {
                if (response.ok) {
                    alert('Данные успешно сохранены!');
                } else {
                    throw new Error('Произошла ошибка при сохранении данных');
                }
            })
            .catch(error => {
                console.error('Ошибка при сохранении данных:', error);
            });

            modal.hide();
            window.location.reload();
        });

        var closeButton = document.querySelector('.btn-close');
        closeButton.addEventListener('click', function () {
            modal.hide();
        });
    }
});
