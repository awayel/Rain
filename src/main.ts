import Rain, { MouseActions } from './rain/rain'
import { moveTypes, touchTypes } from './rain/src/types/Types';
import Position from './rain/src/Position';
import RainImage from './rain/src/RainImage';
import SceneGroup from './rain/src/SceneGroup';

function main() {
    let renderer = new Rain.Renderer(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    let scene = new Rain.Scene();
    let myCard = new Rain.Card({ x: 10, y: 10, height: 200, width: 150, text: "1", borderRadius: 10, borderColor: "#0aa1ed",border:true });
    scene.add(myCard);
    let myCard2 = new Rain.Card({ x: 45, y: 10, height: 200, width: 150, text: "2", borderRadius: 10,border:true });
    scene.add(myCard2);
    let myCard3 = new Rain.Card({ x: 80, y: 10, height: 200, width: 150, text: "3", borderRadius: 10 ,border:true});
    scene.add(myCard3);
    let myCard4 = new Rain.Card({ x: 115, y: 10, height: 200, width: 150, text: "4", borderRadius: 10,border:true });
    scene.add(myCard4);
    let myCard5 = new Rain.Card({ x: 150, y: 10, height: 200, width: 150, text: "5", borderRadius: 10 ,border:true});
    scene.add(myCard5);
    let myCard6 = new Rain.Card({
        x: 185,
        y: 10,
        height: 200,
        width: 150,
        material: new RainImage({
            src: './assets/imgs/cartoon.jpg',
            start:25,
            end:0,
            width:300,
            height:400,
        }),
        text: "K",
        borderRadius: 10,
        border:true
    });
    scene.add(myCard6);
    let myCard7 = new Rain.Card({
        x: 220,
        y: 10,
        height: 200,
        width: 150,
        material: new RainImage({
            src: './assets/imgs/cartoon.jpg',
            start:295,
            end:0,
            width:300,
            height:400,
        }),
        text: "Q",
        borderRadius: 10,
        border:true
    });
    scene.add(myCard7);
    let cardGroup = new SceneGroup();
    let myCard8 = new Rain.Card({
        x: 255,
        y: 10,
        height: 200,
        width: 150,
        material: new RainImage({
            src: './assets/imgs/cartoon.jpg',
            start:295,
            end:0,
            width:300,
            height:400,
        }),
        text: "Q",
        borderRadius: 10,
        border:true
    });
    let myCard9 = new Rain.Card({
        x: 290,
        y: 10,
        height: 200,
        width: 150,
        material: new RainImage({
            src: './assets/imgs/cartoon.jpg',
            start:25,
            end:0,
            width:300,
            height:400,
        }),
        text: "K",
        borderRadius: 10,
        border:true
    });
    cardGroup.add(myCard8);
    cardGroup.add(myCard9);
    scene.add(cardGroup);

    cardGroup.onClick=function(e){
        if(e.sceneGroup){
            e.sceneGroup.moveTo({
                type:moveTypes.GRADULLY,
                duration:.5,
                position:new Position(Math.random() *100, Math.random() * 100)
            })
        }
    }

    Rain.Card.prototype.onClick = function (e) {
        // e.scene.children[e.rank].rank = scene.children.length;
        // alert(`${e.point.x}   ${e.point.y}`);
        // e.target.moveTo({
        //     type: moveTypes.NORMAL,
        //     position: new Position(Math.random() * 500, Math.random() * 500)
        // });
        // move the target 
        e.target.moveTo({
            type: moveTypes.GRADULLY,
            duration:.5,
            position: new Position(Math.random() * 500, Math.random() * 500)
        });
    }


    scene.addEvent(MouseActions.Click, renderer);
    // scene.addEvent("drag",renderer.domElement);

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene);
    }
    animate();

    window.addEventListener('resize',()=>{
        renderer.setSize(window.innerWidth, window.innerHeight);
    })
}
let cloak = document.createElement('div');
cloak.style.cssText = `
    width:100%;
    height:100%;
    position:fixed;
    left:0;
    top:0;
    background:#0aa1ed;
    transition:all .5s;
    display:flex;
    justify-content:center;
    align-items:center;
    color:#fff;
    font-size:30px;
`
document.body.appendChild(cloak);

let files = new Rain.Files([
    './assets/imgs/cartoon.jpg',
    './assets/imgs/lensflare0.png',
    './assets/imgs/lensflare2.png',
    './assets/imgs/lensflare3.png',
    './assets/imgs/snow.png',
    './assets/imgs/view.jpg',
])
files.onload =function(data){
    cloak.innerHTML= `loading ${data.loadedNumber} / ${data.total}`
}

files.onReady = function () {
    main();
    // setTimeout(()=>{
        cloak.style.left='-100%';
    // },3000);
}
