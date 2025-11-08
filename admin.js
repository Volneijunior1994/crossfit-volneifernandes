
document.addEventListener('DOMContentLoaded', function() {

   
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            const username = document.getElementById('username').value.trim(); 
            const password = document.getElementById('password').value; 
            const errorElement = document.getElementById('login-error');

            if (username === 'Volnei' && password === '1994') {
                
                sessionStorage.setItem('usuarioLogado', 'true');
                window.location.href = 'admin.html';
            } else {
                errorElement.textContent = 'Usuário ou senha inválidos.';
            }
        });
    }


    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            sessionStorage.removeItem('usuarioLogado');
            window.location.href = 'login.html';
        });
    }


 
    function getAlunosFromStorage() {
        return JSON.parse(localStorage.getItem('alunos')) || [];
    }
    function saveAlunosToStorage(alunos) {
        localStorage.setItem('alunos', JSON.stringify(alunos));
    }

    const formAluno = document.getElementById('form-aluno');
    if (formAluno) {
        formAluno.addEventListener('submit', function(event) {
            event.preventDefault();
            const nome = document.getElementById('aluno-nome').value;
            const email = document.getElementById('aluno-email').value;
            const plano = document.getElementById('aluno-plano').value;
            const id = document.getElementById('aluno-id').value;
            const errorElement = document.getElementById('form-aluno-error');

            if (nome.trim() === '' || email.trim() === '' || plano === '') {
                errorElement.textContent = 'Por favor, preencha todos os campos.';
                errorElement.style.display = 'block';
                return; 
            } else {
                errorElement.style.display = 'none';
            }

            let alunos = getAlunosFromStorage();

            if (id) { 
                const index = alunos.findIndex(a => a.id == id);
                if (index !== -1) {
                    alunos[index] = { id, nome, email, plano };
                }
            } else { 
                const novoAluno = { id: Date.now(), nome, email, plano };
                alunos.push(novoAluno);
            }

            saveAlunosToStorage(alunos);
            
          
            window.location.href = 'relatorio-alunos.html'; 
        });

     
        document.getElementById('btn-cancelar-edicao').addEventListener('click', function() {
            resetFormAluno();
        });

   
        const alunoParaEditar = JSON.parse(localStorage.getItem('alunoParaEditar'));
        if (alunoParaEditar) {
            document.getElementById('aluno-id').value = alunoParaEditar.id;
            document.getElementById('aluno-nome').value = alunoParaEditar.nome;
            document.getElementById('aluno-email').value = alunoParaEditar.email;
            document.getElementById('aluno-plano').value = alunoParaEditar.plano;
            document.getElementById('btn-salvar-aluno').textContent = 'Atualizar';
            document.getElementById('btn-cancelar-edicao').style.display = 'inline-block';
            localStorage.removeItem('alunoParaEditar');
        }
    }
    
    function resetFormAluno() {
        document.getElementById('form-aluno').reset();
        document.getElementById('aluno-id').value = '';
        document.getElementById('btn-salvar-aluno').textContent = 'Salvar';
        document.getElementById('btn-cancelar-edicao').style.display = 'none';
        document.getElementById('form-aluno-error').style.display = 'none';
    }

 
    const tabelaAlunosBody = document.getElementById('tabela-alunos');
    if (tabelaAlunosBody) {
        carregarTabelaAlunos();
    }

    function carregarTabelaAlunos() {
        const alunos = getAlunosFromStorage();
        tabelaAlunosBody.innerHTML = ''; 

        alunos.forEach(aluno => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${aluno.nome}</td>
                <td>${aluno.email}</td>
                <td>${aluno.plano}</td>
                <td>
                    <button class="btn-editar" data-id="${aluno.id}">Editar</button>
                    <button class="btn-excluir" data-id="${aluno.id}">Excluir</button>
                </td>
            `;
            tabelaAlunosBody.appendChild(tr);
        });

    
        tabelaAlunosBody.querySelectorAll('.btn-excluir').forEach(button => {
            button.addEventListener('click', function() {
                excluirAluno(this.getAttribute('data-id'));
            });
        });
        tabelaAlunosBody.querySelectorAll('.btn-editar').forEach(button => {
            button.addEventListener('click', function() {
                editarAluno(this.getAttribute('data-id'));
            });
        });
    }

    function excluirAluno(id) {
        
        let alunos = getAlunosFromStorage();
        alunos = alunos.filter(a => a.id != id);
        saveAlunosToStorage(alunos);
        carregarTabelaAlunos(); 
        showFeedbackMessage('Aluno excluído com sucesso!'); 
    }

    function editarAluno(id) {
        let alunos = getAlunosFromStorage();
        const aluno = alunos.find(a => a.id == id);
        if (!aluno) return;
        localStorage.setItem('alunoParaEditar', JSON.stringify(aluno));
        window.location.href = 'cadastro-aluno.html';
    }

 

    function getWodsFromStorage() {
        return JSON.parse(localStorage.getItem('wods')) || [];
    }
    function saveWodsToStorage(wods) {
        localStorage.setItem('wods', JSON.stringify(wods));
    }

   
    const formWod = document.getElementById('form-wod');
    if (formWod) {
        formWod.addEventListener('submit', function(event) {
            event.preventDefault();
            const data = document.getElementById('wod-data').value;
            const titulo = document.getElementById('wod-titulo').value;
            const descricao = document.getElementById('wod-descricao').value;
            const id = document.getElementById('wod-id').value;
            const errorElement = document.getElementById('form-wod-error');

        
            if (data.trim() === '' || titulo.trim() === '' || descricao.trim() === '') {
                errorElement.textContent = 'Por favor, preencha todos os campos.';
                errorElement.style.display = 'block';
                return; 
            } else {
                errorElement.style.display = 'none';
            }

            let wods = getWodsFromStorage();

            if (id) { 
                const index = wods.findIndex(w => w.id == id);
                if (index !== -1) {
                    wods[index] = { id, data, titulo, descricao };
                }
            } else { 
                const novoWod = { id: Date.now(), data, titulo, descricao };
                wods.push(novoWod);
            }

            saveWodsToStorage(wods);
            
          
            window.location.href = 'relatorio-wods.html';
        });

      
        document.getElementById('btn-cancelar-edicao-wod').addEventListener('click', function() {
            formWod.reset();
            document.getElementById('wod-id').value = '';
            document.getElementById('btn-salvar-wod').textContent = 'Salvar';
            this.style.display = 'none';
            document.getElementById('form-wod-error').style.display = 'none';
        });

     
        const wodParaEditar = JSON.parse(localStorage.getItem('wodParaEditar'));
        if (wodParaEditar) {
            document.getElementById('wod-id').value = wodParaEditar.id;
            document.getElementById('wod-data').value = wodParaEditar.data;
            document.getElementById('wod-titulo').value = wodParaEditar.titulo;
            document.getElementById('wod-descricao').value = wodParaEditar.descricao;
            document.getElementById('btn-salvar-wod').textContent = 'Atualizar';
            document.getElementById('btn-cancelar-edicao-wod').style.display = 'inline-block';
            localStorage.removeItem('wodParaEditar');
        }
    }

   
    const tabelaWodsBody = document.getElementById('tabela-wods');
    if (tabelaWodsBody) {
        carregarTabelaWods();
    }

    function carregarTabelaWods() {
        const wods = getWodsFromStorage();
        tabelaWodsBody.innerHTML = ''; 

        wods.forEach(wod => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${wod.data}</td>
                <td>${wod.titulo}</td>
                <td>${wod.descricao.substring(0, 50)}...</td> <td>
                    <button class="btn-editar" data-id="${wod.id}">Editar</button>
                    <button class="btn-excluir" data-id="${wod.id}">Excluir</button>
                </td>
            `;
            tabelaWodsBody.appendChild(tr);
        });

   
        tabelaWodsBody.querySelectorAll('.btn-excluir').forEach(button => {
            button.addEventListener('click', function() {
                excluirWod(this.getAttribute('data-id'));
            });
        });
        tabelaWodsBody.querySelectorAll('.btn-editar').forEach(button => {
            button.addEventListener('click', function() {
                editarWod(this.getAttribute('data-id'));
            });
        });
    }

    function excluirWod(id) {
     
        let wods = getWodsFromStorage();
        wods = wods.filter(w => w.id != id);
        saveWodsToStorage(wods);
        carregarTabelaWods();
        showFeedbackMessage('WOD excluído com sucesso!'); 
    }

    function editarWod(id) {
        let wods = getWodsFromStorage();
        const wod = wods.find(w => w.id == id);
        if (!wod) return;
        localStorage.setItem('wodParaEditar', JSON.stringify(wod));
        window.location.href = 'cadastro-wod.html';
    }
    

 
    function getTurmasFromStorage() {
        return JSON.parse(localStorage.getItem('turmas')) || [];
    }
    function saveTurmasToStorage(turmas) {
        localStorage.setItem('turmas', JSON.stringify(turmas));
    }


    const formTurma = document.getElementById('form-turma');
    if (formTurma) {
        formTurma.addEventListener('submit', function(event) {
            event.preventDefault();
            const nome = document.getElementById('turma-nome').value;
            const coach = document.getElementById('turma-coach').value;
            const vagas = document.getElementById('turma-vagas').value;
            const id = document.getElementById('turma-id').value;
            const errorElement = document.getElementById('form-turma-error');

      
            if (nome.trim() === '' || coach.trim() === '' || vagas.trim() === '') {
                errorElement.textContent = 'Por favor, preencha todos os campos.';
                errorElement.style.display = 'block';
                return; 
            } else {
                errorElement.style.display = 'none';
            }

            let turmas = getTurmasFromStorage();

            if (id) { 
                const index = turmas.findIndex(t => t.id == id);
                if (index !== -1) {
                    turmas[index] = { id, nome, coach, vagas };
                }
            } else { 
                const novaTurma = { id: Date.now(), nome, coach, vagas };
                turmas.push(novaTurma);
            }

            saveTurmasToStorage(turmas);
            
         
            window.location.href = 'relatorio-turmas.html';
        });

        document.getElementById('btn-cancelar-edicao-turma').addEventListener('click', function() {
            formTurma.reset();
            document.getElementById('turma-id').value = '';
            document.getElementById('btn-salvar-turma').textContent = 'Salvar';
            this.style.display = 'none';
            document.getElementById('form-turma-error').style.display = 'none';
        });


        const turmaParaEditar = JSON.parse(localStorage.getItem('turmaParaEditar'));
        if (turmaParaEditar) {
            document.getElementById('turma-id').value = turmaParaEditar.id;
            document.getElementById('turma-nome').value = turmaParaEditar.nome;
            document.getElementById('turma-coach').value = turmaParaEditar.coach;
            document.getElementById('turma-vagas').value = turmaParaEditar.vagas;
            document.getElementById('btn-salvar-turma').textContent = 'Atualizar';
            document.getElementById('btn-cancelar-edicao-turma').style.display = 'inline-block';
            localStorage.removeItem('turmaParaEditar');
        }
    }

    const tabelaTurmasBody = document.getElementById('tabela-turmas');
    if (tabelaTurmasBody) {
        carregarTabelaTurmas();
    }

    function carregarTabelaTurmas() {
        const turmas = getTurmasFromStorage();
        tabelaTurmasBody.innerHTML = ''; 

        turmas.forEach(turma => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${turma.nome}</td>
                <td>${turma.coach}</td>
                <td>${turma.vagas}</td>
                <td>
                    <button class="btn-editar" data-id="${turma.id}">Editar</button>
                    <button class="btn-excluir" data-id="${turma.id}">Excluir</button>
                </td>
            `;
            tabelaTurmasBody.appendChild(tr);
        });


        tabelaTurmasBody.querySelectorAll('.btn-excluir').forEach(button => {
            button.addEventListener('click', function() {
                excluirTurma(this.getAttribute('data-id'));
            });
        });
        tabelaTurmasBody.querySelectorAll('.btn-editar').forEach(button => {
            button.addEventListener('click', function() {
                editarTurma(this.getAttribute('data-id'));
            });
        });
    }

    function excluirTurma(id) {
        
        let turmas = getTurmasFromStorage();
        turmas = turmas.filter(t => t.id != id);
        saveTurmasToStorage(turmas);
        carregarTabelaTurmas();
        showFeedbackMessage('Turma excluída com sucesso!'); 
    }

    function editarTurma(id) {
        let turmas = getTurmasFromStorage();
        const turma = turmas.find(t => t.id == id);
        if (!turma) return;
        localStorage.setItem('turmaParaEditar', JSON.stringify(turma));
        window.location.href = 'cadastro-turma.html';
    }

   
    function showFeedbackMessage(message) {
        const feedbackElement = document.getElementById('feedback-message');
        if (feedbackElement) {
            feedbackElement.textContent = message;
            feedbackElement.style.display = 'block';
            
          
            setTimeout(() => {
                feedbackElement.style.display = 'none';
                feedbackElement.textContent = '';
            }, 3000);
        }
    }

}); 