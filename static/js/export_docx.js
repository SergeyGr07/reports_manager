document.querySelector('#exportButton').addEventListener('click', function() {
    var currentUrl = window.location.origin;
    console.log(currentUrl)
    var exportUrl = currentUrl + '/excel_docx';
    console.log(exportUrl)

    fetch(exportUrl, {
        method: 'GET',
    })
    .then(response => response.blob())
    .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'report.docx';
        a.click();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});