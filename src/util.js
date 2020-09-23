class Util {
    static timeOut(tempo){
        return new Promise(resolve => setTimeout(resolve, tempo))
    }
}