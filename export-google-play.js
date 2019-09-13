const _logStyle = 'background: #222; color: #bada55';

function log(message) {
    console.log('%c ' + message, _logStyle);
}

log('Please scroll through the playlist so that each album is visible once.\n' + 'Then double-click the page to export a spreadsheet.');

var headers = ['Artist,Title,Album'];
var albums = [...headers];

var fileName = 'export-google-play.csv';

var playlistTitleNode = document.querySelector('.info > .title > .title-text');
if (playlistTitleNode) {
    fileName = playlistTitleNode.innerText;
}

var addVisibleAlbums = function() {
    debugger
    [].forEach.call(document.querySelectorAll('.song-row'), function(e) {
        var albumNodes = [e.querySelector('td[data-col=\'artist\']'), e.querySelector('td[data-col=\'title\'] .column-content'), e.querySelector('td[data-col=\'album\']')];

        var albumString = albumNodes.map(function(s) {
            return s.innerText.trim().replace(/,/g, '');
        }).join(',');

        if (albums.indexOf(albumString) === -1) {
            albums.push(albumString);
            console.log('Added: ' + albumString)
        }
    });
}

var createCsv = function() {
    log('Download beginning!');

    var csv = '';
    albums.forEach(function(row) {
        csv += row + '\n';
    });

    var blob = new Blob([csv],{
        type: 'text/csv;charset=utf-8,%EF%BB%BF;'
    });

    var link = document.createElement("a");
    if (link.download !== undefined) {
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        albums=[...headers]
    }
}

document.body.addEventListener('DOMNodeInserted', addVisibleAlbums, false);
document.body.addEventListener('dblclick', createCsv, false);
