function fixTable() {
  const iconsPrefix = '/theme/icons/';

  const table = document.querySelector('table');
  // Remove unnecesary columns.
  // Obtén la referencia a la fila de encabezado
  var headerRow = document.querySelector('thead').getElementsByTagName('tr')[0];
  // Elimina los dos últimos th
  for (var i = 0; i < 2; i++) {
    headerRow.removeChild(headerRow.lastElementChild);
  }
  // Elimina el estilo personalizado del primer th
  headerRow.getElementsByTagName('th')[0].removeAttribute('style');

  Array.from(document.getElementsByClassName("size")).forEach((cell) => {
    cell.remove();
  });

  Array.from(document.getElementsByClassName("date")).forEach((cell) => {
    cell.remove();
  });
  
  // Add the first column and put the image in it.
  const rows = Array.from(table.querySelectorAll('tr'));
  rows.forEach((row) => {
    const fileColumn = row.children[0];
    const iconColumn = document.createElement('td');
    iconColumn.className = 'img-wrap';
    iconColumn.style = "width: 1%";

    const target = row.children[0].children[0].getAttribute('href');
    const image = document.createElement('img');
    const targetExtension = target.split('.').pop().toLowerCase();
    imageSource = '';

  
    if (target.endsWith('/')) imageSource = iconsPrefix + 'file-directory.svg';
    else {
      switch(targetExtension) {
        case 'pdf':
          imageSource = iconsPrefix + 'file-pdf.svg';
          break;
        case 'zip':
          imageSource = iconsPrefix + 'file-zip.svg';
          break;
        case 'py':
          imageSource = iconsPrefix + 'file-code.svg';
          break;
        case 'txt':
          imageSource = iconsPrefix + 'file-text.svg';
          break;
        default:
          break;
      }
    }

      
    image.src = imageSource;
    iconColumn.appendChild(image);
    fileColumn.insertAdjacentElement('beforebegin', iconColumn);
  });
}

function addTitle() {
  let path = window.location.pathname.replace(/\/$/g, '');
  let titleText;
  const pathSplits = path.split('/');
  if (pathSplits.length > 1) {
    titleText = 'Exámenes de ' + decodeURIComponent(
      pathSplits[pathSplits.length - 1].replace(/-|_/g, ' ')
    );
  } else {
    titleText = 'Titulaciones';
  }
  const container = document.createElement('div');
  container.id = 'page-header';
  const h1 = document.createElement('h1');
  h1.appendChild(document.createTextNode(titleText));
  container.appendChild(h1);
  const header = document.querySelector('header');
  header.insertAdjacentElement('afterend', container);
}

document.addEventListener("DOMContentLoaded", function(event) {
  fixTable();
  addTitle();
});