const util = Util
const ID_CONTEUDO = "conteudo";
const ID_JOGAR = "iniciar";
const ID_MENSAGEM = "mensagem";
const CLASSE_INVISIVEL = "invisible";
const ID_CARREGANDO = "carregando";
const ID_CONTADOR = "contador";
const ID_BOTAO_MOSTRAR_TUDO = "mostraTudo"
const MENSAGEM = {
    sucesso: {
        texto: 'Combinação correta, parabens!!',
        classe: 'alert-sucess'
    },
    erro: {
        texto: 'Combinação incorreta!!',
        classe: 'alert-danger'
    }
}

class Tela {
    static obterCodigoHtml(item) {
         return `
         <div class="col-md-3">
         <div class="card" style="width: 50%;" onclick="window.verificarSelecao('${item.id}','${item.nome}')">
             <img src="${item.image}" name="${item.nome}" class="card-img-top" alt="homem-aranha">
         </div>
     </div>
         `
    }

    static configurarBotaoVerificarSelecao(funcaoOnClick){
        window.verificarSelecao = funcaoOnClick
    }

    static alterarConteudoHtml(codigoHtml){
        const conteudo = document.getElementById(ID_CONTEUDO);
        conteudo.innerHTML = codigoHtml
    }

    static gerarStringPelaImagem(itens) {
        return itens.map(Tela.obterCodigoHtml).join('')
    }

    static atualizarImagem(itens) {
        const codigoHtml = Tela.gerarStringPelaImagem(itens);
        Tela.alterarConteudoHtml(codigoHtml)
    }

    static configurarBotaoJogar(funcaoOnClick) {
        const btnJogar = document.getElementById(ID_JOGAR);
        btnJogar.onclick = funcaoOnClick
    }

    static exibirHerois(nomeDoHeroi, image){
        const elementosHtml = document.getElementsByName(nomeDoHeroi)
        elementosHtml.forEach(item => {
            item.src = image
        })
    }

    static async exibirMensagem(sucesso = true) {
        const elemento = document.getElementById(ID_MENSAGEM)
        if(sucesso)
        {
            elemento.classList.remove(MENSAGEM.erro.classe)
            elemento.classList.add(MENSAGEM.sucesso.classe)
            elemento.innerHTML = MENSAGEM.sucesso.texto
        }
        else
        {
            elemento.classList.remove(MENSAGEM.sucesso.classe)
            elemento.classList.add(MENSAGEM.erro.classe)
            elemento.innerHTML = MENSAGEM.erro.texto
        }

        elemento.classList.remove(CLASSE_INVISIVEL)
        await util.timeOut(1000)
        elemento.classList.add(CLASSE_INVISIVEL)
    }

    static exibirCarregando(mostrar = true) {
        const carregando = document.getElementById(ID_CARREGANDO);
        if(mostrar)
        {
            carregando.classList.remove(CLASSE_INVISIVEL)
            return;
        }
        else 
        {
            carregando.classList.add(CLASSE_INVISIVEL)
        }
    }

    static iniciarContador() {
        let contarAte = 3;
        const elementoContador = document.getElementById(ID_CONTADOR);
        const identificarTexto = '$$contador';
        const textoPadrao = `Começando em ${identificarTexto} s`
        const atualizarTexto = () => {
            elementoContador.innerHTML = textoPadrao.replace(identificarTexto, contarAte--)
        }

        atualizarTexto()
        const idDoIntervalo = setInterval(atualizarTexto, 1000)
        return idDoIntervalo
    }

    static pararContador(idDoContador) {
        clearInterval(idDoContador)
        document.getElementById(ID_CONTADOR).innerHTML = ""
    }

    static configurarBotaoMostrarTudo(funcaoOnClick){
        const btnMostrarTudo = document.getElementById(ID_BOTAO_MOSTRAR_TUDO);

        btnMostrarTudo.onclick = funcaoOnClick

    }

}