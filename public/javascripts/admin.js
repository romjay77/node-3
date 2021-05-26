var videoExt = ['JPEG', 'JPG', 'PNG', 'GIF', 'SVG']
var imgExt = ['MP4', 'M4P', 'M4V', 'GIF', 'MPG', 'MPEG', 'MPV', 'MP2', 'AVI', 'WMV']
var modal;

function init() {
    document.onclick = onClickInit;
    document.onchange = onChangeInit;
    modal = new bootstrap.Modal(document.getElementById('warning-modal'), { });
}

function onClickInit(e) {
    editCread(e);
    addProject(e);
}

function onChangeInit(e) {
    onChangedAddProjectForm(e);
}

function editCread(e) {
    if (!hasClass(e.target, 'edit-cread')) return;
    let td = e.target.parentElement.previousElementSibling;
    td.firstChild.classList.add('hid');
    td.lastChild.classList.remove('hid');
    activeSubmit('save-cred');
}

function activeSubmit(id) {
    let btn = document.getElementById(id);
    if (!btn.getAttribute('disabled')) return;

    btn.removeAttribute('disabled');
    btn.classList.add('btn-outline-success');
    btn.classList.remove('btn-outline-secondary');
}

function addProject(e) {
    if(e.target.id !== 'add-project') return;
    let form = document.getElementById('add-project-form');
    form.classList.remove('hid');
}

function onChangedAddProjectForm(e) {
    if (!hasClass(e.target, 'add-project')) return;
    let inputs = Array.from(document.querySelectorAll('.add-project'));
    let isValid = true;
    let hasCorrectPh = true;
    let hasCorrectVd = true;
    let hasFiles = false;
    inputs.forEach(input => {
        if(input.type === 'file') {
            hasFiles = hasFiles ? hasFiles : input.files.length > 0;
            if (input.id === 'photos') {
                Array.from(input.files).forEach(file => {
                    let ext = file.name.split('.').pop();
                });                
            } else if (input.id === 'videos') {
                
            }
        } else {
            isValid = input.value !== '';
        }
    });
    // modal.toggle();
}

function hasClass(item, name) {
    return item.classList.contains(name);
}