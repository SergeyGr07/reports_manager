document.addEventListener('DOMContentLoaded', function() {
    var modalBody = document.querySelector('.modal-body');
    var closeModalButton = document.getElementById('closeModal');

    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault(); 

        var rows = parseInt(document.getElementById('table_rows').value);
        var cols = parseInt(document.getElementById('table_cols').value);

        var table = document.createElement('table');
        table.className = 'table';

        var tbody = document.createElement('tbody');
        for (var i = 0; i < rows; i++) {
            var tr = document.createElement('tr');
            for (var j = 0; j < cols; j++) {
                var td = document.createElement('td');
                var input = document.createElement('input');
                input.type = 'text';
                input.className = 'form-control';
                if (i === 0 && j === 0) {    
                    td.classList.add('first-column', 'first-row');
                    input.value = 'position';
                    input.readOnly = true;
                } else if (i === 0) {
                    td.classList.add('first-row');
                } else if (j === 0) {
                    td.classList.add('first-column');
                    input.value = i.toString();
                    input.readOnly = true;
                }
                td.appendChild(input);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);

        modalBody.innerHTML = '';
        modalBody.appendChild(table);

        var modal = document.getElementById('exampleModal');
        modal.classList.add('show');
        modal.style.display = 'block';
    });

    document.getElementById('closeModal').addEventListener('click', function() {
        myModal.hide();
    });

    document.getElementById('saveChanges').addEventListener('click', function() {

        var modal = document.getElementById('exampleModal');
        modal.classList.remove('show');
        modal.style.display = 'none';
    });

    closeModalButton.addEventListener('click', function() {
        var modal = document.getElementById('exampleModal');
        modal.classList.remove('show');
        modal.style.display = 'none';
    });
});