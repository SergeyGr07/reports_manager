document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var rows = parseInt(document.getElementById('table_rows').value);
        var cols = parseInt(document.getElementById('table_cols').value);

        generateTable(rows, cols);
    });


    function generateTable(rows, cols) {
        var tableContainer = document.createElement('div');
        tableContainer.classList.add('table-responsive');

        var table = document.createElement('table');
        table.classList.add('table', 'table-bordered');

        var tbody = document.createElement('tbody');

  
        for (var i = 0; i < rows; i++) {
            var row = document.createElement('tr');
            for (var j = 0; j < cols; j++) {
                var cell = document.createElement('td');
                if (j === 0) {
                    if (i === 0) {
                        cell.textContent = 'Position';
                    } else {
                        cell.textContent = i;
                    }
                } else {
                    cell.setAttribute('contenteditable', 'true');
                }
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        }

        table.appendChild(tbody);
        tableContainer.appendChild(table);


        var oldTable = document.querySelector('.table-responsive');
        if (oldTable) {
            oldTable.parentNode.removeChild(oldTable);
        }
        form.parentNode.insertBefore(tableContainer, form.nextSibling);
    }
});
