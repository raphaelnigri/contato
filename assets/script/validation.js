const inputs = document.querySelectorAll('.input__contato')

const validadores = {
    cpf:input => validaCPF(input)
}

const mensagensDeErro = {
    mensagem:{
        valueMissing: 'Escreva uma mensagem.'
    },
    nome:{
        valueMissing: 'O campo nome deve ser preenchido.'
    },
    cpf:{
        valueMissing: 'Informe o seu CPF ou CNPJ.',
        patternMismatch: 'Isso não é um CPF ou CNPJ'
    },
    site:{
        typeMismatch: 'Esse url não é válido. Tente colocar http: no início do campo'
    },
    email:{
        valueMissing: 'O campo de email deve ser preenchido',
        typeMismatch: 'Isso não é um email'
    },
    telefone:{
        valueMissing: 'Informe seu telefone ou celular',
        patternMismatch: 'Esse numero não é válido, tente dessa forma: (ddd) xxxx-xxxx'
    },
    whatsapp:{
        valueMissing: 'Informe seu whatsapp com ddd.',
        patternMismatch: 'Esse numero não é válido, tente dessa forma: (ddd) xxxxx-xxxx'
    }
}

const erros = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
]

function mostraAlerta(inputType , input){
    let mensagem = '';
    erros.forEach(erro =>{
        if(input.validity[erro]){
            mensagem = mensagensDeErro[inputType][erro];
        }
    })
    return mensagem;
}

function valida(input){
    const inputType = input.dataset.tipo;

    if(validadores[inputType]){
        validadores[inputType](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('erro');
        input.parentElement.querySelector('.erro__alert').innerHTML = '';
    } else {
        input.parentElement.classList.add('erro');
        input.parentElement.querySelector('.erro__alert').innerHTML = mostraAlerta(inputType , input);
    }

}

inputs.forEach(input =>{
    input.addEventListener('blur', (evento) =>{
        valida(evento.target);
    })
    input.addEventListener('keyup', (evento) =>{
        valida(evento.target);
    })
})

function validaCPF(){

}