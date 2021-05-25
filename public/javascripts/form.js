var validators = (() => {
	"use strict";
    var forms = document.querySelectorAll('.form.validate-form');
	var inputs = document.querySelectorAll('.validate-input');

    Array.from(inputs).forEach(input => {
        input.children[0].onfocus = onfocus;
    });

    Array.from(forms).forEach(form => {
        form.onsubmit = onsubmit;
    });

	function onsubmit(e) {
		let check = true;
        let inputs = Array.from(e.target.children).filter(x => x.className.indexOf('wrap-input validate-input') >= 0);
        inputs.forEach(input => {
            if (validate(input.children[0]) == false) {
                showValidate(input.children[0]);
				check = false;
            }
        });
		return check;
	}

	function onfocus(e) {
        hideValidate(e.target);
	};

	function validate(input) {
		if(input.getAttribute('type') == 'email' || input.getAttribute('name') == 'email') {
			if(input.value.trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
				return false;
			}
		}
		else {
			if(input.value.trim() == ''){
				return false;
			}
		}
	}

	function showValidate(input) {
		let thisAlert = input.parentNode;
        thisAlert.classList.add('alert-validate');
	}

	function hideValidate(input) {
        let thisAlert = input.parentNode;
        thisAlert.classList.remove('alert-validate');
	}
});

function submit(target) {
    try {
        let event = new SubmitEvent('submit', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        let form = target.parentNode.previousElementSibling.children[0].children[0];
        var isValid = form.dispatchEvent(event);
        if (isValid) {
            form.submit();
        }
    } catch (error) {
        return;
    }
}

function clearForm(e) {
    try {
        let target = e.target;
        let children = Array.from(target.children);
        while (children.length !== 0) {
            let poped = children.pop();
            if(poped.nodeName === 'FORM') {
                target = poped;
                break;
            }
            Array.from(poped.children).forEach(item => {
                children.push(item);
            });
        }        

        let inputs = Array.from(target.children).filter(x => x.className.indexOf('wrap-input validate-input') >= 0);
        inputs.forEach(input => {
            input.children[0].value = '';
            input.classList.remove('alert-validate');
        });
    } catch (error) {
        return;
    }
}