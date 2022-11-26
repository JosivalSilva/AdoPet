let olhos = document.getElementById("olhos");
let flag = false;
let tipoSenha = document.getElementById('inputSenha')
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