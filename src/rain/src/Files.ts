class Files {
    total: number = 0;
    loadedNumber: number = 0;
    audios: Array<HTMLAudioElement> = [];
    images: Array<HTMLImageElement> = [];
    constructor(files: Array<string>) {
        let me = this;
        this.total = files.length;
        for (const iterator of files) {
            if (/.(mp3|ogg)$/.test(iterator)) {
                let audio = new Audio();
                audio.addEventListener('load', () => {
                    me.loadedNumber++;
                    me.onload(me);
                    me.isReady();
                })
                audio.src=iterator;
                this.audios.push(audio);
            }else if(/.(jpg|png|gif|jpeg)$/.test(iterator)){
                let image = new Image();
                image.addEventListener('load', () => {
                    me.loadedNumber++;
                    me.onload(me);
                    me.isReady();
                })
                image.src=iterator;
                this.images.push(image);
            }
        }
    }
    onload(xhr: Files) {
        console.log(xhr.loadedNumber,xhr.total);
    }
    onReady(){
        console.log('The load  of files is complete');    
    }
    isReady(){
        if(this.total===this.loadedNumber){
            this.onReady();
        }
    }
}

export default Files;