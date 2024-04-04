function createTable() {
    var rows = document.getElementById('rowsInput').value;
    var cols = document.getElementById('colsInput').value;
    var table = '<table class="table"><thead><tr>';
    
    // Создаем заголовки столбцов
    for (var c = 0; c < cols; c++) {
        table += '<th></th>'; // Пустые заголовки столбцов
    }
    table += '</tr></thead><tbody>';
    
    // Создаем строки с пустыми ячейками для ввода
    for (var r = 0; r < rows; r++) {
        table += '<tr>';
        for (var c = 0; c < cols; c++) {
            table += '<td><input type="text" class="form-control"></td>';
        }
        table += '</tr>';
    }
    table += '</tbody></table>';

    var modalBody = document.querySelector('#tableModal .modal-body');
    modalBody.innerHTML = table;

    var tableModal = new bootstrap.Modal(document.getElementById('tableModal'));
    tableModal.show();
}
