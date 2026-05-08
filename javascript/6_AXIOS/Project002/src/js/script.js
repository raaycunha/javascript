'use strict';

// Api JSONPlaceholder entregar: Nome, Email e Empresa apartir do ID que o usuário digitar e mostrar na tela.
const frm = document.querySelector('#frm')
const idUserInput = document.querySelector('#inIdUser')
const containerCard = document.querySelector('.container-card-user')
const btnSearch = document.querySelector('#btnSearch')
let idsSearched = JSON.parse(localStorage.getItem('cards')) || [] // Persistencia de Dados com LocalStorage caso o navegador recarregue

class ApiData {
    // CRUD Completo em uma Classe, a forma limpa é com Arrow Function mas por questões de aprendizado estou usando Classes
    static baseUrl = 'https://jsonplaceholder.typicode.com'

    static async getData(idUser) {
        return await axios.get(`${this.baseUrl}/users/${idUser}`) // Api JSONPlaceholder = Method GET
    }

    static async postData(dataPost) {
        return await axios.post(`${this.baseUrl}/posts`, dataPost) // Api JSONPlaceholder = Method POST
    }

    static async updateData(id, data) {
        return await axios.put(`${this.baseUrl}/posts/${id}`, data) // Api JSONPlaceholder = Method PUT
    }

    static async deletePost(idPost) {
        return await axios.delete(`${this.baseUrl}/posts/${idPost}`) // Api JSONPlaceholder = Method DELETE
    }
}

class GetComponent {
    // Após o usuário enviar o ID do user que deseja o HTML é criado com os dados do mesmo (Manipulação de DOM)
    constructor(data) {
        const finalData = data.data || data // Verificação para os dados que vem do LocalStorage/Axios

        this.name = finalData.name || 'Nome não encontrado'
        this.email = finalData.email || 'Email não encontrado'
        this.company = finalData.company?.name || 'Empresa não encontrada'
    }

    getHtml(container, idUser) {
        const boxCard = document.createElement('div')
        boxCard.classList.add('card-user')

        const boxInfo = document.createElement('div')
        boxInfo.classList.add('info-user')

        const nameUser = document.createElement('h3')
        nameUser.textContent = this.name

        const emailUser = document.createElement('p')
        emailUser.textContent = this.email

        const companyUser = document.createElement('h4')
        companyUser.textContent = this.company

        const boxBtn = document.createElement('div')
        boxBtn.classList.add('btn-card')

        const btnConfirm = document.createElement('button')
        btnConfirm.textContent = 'Finalizar'
        btnConfirm.classList.add('btn-confirm')

        const btnDelete = document.createElement('button')
        btnDelete.textContent = 'Excluir'
        btnDelete.classList.add('btn-delete')

        boxInfo.append(nameUser, emailUser, companyUser)
        boxBtn.append(btnConfirm, btnDelete)
        boxCard.append(boxInfo, boxBtn)
        container.append(boxCard)

        const index = idsSearched.findIndex(item => item.id === idUser)
        if (index !== -1 && idsSearched[index].checked === true) {
            boxInfo.classList.add('finished')
        }

        btnConfirm.addEventListener('click', () => {
            // Efeito de marcação em cima dos dados do user após o evento de clique (Finalizar/Desmarcar)

            boxInfo.classList.toggle('finished')
            if (boxInfo.classList.contains('finished')) {
                btnConfirm.textContent = 'Desmarcar'
            } else btnConfirm.textContent = 'Finalizar'

            const isChecked = boxInfo.classList.contains('finished')
            if (isChecked) {
                // Salvando o estado de marcação para caso o navegador recarregue ele não perca os posts marcados
                const index = idsSearched.findIndex(item => item.id === idUser)
                if (index !== -1) {
                    idsSearched.splice(index, 1, { ...idsSearched[index], checked: true })
                    localStorage.setItem('cards', JSON.stringify(idsSearched))
                }
            }
        })

        btnDelete.addEventListener('click', async () => {
            // Apagando o Card após o evento de clique (Excluir)
            const index = idsSearched.findIndex(item => item.id === idUser)
            if (index !== -1) {
                boxCard.remove()
                idsSearched.splice(index, 1)
                localStorage.setItem('cards', JSON.stringify(idsSearched))
            }
        })
    }
}

btnSearch.addEventListener('click', async (e) => {
    e.preventDefault()

    const cleanInput = idUserInput.value.trim()
    if (cleanInput === '') {
        alert('Por favor digite um ID antes de buscar.')
        idUserInput.focus()
        return
    }
    
    const idUser = Number(cleanInput)

    // Verificando apartir da Array do LocalStorage se esse user já está na tela (Manipulação de Arrays)
    const idExists = idsSearched.some(item => item.id === idUser)
    if (idExists) {
        // Se o user está na tela: Alertar
        alert(`O usuário com o ID [${idUser}] já foi carregado.`) 
        idUserInput.value = ''
        idUserInput.focus()
        return
    }

    try {
        // UX, desabilitando o botão evitando que o usuário clique novamente e bugando a API
        btnSearch.disabled = true
        btnSearch.textContent = 'Buscando...'

        const response = await ApiData.getData(idUser)

        const userCard = new GetComponent(response.data)
        idsSearched.push({ 
            // Enviando os dados do user pra Array
            userData: response.data, 
            id: idUser, 
            checked: false
        })
        userCard.getHtml(containerCard, idUser)
        // Salvando a Array no LocalStorage
        localStorage.setItem('cards', JSON.stringify(idsSearched))
    } catch(err) {
        console.error('Erro detalhado:', err)
        alert('Usuário não encontrado ou erro na conexão!');
    } finally {
        // Restaura o botão independente de erro ou sucesso
        btnSearch.disabled = false
        btnSearch.textContent = 'Buscar'
        idUserInput.value = ''
        idUserInput.focus()
    }
})

