const mail = document.querySelectorAll('.email')
const tel = document.querySelectorAll('.telefone')
const whats = document.querySelectorAll('.whatsapp')
const input = document.querySelectorAll("input[type=radio]");

function mailON (){
	if (mail[0].classList.contains('off')) {
		for(let i of mail) {  
			i.classList.remove('off');
		}
		mail[1].required = true;
	}
}
function mailOff(){
	if (!mail[0].classList.contains('off')) {
		for(let i of mail) {  
			i.classList.add('off');
		}
		mail[1].required = false;
	}
}

function telON (){
	if (tel[0].classList.contains('off')) {
		for(let i of tel) {  
			i.classList.remove('off');
		}
		tel[1].required = true;
	}
}
function telOff(){
	if (!tel[0].classList.contains('off')) {
		for(let i of tel) {  
			i.classList.add('off');
		}
		tel[1].required = false;
	}
}

function whatsON (){
	if (whats[0].classList.contains('off')) {
		for(let i of whats) {  
			i.classList.remove('off');
		}
		whats[1].required = true;
	}
}
function whatsOff(){
	if (!whats[0].classList.contains('off')) {
		for(let i of whats) {  
			i.classList.add('off');
		}
		whats[1].required = false;
	}
}

for (let i of input){
	i.addEventListener('change', () => {
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
