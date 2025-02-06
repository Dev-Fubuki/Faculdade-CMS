
const url = "http://localhost:3000/";


///     FUNÇÕES DO CADASTRO DE NUMERO  ///


// Função para confirmar a exclusão do numero
function confirmDeleteNumero(id) {

            //busca o token armazenado no login
            const token = localStorage.getItem('token');

            // Configurar o cabeçalho com a autorizção do token
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            };

    // Fazer a requisição de exclusão usando Axios
    axios.delete(`${url}api/numeros/${id}`, config)
        .then(response => {
            //console.log(response.data);

            // Fechar o modal após a exclusão
            $(`#confirmDeleteModal${id}`).modal('hide');

            Swal.fire({
                icon: 'success',
                title: 'Numero excluído com sucesso',
                showConfirmButton: false,
                timer: 1500
            });

            // Remover o card da lista após a exclusão
            const cardToRemove = document.querySelector(`#card${id}`);
            if (cardToRemove) {
                cardToRemove.remove();
            }
        })
        .catch(error => {
            console.error(error);
            // Lida com erros, se necessário
        });
}


// Evento quando o botão "Editar" do modal é clicado
document.querySelector('#editNumeroModal').addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget; // Botão que acionou o modal
    const numeroId = button.getAttribute('data-id'); // ID do numero a ser editado

    // Fazer uma solicitação GET para obter os dados do numero
    axios.get(`${url}api/numeros/${numeroId}`)
        .then(response => {
            const numeroData = response.data; // Dados do numero

            // Preencher o formulário com os dados do numero
            document.querySelector('#editTitulo').value = numeroData.titulo;
            document.querySelector('#editNumero').value = numeroData.numero;
            document.querySelector('#editIcone').value = numeroData.icone;

            // Armazenar o ID do numero no campo oculto
            document.querySelector('#editNumeroId').value = numeroId;
        })
        .catch(error => {
            console.error(error);
            // Lida com erros, se necessário
        });
});


// Função de validação do formulário
function validateForm(formData) {
    const titulo = formData.get('titulo');
    const numero = formData.get('numero');
    const icone = formData.get('icone');


    if (!titulo || !numero || !icone) {
        // Exibir mensagem de erro para o usuário
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha todos os campos obrigatórios!',
        });
        return false; // Impede o envio do formulário
    }

    return true; // Todos os campos estão preenchidos corretamente
}

