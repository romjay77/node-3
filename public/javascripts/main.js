var isShowDropDownLinkList = false;
var projectModal;

function init() {
    document.onclick = onClickInit;
    document.onscroll = onScrollInit;
    document.ontouchstart = onTouchStartInit;
    document.ontouchend = onTouchEndInit;
    document.onmousemove = onMouseMoveInit;
    if (validators) {
        validators();
    }
    scaleBackground();

    projectModal = new bootstrap.Modal(document.getElementById('projects'), { });
    document.getElementById('subscription-modal').addEventListener('hidden.bs.modal', clearForm);
}

function onClickInit(e) {
    drawDropDownMenu(false);
    if (e.target.nodeName === 'A' || hasClass(e.target, 'jump')) {
        if (e.target.nodeName === 'I') {
            jumpEffect(e.target.parentNode);
        } else {
            jumpEffect(e.target);
        }

        if (hasClass(e.target, 'ajax')) {
            e.preventDefault();
            smoothRedirect(e);
        }
    }

    if (hasClass(e.target, 'toggle-button')) {
        toggle();
        toggleClass(document.querySelector('.nav-mobile'), 'opened');
        return;
    } 
    if (hasClass(e.target, 'mobile-item')) {
        toggle();
        toggleClass(document.querySelector('.nav-mobile'), 'opened');
        return;
    }

    if (hasClass(e.target, 'dropdown')) {
        drawDropDownMenu(true, e);
    }

    if (e.target.id == 'submitter') {
        submit(e.target);
    }
    
    showProject(e);
}

function onTouchStartInit(e) {
    projectEffect(e);
}

function onTouchEndInit(e) {
    turnOffPrEffect();
}

function onMouseMoveInit(e) {
    projectEffect(e);
}

function onScrollInit(e) {
    parralaxBackground();
    showLinks();
}

var sacleBackgroundTimeout;
function scaleBackground() {
    let menu = document.getElementById('main-background');
    menu.classList.add('scale-background');
    sacleBackgroundTimeout = setTimeout(() => { menu.classList.remove('scale-background'); }, 3000);
}
function clearScaleBackground() {
    let menu = document.getElementById('main-background');
    menu.classList.remove('scale-background');
    clearTimeout(sacleBackgroundTimeout);
}

function toggle()
{
	toggleEffect('.nav-menu div.icon > a > div > span');
	toggleEffect('.fixed-menu div.icon > a > div > span');
}

function toggleEffect(selector)
{
	let array = Array.from(document.querySelectorAll(selector));
	if(array[0].getAttribute('class').includes('Open'))
	{
		array[0].classList.remove('spanfirstOpen');
		array[1].classList.remove('spanmidleOpen');
		array[2].classList.remove('spanlastOpen');
		array[0].classList.add('spanfirstClose');
		array[1].classList.add('spanmidleClose');
		array[2].classList.add('spanlastClose');
	} else 	{
		array[0].classList.remove('spanfirstClose');
		array[1].classList.remove('spanmidleClose');
		array[2].classList.remove('spanlastClose');
		array[0].classList.add('spanfirstOpen');
		array[1].classList.add('spanmidleOpen');
		array[2].classList.add('spanlastOpen');
	}
}

function jumpEffect(button) {
    button.classList.add('shadow');
	setTimeout(() => { button.classList.remove('shadow'); }, 400);
}

function parralaxBackground() {
	let scrolled = window.pageYOffset;
	let height = window.innerHeight;
	if(height -50 < scrolled) {
		swithMeny(true);
	} else {
		swithMeny(false);
	}
}

function showLinks() {
    let box = document.getElementById('fixed-links');
    let scrolled = window.pageYOffset;
	let height = window.innerHeight;
	if(height -50 < scrolled) {
		box.classList.add('fixed-show-box');
	} else {
		box.classList.remove('fixed-show-box');
	}
}

function swithMeny(on) {
	let menu = document.querySelector('.fixed-menu');
	if(on && !hasClass(menu, 'show-menu')) {
        menu.classList.add('show-menu');
	} else if(!on && hasClass(menu, 'show-menu')) {
        menu.classList.remove('show-menu');
    }
}

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

function drawDropDownMenu(isShow, e) {
    let menu = document.getElementById('link-dropdown');
    if (isShow) {
        let left =  e.clientX - 115 < 0 ? 
            10 : e.clientX + 125 > window.innerWidth ?
            window.innerWidth - 250 : e.clientX - 115;

        let top =  e.clientY - 70 < 50 ? e.clientY + 20 + window.pageYOffset : e.clientY - 70 + window.pageYOffset

        menu.style.top = top + 'px';
        menu.style.left = left + 'px';
        menu.classList.add('show');
    } else {
        menu.classList.remove('show');
    }
}

var lastEffectedProject;
var isSetted;
function projectEffect(e) {
    if (!hasClass(e.target, 'pr-effect')) {
        turnOffPrEffect();
        return;
    }
    if (isSetted) return;
    isSetted = true;

    let target = e.target;
    while (!hasClass(target, 'project')) {
        target = target.parentElement;
    }
    toggleClass(target, 'shadow-lg');
    target.children[1].style.opacity = '0.4';
    target.children[0].style.opacity = '1';
    if (target.children[2]) {
        target.children[2].style.opacity = '1';
    }
    target.children[1].children[0].style.transform = 'scale(1.3)';
    lastEffectedProject = target;
}

function turnOffPrEffect(target) {
    let curTarget = target ? target : lastEffectedProject ? lastEffectedProject : null;
    if (!curTarget) return;

    toggleClass(curTarget, 'shadow-lg');
    curTarget.children[1].style.opacity = '1';
    curTarget.children[0].style.opacity = '0.6';
    if (curTarget.children[2]) {
        curTarget.children[2].style.opacity = '0';
    }
    curTarget.children[1].children[0].style.transform = 'scale(1)';
    lastEffectedProject = null;
    isSetted = false;
}

async function smoothRedirect(e) {
    e.stopPropagation();
    e.preventDefault();

    let pathname = document.location.pathname;
    let newPathname = e.target.getAttribute('href');
    if (pathname === newPathname || (pathname === '/' && newPathname === '/index')) return;
    window.history.pushState({}, null, newPathname);

    let response = await fetch(`${ newPathname }-ajax`);
    let html = await response.text();
    document.getElementById('main-container').innerHTML = html;

    let background = document.getElementById('main-background');    
    let oldClass = pathname === '/' ? 'index' : pathname.slice(1);
    background.classList.remove(oldClass);
    background.classList.add(newPathname.slice(1));

    clearScaleBackground();
    setTimeout(() => { scaleBackground(); }, 100);
    window.scroll(0, 0);
}

async function showProject(e) {
    if (!hasClass(e.target, 'pr-effect')) {
        return;
    }
    e.stopPropagation();
    e.preventDefault();

    let target = e.target;
    while (!hasClass(target, 'project')) {
        target = target.parentElement;
    }

    let response = await fetch(`/current-projects-ajax?name=${ target.dataset["name"] }`);
    let html = await response.text();
    document.getElementById('project-modal-content').innerHTML = html;
    projectModal.toggle();
}