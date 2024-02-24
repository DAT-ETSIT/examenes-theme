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
    fileColumn.classList.add("indexcolname");

    const iconColumn = document.createElement('td');
    iconColumn.className = 'img-wrap';
    iconColumn.style = "width: 1%";

    const target = row.children[0].children[0].getAttribute('href');
    const image = document.createElement('img');
    const targetExtension = target.split('.').pop().toLowerCase();
    imageSource = '';


    if (target == "../") imageSource = iconsPrefix + 'back.svg';
    else if (target.endsWith('/')) imageSource = iconsPrefix + 'file-directory.svg'; 
    else {
      switch (targetExtension) {
        case 'pdf':
          imageSource = iconsPrefix + 'file-pdf.svg';
          break;
        case 'docx':
          imageSource = iconsPrefix + 'file-word.svg';
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

    rows.map((row, index) => { if (index % 2 == 0) row.classList.add("even") });
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

function addSearch() {
  const input = document.createElement('input');
  input.type = 'search';
  input.id = 'search';
  input.setAttribute('placeholder', 'Buscar');
  document.getElementById('page-header').appendChild(input);

  const sortColumns = Array.from(document.querySelectorAll('thead a'));
  const nameColumns = Array.from(document.querySelectorAll('tbody .indexcolname'));
  const rows = nameColumns.map(({ parentNode }) => parentNode);
  const fileNames = nameColumns.map(({ textContent }) => textContent);

  function filter(value) {
    // Allow tabbing out of the search input and skipping the sort links
    // when there is a search value.
    sortColumns.forEach((link) => {
      if (value) {
        link.tabIndex = -1;
      } else {
        link.removeAttribute('tabIndex');
      }
    });

    // Test the input against the file/folder name.
    let even = false;
    fileNames.forEach((name, i) => {
      if (!value || name.toLowerCase().includes(value.toLowerCase())) {
        const className = even ? 'even' : '';
        rows[i].className = className;
        even = !even;
      } else {
        rows[i].className = 'hidden';
      }
    });
  }

  document.getElementById('search').addEventListener('input', ({ target }) => {
    filter(target.value);
  });

  filter('');
}

document.addEventListener("DOMContentLoaded", function (event) {
  fixTable();
  addTitle();
  addSearch();
});