// Evento quando o botão "Salvar" do modal de edição é clicado
document.querySelector('#saveEditNumero').addEventListener('click', function () {
    // Obter os dados do formulário de edição
    const formData = new FormData(document.querySelector('#editNumeroForm'));

    // Obter o ID do número a ser editado
    const numeroId = document.querySelector('#editNumeroId').value;

    // Chama a função de validação antes de enviar a solicitação PUT
    if (validateForm(formData)) {
        // Serializar os dados do formulário para formato URL encoded
        const serializedData = new URLSearchParams(formData).toString();
        //busca o token armazenado no login
        const token = localStorage.getItem('token');

        // Configurar o cabeçalho Content-Type
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
        };

        // Fazer uma solicitação PUT para atualizar o número
        axios.put(`${url}api/numeros/${numeroId}`, serializedData, config)
            .then(response => {
                console.log(response.data);

                // Fechar o modal após a edição
                $('#editNumeroModal').modal('hide'); // Fecha o modal

                Swal.fire({
                    icon: 'success',
                    title: 'Dados gravados com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                });

                // Atualizar o card correspondente na lista de numeros
                const numeroId = response.data.id; // Supondo que a resposta contenha o ID atualizado
                const cardElement = document.querySelector(`#card${numeroId}`); // Use um seletor único para localizar o card

                // Atualize os elementos HTML dentro do card com os novos dados
                const tituloElement = cardElement.querySelector('.card-title');
                const descricaoElement = cardElement.querySelector('.card-text');
                const imagemElement = cardElement.querySelector('.card-icone');

                tituloElement.textContent = response.data.numero;
                descricaoElement.textContent = response.data.titulo;
                imagemElement.innerHTML = response.data.icone;

            })
            .catch(error => {
                console.error(error);
                // Lida com erros, se necessário
            });

    }
});


// Evento quando o botão "Salvar" do modal de criação é clicado
document.querySelector('#saveCreateNumero').addEventListener('click', function () {
    // Obter os dados do formulário de criação
    const formData = new FormData(document.querySelector('#createNumeroForm'));

    // Chama a função de validação antes de enviar a solicitação POST
    if (validateForm(formData)) {
        // Serializar os dados do formulário para formato URL encoded
        const serializedData = new URLSearchParams(formData).toString();
        //busca o token armazenado no login
        const token = localStorage.getItem('token');

        // Configurar o cabeçalho Content-Type
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
        };

        // Fazer uma solicitação POST para criar um novo numero
        axios.post(`${url}api/numeros`, serializedData, config)
            .then(response => {
                console.log(response.data);

                // Fechar o modal após a edição
                $('#createNumeroModal').modal('hide'); // Fecha o modal

                Swal.fire({
                    icon: 'success',
                    title: 'Dados gravados com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                });

                // Criar um novo card com os dados recebidos da API
                const newNumeroData = response.data;
                createNumeroCard(newNumeroData);

                // Limpar os campos do formulário de criação para o próximo uso
                document.querySelector('#createNumeroForm').reset();
            })
            .catch(error => {
                console.error(error);
                // Lida com erros, se necessário
            });
    }
});

// Função para criar um novo card de numero com os dados fornecidos
function createNumeroCard(numeroData) {
    // Crie um elemento de coluna do Bootstrap
    const colElement = document.createElement('div');
    colElement.classList.add('col-md-3', 'mb-4');
    colElement.id = `card${numeroData.id}`;

    // Crie um card com base nos dados do numero
    colElement.innerHTML = `
        <div class="card h-100 text-center">
            <div class="card-icone display-1">${numeroData.icone}</div>
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${numeroData.numero}</h5>
                <p class="card-text">${numeroData.titulo}</p>
                <div class="d-flex mt-auto justify-content-between">
                    <!-- Link de Edição -->
                    <button class="btn btn-secondary"  data-bs-toggle="modal" data-bs-target="#editNumeroModal" data-id="${numeroData.id}"><i class="bi bi-pencil"></i> Editar</button>

                    <!-- Link de Exclusão - Botão para acionar o modal -->
                    <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal${numeroData.id}"><i class="bi bi-trash3"></i> Excluir</button>

                </div>
            </div>
        </div>
        <!-- Modal de Confirmação de Exclusão -->

        <div class="modal fade" id="confirmDeleteModal${numeroData.id}" tabindex="-1"
            aria-labelledby="confirmDeleteModalLabel${numeroData.id}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="confirmDeleteModalLabel${numeroData.id}">Exclusão</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Tem certeza que deseja excluir o numero: <strong>${numeroData.titulo}</strong>?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="bi bi-x-circle"></i> Cancelar</button>
                        <!-- Botão de Confirmação - Chama a função JavaScript para excluir -->
                        <button type="button" class="btn btn-danger" onclick="confirmDeleteNumero(${numeroData.id})"><i class="bi bi-check-circle"></i> Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Adicione o novo card à lista de numeros
    const numeroListElement = document.querySelector('#card-list');
    numeroListElement.appendChild(colElement);
}


// Evento quando o formulário de pesquisa é enviado
document.querySelector('#searchForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Obter o valor inserido no campo de pesquisa
    const valorPesquisa = document.querySelector('#valorPesquisa').value;

    // Fazer uma solicitação GET para buscar numeros com base no título
    axios.get(`${url}api/numeros/search?titulo=${valorPesquisa}`)
        .then(response => {
            console.log(response.data);

            // Limpar a lista de numeros existente
            const numeroListElement = document.querySelector('#card-list');
            numeroListElement.innerHTML = '';

            // Criar novos cards de numero com os dados recebidos da API
            response.data.forEach(numeroData => {
                createNumeroCard(numeroData);
            });
        })
        .catch(error => {
            console.error(error);
            // Lida com erros, se necessário
        });
});
