var videoExt = ['JPEG', 'JPG', 'PNG', 'GIF', 'SVG']
var imgExt = ['MP4', 'M4P', 'M4V', 'GIF', 'MPG', 'MPEG', 'MPV', 'MP2', 'AVI', 'WMV']

function init() {
    document.onclick = onClickInit;
}

function onClickInit(e) {
    editCread(e);
}

function editCread(e) {
    if (!hasClass(e.target, 'edit-cread')) return;
    let td = e.target.parentElement.previousElementSibling;
    td.firstChild.classList.add('hid');
    td.lastChild.classList.remove('hid');
    activeSubmit();
}

function activeSubmit() {
    let btn = document.getElementById('save-cred');
    if (!btn.getAttribute('disabled')) return;

    btn.removeAttribute('disabled');
    btn.classList.add('btn-outline-success');
    btn.classList.remove('btn-outline-secondary');
}

// $('#project > div > button:nth-child(1)').click((el) => {
// 	$('#addProj').removeClass('hid');
// 	$(el.currentTarget).addClass('hid');
// });

function hasClass(item, name) {
    return item.classList.contains(name);
}

function toggleClass(item, name) {
    if (!hasClass(item, name)) {
        item.classList.add(name);
    } else {
        item.classList.remove(name);
    }
}