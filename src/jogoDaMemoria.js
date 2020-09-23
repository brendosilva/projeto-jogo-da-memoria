class JogoDaMemoria {
    constructor({ tela, util }) {
        this.tela = tela;
        this.util = util

        this.heroisIniciais = [
            {image: './image/batman.png', nome: 'Batman'},
            {image: './image/aranha.png', nome: 'Homem-Aranha'},
            {image: './image/flash.png', nome: 'Flash'},
            {image: './image/maravilha.png', nome: 'Mulher-maravilha'},
        ],

        this.iconePadrao = './image/padrao.png';
        this.heroisEscondidos = [];
        this.heroisSelecionados = [];
    }

    incializar() {
        this.tela.atualizarImagem(this.heroisIniciais)
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
        this.tela.configurarBotaoVerificarSelecao(this.verificarSelecao.bind(this))
        this.tela.configurarBotaoMostrarTudo(this.mostrarHeroisNaTela.bind(this))
    }

    async embaralhar() {
        const copias = this.heroisIniciais
        .concat(this.heroisIniciais)
        .map(item => {
            return Object.assign({}, item, { id: Math.random() / 0.5 })
        })
        .sort(() => Math.random() - 0.5)

        this.tela.atualizarImagem(copias)
        this.tela.exibirCarregando()
        const idDoIntervalo = this.tela.iniciarContador()

        await this.util.timeOut(3000)
        this.tela.pararContador(idDoIntervalo)
            this.esconderHerois(copias)
            this.tela.exibirCarregando(false)
        
    }

    esconderHerois(herois) {
        const heroisOcultos = herois.map(({ nome, id }) => ({
            id,
            nome,
            image: this.iconePadrao
        }));

        this.tela.atualizarImagem(heroisOcultos);
        this.heroisEscondidos = heroisOcultos;
    }

    exibirHerois(nomeDoHeroi){
        const { image } = this.heroisIniciais.find(({ nome }) => nomeDoHeroi === nome)

        this.tela.exibirHerois(nomeDoHeroi, image)
    }

    verificarSelecao(id, nome) {
        const item = { id, nome}
        const heroisSelecionados = this.heroisSelecionados.length;
        switch(heroisSelecionados)
        {
            case 0:
                this.heroisSelecionados.push(item)
                break;
            case 1:
                const [ opcao1 ] = this.heroisSelecionados
                this.heroisSelecionados = []
                if(opcao1.nome === item.nome && opcao1.id !== item.id)
                {
                    this.exibirHerois(item.nome)
                    this.tela.exibirMensagem()
                    return
                }
                else
                {
                    this.tela.exibirMensagem(false)
                }
                break;
        }
    }

    mostrarHeroisNaTela() {
        const heroisEscondidos = this.heroisEscondidos
        for(const heroi of heroisEscondidos){
            const { image } = this.heroisIniciais.find(item => item.nome === heroi.nome)
            heroi.image = image
        }
        this.tela.atualizarImagem(heroisEscondidos)
    }

    jogar(){
        this.embaralhar()
    }
}