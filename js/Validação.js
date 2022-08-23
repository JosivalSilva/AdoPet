//Esta rotina deve ser liberada caso a aplicação for rodar fora de uma rede HTTP/HTTPS
//import {valida} from "./Validação.js";

const inputs = document.querySelectorAll("input");

inputs.forEach(input => {
  input.addEventListener("blur", (evento)=>{
    valida(evento.target)
  })
})

//Função principal para validação de dados de entrada dos Inputs

// export function valida(input){
function valida(input){
  const tipoDeInput = input.dataset.tipo;

  if(validadores[tipoDeInput]){
    validadores[tipoDeInput](input);
  }

  if(input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalido");
    input.parentElement.querySelector(".input-mensagem-erro").innerHTML = ""
  } else {
    input.parentElement.classList.add("input-container--invalido");
    input.parentElement.querySelector(".input-mensagem-erro").innerHTML = mostraMensagemDeErro(tipoDeInput, input)
  }
}

const tiposDeErro = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError"
]

const mensagensDeErro = {
  nome: {
    valueMissing: "O campo nome não pode estar vázio."
  },
  email: {
    valueMissing: "O campo e-mail não pode estar vázio.",
    typeMismatch: "O e-mail digitado nao é válido."
  },
  senha: {
    valueMissing: "O campo senha não pode estar vázio.",
    patternMismatch: "A senha deve conter no minimo 6 e no máximo 12 caracteres, com no minimo uma letra maiscúla e um digito de 0 a 9. Não deve conter símbolos."
  },
  dataNascimento: {
    valueMissing: "O campo data de nascimento não pode estar vázio.",
    customError: "Você deve ser maior que 18 anos para se cadastrar"
  },
  cpf: {
    valueMissing: "O campo CPF não pode estar vázio.",
    customError: "O CPF digitado não é válido."
  },
  cep: {
    valueMissing: "O campo CEP não pode estar vazio.",
    patternMismatch: "O CEP digitado não é válido.",
    customError: "O CEP não foi encontrado!"
  },
  logradouro: {
    valueMissing: "O campo logradouro não pode estar vázio."
  },
  cidade: {
    valueMissing: "O campo cidade não pode estar vázio."
  },
  estado: {
    valueMissing: "O campo estado não pode estar vázio."
  },
  preco: {
    valueMissing: "O campo de preço não pode estar vázio."
  },
  tel: {
    valueMissing: "O campo telefone não pode estar vazio.",
    patternMismatch: "O telefone digitado não é válido. Deve ser digitado DDD com 2 digitos + o número do telefone."
  }
}

//Passagem do parametro de verificação

const validadores = {
  dataNascimento:input => validaDataNascimento(input),
  cpf:input => validaCPF(input),
  cep:input => recuperarCEP(input)
}

//Apresentação do erro para o cliente conforme o tipo de entrada

function mostraMensagemDeErro(tipoDeInput, input) {
  let mensagem = ""
  tiposDeErro.forEach(erro => {
    if(input.validity[erro]) {
      mensagem = mensagensDeErro[tipoDeInput][erro]
    }
  })
  return mensagem
}

//Validando se usuário é maior de 18 anos através da data de nascimento

function validaDataNascimento(input){
  const dataRecebida = new Date(input.value);
    let mensagem = "";
      if(!maiorQue18(dataRecebida)){
        mensagem = "Você deve ser maior que 18 anos para se cadastrar!!"
      } 

    input.setCustomValidity(mensagem);
}

function maiorQue18(data){
  const dataAtual = new Date();
    const dataMais18 = new Date(data.getUTCFullYear()+18, data.getUTCMonth(), data.getUTCDate());
      return dataMais18 <= dataAtual;
}

//Validando CPF

function validaCPF(input){
  const cpfFormatado = input.value.replace(/\D/g, "");
    let mensagem = "";

      if(!checaCPFRepetido(cpfFormatado) || !checaEstruturaCPF(cpfFormatado)){
        mensagem = "O CPF digitado não é válido."
      }
  input.setCustomValidity(mensagem);
}

function checaCPFRepetido(cpf){
  const valoresRepetidos = [
    "11111111111",
    "22222222222",
    "33333333333",
    "44444444444",
    "55555555555",
    "66666666666",
    "77777777777",
    "88888888888",
    "99999999999"
  ]
  let cpfValido = true;

  valoresRepetidos.forEach(valor => {
    if(valor==cpf){
      cpfValido = false;
    }
    if (cpf.length < 11 || cpf.length > 11) {
      cpfValido = false
    }
  })

  return cpfValido;
}

//Validando estrutura do CPF

function checaEstruturaCPF(cpf){
  const multiplicador = 10;

  return checaDigitoVerificador(cpf, multiplicador)

}

function checaDigitoVerificador(cpf, multiplicador){

  if(multiplicador >= 12){
    return true;
  }

  let multiplicadorInicial = multiplicador;
  let soma = 0;
   const cpfSemDigitos = cpf.substr(0, multiplicador-1).split("");
    const digitoVerificador = cpf.charAt(multiplicador-1);

    for (let contador = 0; multiplicadorInicial > 1; multiplicadorInicial--){
      soma = soma + cpfSemDigitos[contador] * multiplicadorInicial;
      contador++;
    }

  if(digitoVerificador == confirmadigito(soma)){
    return checaDigitoVerificador(cpf, multiplicador + 1);
  }
  
  return false;
}

function confirmadigito(soma){
  let resultDigito = 0;
  console.log(soma);
  let resto = soma % 11;
  console.log(resto);
  if(resto < 2){
    resultDigito = 0;
  }else {
    resultDigito = 11 - (soma % 11);
  }
  console.log(resultDigito);
  return resultDigito;
}

//Obtendo informaçãoes da API ViaCep através do CEP

function recuperarCEP(input){
  const cep = input.value.replace(/\D/g, "");
  const url = "https://viacep.com.br/ws/"+ cep +"/json/";
  // const url = `https://viacep.com.br/ws/&{cep}/json/`

  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "content-type": "application/json;charset=utf-8"
    }
  }

  if(!input.validity.patternMismatch && !input.validity.valueMissing) {
    fetch(url, options).then(
      response => response.json()
    ).then(
      data =>{
        console.log(data);
        if(data.erro){
          input.setCustomValidity("O CEP não foi encontrado!");
          return
        }
        input.setCustomValidity("");
        
        preencheCampoComCEP(data);

        return
      }
    )
  }
}

function preencheCampoComCEP(data){
  const logradouro = document.querySelector('[data-tipo = "logradouro"]');
  const cidade = document.querySelector('[data-tipo = "cidade"]');
  const estado = document.querySelector('[data-tipo = "estado"]');

  logradouro.value = data.logradouro;
  cidade.value = data.localidade;
  estado.value = data.uf;

}