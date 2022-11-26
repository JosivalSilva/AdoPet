let olhos = document.getElementById("olhos");
let olhosConfirma = document.getElementById("olhosConfirma");
let flag = false;
let tipoSenha = document.getElementById('inputSenha')
let tipoConfirmaSenha = document.getElementById('inputConfirmaSenha')

olhos.addEventListener("click", (evento =>{
  if (flag == false){
  flag = true
  olhos.src = '../Mobile/Header Imagens/olhoaberto.png';
  tipoSenha.type = 'text'
  }
  else{
    flag = false
    olhos.src = '../Mobile/Header Imagens/olho fechado.png';
    tipoSenha.type = 'password'
  }
}))

olhosConfirma.addEventListener("click", (evento =>{
  if (flag == false){
  flag = true
  olhosConfirma.src = '../Mobile/Header Imagens/olhoaberto.png';
  tipoConfirmaSenha.type = 'text'
  }
  else{
    flag = false
    olhosConfirma.src = '../Mobile/Header Imagens/olho fechado.png';
    tipoConfirmaSenha.type = 'password'
  }
}))