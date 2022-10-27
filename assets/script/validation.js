const inputs = document.querySelectorAll('.input__contato')

const validadores = {
    cpf_cnpj:input => validaCPF_CNPJ(input)
}

const mensagensDeErro = {
    mensagem:{
        valueMissing: 'Escreva uma mensagem.'
    },
    nome:{
        valueMissing: 'O campo nome deve ser preenchido.'
    },
    cpf_cnpj:{
        valueMissing: 'Informe o seu CPF ou CNPJ.',
        patternMismatch: 'Isso não é um CPF ou CNPJ.',
        customError: 'O CPF ou CNPJ digitado não é válido.'
    },
    site:{
        typeMismatch: 'Esse url não é válido. Tente colocar http: no início do campo.'
    },
    email:{
        valueMissing: 'O campo de email deve ser preenchido.',
        typeMismatch: 'Isso não é um email.'
    },
    telefone:{
        valueMissing: 'Informe seu telefone ou celular.',
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
    'customError'
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

function checaNumeroRepetido(numero){
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
        '00000000000000',
        '11111111111111',
        '22222222222222',
        '33333333333333',
        '44444444444444',
        '55555555555555',
        '66666666666666',
        '77777777777777',
        '88888888888888',
        '99999999999999',
    ];

    let numeroValido = true;

    valoresRepetidos.forEach(valor =>{
        if(valor == numero){
            numeroValido = false;
        }
    });

    return numeroValido;
}

function validaCPF_CNPJ(input){
    const numeroFormatado = input.value.replace(/\D/g, ''); /*remove tudo que não é número*/
    const tamanho = numeroFormatado.length;
    let mensagem = '';

    if(tamanho == 11){ /*é CPF*/
        if(!checaNumeroRepetido(numeroFormatado) || !checaEstruturaCPF(numeroFormatado)) {
            mensagem = 'O CPF digitado não é válido.'
        }
    }

    if(tamanho == 14){ /*é CNPJ*/
        if(!checaNumeroRepetido(numeroFormatado) || !checaEstruturaCNPJ(numeroFormatado)) {
            mensagem = 'O CNPJ digitado não é válido.'
        }
    }

    input.setCustomValidity(mensagem);
}

function checaEstruturaCPF(cpf) {
    const multiplicador = 10;
    return checaDigitoVerificador(cpf, multiplicador);
}

function checaDigitoVerificador(cpf, multiplicador) {
    if(multiplicador >= 12) {
        return true;
    }

    let multiplicadorInicial = multiplicador;
    let soma = 0;
    const cpfSemDigitoVerificador = cpf.substr(0, multiplicador - 1).split('');
    const digitoVerificador = cpf.charAt(multiplicador - 1);

    for(let contador = 0; multiplicadorInicial > 1 ; multiplicadorInicial--) {
        soma = soma + cpfSemDigitoVerificador[contador] * multiplicadorInicial;
        contador++;
    }

    if(digitoVerificador == confirmaDigitoCPF(soma)) {
        return checaDigitoVerificador(cpf, multiplicador + 1);
    }

    return false;
}

function confirmaDigitoCPF(soma) {
    let restoDaDivisao = soma % 11;
    
    if(restoDaDivisao >= 2){
        return 11 - restoDaDivisao;
    } else {
        return 0;
    }
}

function checaEstruturaCNPJ(cnpj){
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digito = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digito.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digito.charAt(1))
          return false;
           
    return true;
}
