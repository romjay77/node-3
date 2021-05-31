var imgExt = ['JPEG', 'JPG', 'PNG', 'GIF', 'SVG']
var videoExt = ['MP4', 'M4P', 'M4V', 'MPG', 'MPEG', 'MPV', 'MP2', 'AVI', 'WMV']
var modal;

function init() {
    document.onclick = onClickInit;
    document.onchange = onChangeInit;
    modal = new bootstrap.Modal(document.getElementById('warning-modal'), { });
    document.getElementById('add-project-form').onsubmit = verifyAddProjectForm;
    document.getElementById('add-design-project-form').onsubmit = verifyAddDesignProjectForm;
}

function onClickInit(e) {
    editCread(e);
    addProject(e);
    addDesignProject(e);
}

function onChangeInit(e) {
    onChangedAddProjectForm(e);
    onChangedAddDesignProjectForm(e);
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

function disableSubmit(id) {
    let btn = document.getElementById(id);

    btn.setAttribute('disabled', 'disabled')

    btn.classList.remove('btn-outline-success');
    btn.classList.add('btn-outline-secondary');
}

function addProject(e) {
    if(e.target.id !== 'add-project') return;
    let form = document.getElementById('add-project-form');
    form.classList.remove('hid');
}

function addDesignProject(e) {
    if(e.target.id !== 'add-design-project') return;
    let form = document.getElementById('add-design-project-form');
    form.classList.remove('hid');
}

function onChangedAddProjectForm(e) {
    if (!hasClass(e.target, 'add-project')) return;

    verifyAddProjectForm();
}

function verifyAddProjectForm() {
    let inputs = Array.from(document.querySelectorAll('.add-project'));
    let isValid = true;
    let hasCorrectPh = true;
    let hasCorrectVd = true;
    let hasFiles = false;
    inputs.forEach(input => {
        if(input.type === 'file') {
            hasFiles = hasFiles ? hasFiles : input.files.length > 0;
            if (input.id === 'photos') {
                hasCorrectPh = Array.from(input.files).every(x => extChecker(x, imgExt))                
            } else if (input.id === 'videos') {
                hasCorrectVd = Array.from(input.files).every(x => extChecker(x, videoExt))    
            }
        }
    });
    isValid = inputs.every(x => x.type === 'file' || x.value !== '');

    let result = hasFiles && isValid && hasCorrectPh && hasCorrectVd;
    if (result) {
        activeSubmit('submmit-project')
    } else {
        disableSubmit('submmit-project')
        if (hasFiles && (!hasCorrectPh || !hasCorrectVd)) {
            modal.toggle();
        }
    }

    return result;
}

function verifyAddDesignProjectForm() {
    let inputs = Array.from(document.querySelectorAll('.add-design-project'));
    let isValid = true;
    let hasCorrectPh = true;
    let hasCorrectVd = true;
    let hasFiles = false;
    inputs.forEach(input => {
        if(input.type === 'file') {
            hasFiles = hasFiles ? hasFiles : input.files.length > 0;
            if (input.id === 'photos-design') {
                hasCorrectPh = Array.from(input.files).every(x => extChecker(x, imgExt))                
            } else if (input.id === 'videos-design') {
                hasCorrectVd = Array.from(input.files).every(x => extChecker(x, videoExt))    
            }
        }
    });
    isValid = inputs.every(x => x.type === 'file' || x.value !== '');

    let result = hasFiles && isValid && hasCorrectPh && hasCorrectVd;
    if (result) {
        activeSubmit('submmit-design-project')
    } else {
        disableSubmit('submmit-design-project')
        if (hasFiles && (!hasCorrectPh || !hasCorrectVd)) {
            modal.toggle();
        }
    }

    return result;
}

function onChangedAddDesignProjectForm(e) {
    if (!hasClass(e.target, 'add-design-project')) return;

    verifyAddDesignProjectForm();
}

function hasClass(item, name) {
    return item.classList.contains(name);
}

function extChecker(file, extensions) {
    let ext = file.name.split('.').pop().toUpperCase();
    return extensions.some(x => x === ext)
}