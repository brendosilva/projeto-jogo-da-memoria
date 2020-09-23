function onLoad () {    
    const dependecia = {
        tela: Tela,
        util: Util
    }

    const jogoDaMemoria = new JogoDaMemoria(dependecia);
    jogoDaMemoria.incializar()
  
}

window.onload = onLoad;