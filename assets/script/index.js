/*Radio input menu*/
const mail = document.getElementById('email')
const tel = document.getElementById('telefone')
const whats = document.getElementById('whatsapp')
const input = document.querySelectorAll("input[type=radio]");

function mailON (){
	if (mail.parentNode.classList.contains('off')) {
		mail.parentNode.classList.remove('off')
		mail.required = true;
	}
}
function mailOff(){
	if (!mail.parentNode.classList.contains('off')) {
		mail.parentNode.classList.add('off')
		mail.required = false;
	}
}

function telON (){
	if (tel.parentNode.classList.contains('off')) {
		tel.parentNode.classList.remove('off')
		tel.required = true;
	}
}
function telOff(){
	if (!tel.parentNode.classList.contains('off')) {
		tel.parentNode.classList.add('off')
		tel.required = false;
	}
}

function whatsON (){
	if (whats.parentNode.classList.contains('off')) {
		whats.parentNode.classList.remove('off')
		whats.required = true;
	}
}
function whatsOff(){
	if (!whats.parentNode.classList.contains('off')) {
		whats.parentNode.classList.add('off')
		whats.required = false;
	}
}

for (let element of input){
	element.addEventListener('change', () => {
		if (input[0].checked){
			mailON();
			telOff();
			whatsOff();
		}
		if (input[1].checked){
			mailOff();
			telON();
			whatsOff();
		}
		if (input[2].checked){
			mailOff();
			telOff();
			whatsON();
		}
	})
}
