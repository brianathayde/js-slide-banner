var countPhoto = 0;
var startedAt = 0; 
var duration = 3000;
var clicked = false;

var moving = false;
var xStart = 0;


function start() {
    console.log("start");
    startedAt = Date.now()
    requestAnimationFrame(update)
    clicked = false;
}

window.onload = function() {
    start();
};

function update() {
    let elapsedTime = Date.now() - startedAt; // time da ultima vez que deu update

    // playback é de 0 a 1
    // começa em 0 e termina em 1
    let playback = elapsedTime / duration;
                    
    if (playback >= 0 && playback < 1) {
        // Queue the next frame
        requestAnimationFrame(update)
    } 
    else {
        if(!clicked && !moving){
            updateImg();
        }
        else{
            start();
        }
        console.log(playback);
    }
}

function startmoving(event){
    moving = true;
    xStart = event.clientX;
}

function stopmoving(event){
    let width = document.getElementById("img").clientWidth;

    let x = event.clientX - xStart;
    if(moving){
        if(x > 0){
            if(x > width / 3){
                countPhoto--;
                if (countPhoto<0) {
                    countPhoto=3;
                }
            }
        }
        else if(x < 0){
            if(x *(-1) > width / 3){
                countPhoto++;
                if (countPhoto>3) {
                    countPhoto=0;
                }
            }
        }
        nextImg();
        moving = false;
    }
}


function slide(event){
    if(moving == true){
        let xa = (event.clientX - xStart);

        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        
        let d = -vw * 0.6 * countPhoto + xa;
        let s = "translate("+d+"px, 0)";
        
        let elem = document.getElementById("allimgs");
        elem.style.transform = s;
    }
}

function photos(n){
    countPhoto=n;
    clicked = true;
    nextImg();
    console.log(countPhoto +" atual");    
}

function photo00(){   
    photos(0);               
}
function photo01(){   
    photos(1);
}
function photo02(){ 
    photos(2);   
}
function photo03(){ 
    photos(3);   
}


function nextImg(){
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    
    let d = -vw * 0.6 * countPhoto;
    let s = "translate("+d+"px, 0)";

    let el = document.getElementById("bt-radio0" + countPhoto);
    el.checked = true; 

    let elem = document.getElementById("allimgs");
    elem.style.transform = s;
    start();
}


function updateImg(){
    countPhoto++;
    if (countPhoto>3) {
        countPhoto=0;
    }
    nextImg();
    console.log(countPhoto +" atual");
}