if (idsSearched.length > 0) {
    // Caso exista algum dado no LocalStorage fazer o loop e criar o Html
    idsSearched.forEach(obj => {
        const userCard = new GetComponent(obj.userData)
        userCard.getHtml(containerCard, obj.id)
    });
}

// Api JSONPlaceholder postar: Titulo e Conteúdo que o usuário digitar nos inputs e mostrar na tela.
const titleInput = document.querySelector('#inTitleUser')
const contentInput = document.querySelector('#inContentUser')
const containerCardPost = document.querySelector('.container-card-post')
const btnPost = document.querySelector('#btnPost')
// Persistencia de Dados com LocalStorage caso o navegador recarregue
let dataPost = JSON.parse(localStorage.getItem('dataPost')) || []
// Se tiver algum post no LocalStorage começar 1 número acima se não começar com 1
let idPost = dataPost.length > 0 ? Math.max(...dataPost.map(p => p.id)) + 1 : 1

const limparInput = () => {
    titleInput.value = ''
    contentInput.value = ''
    titleInput.focus()
}

class PostComponent {
    // Após o usuário enviar o Titulo/Conteúdo do post, o HTML é criado com os dados recebidos (Manipulação de DOM)
    constructor(response, idPost) {
        const finalData = response.data || response; 
        this.title = finalData.title || 'Titulo não encontrado'
        this.body = finalData.body || 'Conteúdo não encontrado'
        this.id = idPost
    }

    postHtml(container) {
        const boxPost = document.createElement('div')
        boxPost.classList.add('card-post')

        const infoPost = document.createElement('div')
        infoPost.classList.add('info-post')

        const titlePost = document.createElement('h3')
        titlePost.textContent = this.title

        const contentPost = document.createElement('p')
        contentPost.textContent = this.body

        const boxBtn = document.createElement('div')
        boxBtn.classList.add('btn-card')

        const small = document.createElement('small')
        small.textContent = 'Post: '

        const postId = document.createElement('span')
        postId.textContent = this.id

        const btnDelete = document.createElement('button')
        btnDelete.textContent = 'Excluir'
        btnDelete.classList.add('btn-delete')

        infoPost.append(titlePost, contentPost)
        small.append(postId)
        boxBtn.append(small, btnDelete)
        boxPost.append(infoPost, boxBtn)
        container.append(boxPost)

        btnDelete.addEventListener('click', async () => {
            try {
                btnDelete.disabled = true
                btnDelete.textContent = 'Excluindo...'

                const response = await ApiData.deletePost(this.id)

                if (response.status === 200 || response.status < 300) {
                    const index = dataPost.findIndex(item => item.id === this.id)
                    if (index !== -1) {
                        boxPost.remove()
                        dataPost.splice(index, 1)
                        localStorage.setItem('dataPost', JSON.stringify(dataPost))
                    }
                }
            } catch(err) {
                console.error('Erro ao deletar: ', err)
                alert('Erro ao deletar!')
            } finally {
                // API dando erro ou não o botão volta ao normal no final
                btnDelete.disabled = false
                btnDelete.textContent = 'Excluir'
            }
        })
    }
}

btnPost.addEventListener('click', async () => {
    try {
        btnPost.disabled = true
        btnPost.textContent = 'Postando...'

        const titleUser = titleInput.value.trim()
        const contentUser = contentInput.value.trim()
        if (titleUser.length <= 0 || contentUser.length <= 0) {
            alert('Os campos não podem estar vazios.')
            limparInput()
            return
        }
        
        const response = await ApiData.postData({
            title: titleUser,
            body: contentUser,
            userId: 1 
        })

        // Verificando se a API retornou status 200 a 299 (Se sim: Deu certo)
        if (response.status >= 200 && response.status < 300) { 
            const newPost = new PostComponent(response, idPost)
            newPost.postHtml(containerCardPost)

            dataPost.push({
                // Enviando os dados do Post pra Array
                responseApi: response,
                id: idPost
            })
            localStorage.setItem('dataPost', JSON.stringify(dataPost))

            idPost++
        }
    } catch(err) {
        console.log('Erro ao Postar conteúdo:', err)
        alert('Erro ao Postar conteúdo:', err)
    } finally {
        // API dando erro ou não o botão volta ao normal no final
        btnPost.disabled = false
        btnPost.textContent = 'Postar'
        limparInput()
    }
})

dataPost.forEach(data => {
    // Caso exista algum dado no LocalStorage fazer o loop e criar o Html
    const newPost = new PostComponent(data.responseApi, data.id)
    newPost.postHtml(containerCardPost)
});