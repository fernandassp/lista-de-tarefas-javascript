
document.addEventListener("DOMContentLoaded", function () {

  //botão de incluir
  var btnAdd = document.getElementById('btnAdd');


  //add tarefa e salvar no localStorage

  function leTarefa() {
    let strDados = localStorage.getItem('tarefas');
    let objDados = {};
    if (strDados) {
      objDados = JSON.parse(strDados);
    }
    else {
      objDados = { tarefas: [{ task: 'Terminar exercícios' }] }
    }

    return objDados;
  }

  function salvaTarefaLS(tarefaNova) {
    localStorage.setItem('tarefas', JSON.stringify(tarefaNova))
  }

  function incluiTarefa() {
    let objDados = leTarefa();
    let strTask = document.getElementById('novatarefa').value;
    if (strTask) {
      let novaTask = {
        task: strTask,
        concluida: false // inicialmente a tarefa não está concluída
      }
      objDados.tarefas.push(novaTask);
      salvaTarefaLS(objDados);
    }


  }


  function imprimeTarefa() {
    let tela = document.getElementById('divLista');
    let strHtml = '';
    let objDados = leTarefa();
    for (i = 0; i < objDados.tarefas.length; i++) {
      let task = objDados.tarefas[i];
      let concluidaClass = task.concluida ? 'concluido' : ''; // adiciona a classe 'concluido' se a tarefa estiver concluída
      strHtml += `<div class="tarefa ${concluidaClass}"><p>${task.task}</p></div>`;
    }
    tela.innerHTML = strHtml;

    // restaurar os event listeners dos botões de concluir e remover
    let tdsTarefas = document.getElementsByClassName('tarefa');
    for (let i = 0; i < tdsTarefas.length; i++) {
      let btnConcluir = document.createElement('button');
      btnConcluir.classList.add('btnConc');
      btnConcluir.innerHTML = 'Concluir <i class="fa-solid fa-check"></i>';
      tdsTarefas[i].appendChild(btnConcluir);

      let btnRemover = document.createElement('button');
      btnRemover.classList.add('btnRmv');
      btnRemover.innerHTML = 'Remover <i class="fa-solid fa-xmark"></i>';
      tdsTarefas[i].appendChild(btnRemover);

      btnConcluir.addEventListener('click', function () {
        let index = Array.from(this.parentElement.parentNode.children).indexOf(this.parentElement);
        objDados.tarefas[index].concluida = !objDados.tarefas[index].concluida;
        salvaTarefaLS(objDados);
        this.parentElement.classList.toggle('concluido');
      });

      btnRemover.addEventListener('click', function () {
        let index = Array.from(this.parentElement.parentNode.children).indexOf(this.parentElement);
        tdsTarefas[index].remove();
        objDados.tarefas.splice(index, 1);
        salvaTarefaLS(objDados);
      });
    }

  }


  // evento de clique no botão de adicionar tarefa

  btnAdd.addEventListener('click', function () {
    incluiTarefa();
    imprimeTarefa();
    document.getElementById('novatarefa').value = '';
  })



  imprimeTarefa() // sempre aparecer na tela 

})


