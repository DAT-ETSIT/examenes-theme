function fixTable() {
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
  
  /**
  // Remove the first column and put the image in the next.
  const rows = Array.from(table.querySelectorAll('tr'));
  rows.forEach((row) => {
    const iconColumn = row.children[0];
    const fileColumn = row.children[1];
    // Remove icon column.
    row.removeChild(iconColumn);
    const image = iconColumn.firstElementChild;
    if (!image) {
      return;
    }
    // Wrap icon in a div.img-wrap.
    const div = document.createElement('div');
    div.className = 'img-wrap';
    div.appendChild(image);
    // Insert icon before filename.
    fileColumn.insertBefore(div, fileColumn.firstElementChild);
  });*/
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

window.onload = function runOnLoad() {
  fixTable();
  addTitle();
}