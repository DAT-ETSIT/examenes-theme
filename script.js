{
  window.onload = function fixTable() {
    const table = document.querySelector('table');

    // Remove <hr>s
    Array.from(table.querySelectorAll('hr')).forEach(({ parentNode }) => {
      const row = parentNode.parentNode;
      row.parentNode.removeChild(row);
    });

    // Make a table head.
    const thead = document.createElement('thead');
    const firstRow = table.querySelector('tr');
    firstRow.parentNode.removeChild(firstRow);
    thead.appendChild(firstRow);
    table.insertBefore(thead, table.firstElementChild);

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
    });
  }


  window.onload = function addTitle() {
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
}