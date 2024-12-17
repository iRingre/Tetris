var width=0;
var heigt=0;
var hpx=0;
var wpx=0;
var colonnapx =0;
var rigapx=0;
let contieni=[];
const tetrominoes = [
    // Pezzo I
    [1, 1, 1, 1],
    // Pezzo O
    [1, 1, 1, 1, 0]
    ,
    // Pezzo T
    [0, 1, 0, 1, 1, 1]
    ,
    // Pezzo S
    [0, 1, 1, 1, 1, 0]
    ,
    // Pezzo Z
    [1, 1, 0, 0, 1, 1]
    ,
    // Pezzo L
    [1, 0, 0, 1, 1, 1]
    ,
    // Pezzo J
    [0, 0, 1, 1, 1, 1]
    
];
var punteggio=0;
var tempoGenerazione=0;
var tetromino=0;
var perDis=0;
var movimento=0;
var movimentoSG=0;
var provaFine=0;
var stop=false;

function setup(){
    colonnapx=10;
    rigapx=15;
    hpx=40;
    wpx=40;
    width=colonnapx*wpx;
    heigt=rigapx*hpx;
    tempoGenerazione=0;
    tetromino = floor(random(tetrominoes.length));
    perDis=0;
    movimento=0;
    movimentoSG=0;
    provaFine=0;
    //creazione pixel e inizzializzazione del canvaps per ogni pixel
    createCanvas(width,heigt);
    background(0);
    for (let index = 0; index < rigapx; index++) {
        for (let j = 0; j < colonnapx; j++) {
            fill(5);
            rect(j*hpx,index*wpx,hpx,wpx);
            contieni[(colonnapx*index)+j]=0;
            //console.log(contieni[index][j]);
        }
        //console.log('\r')
    };
    console.log("porchi dei");
    geenraPezzo();
}

function controllo(){
    if (movimentoSG==(rigapx-1)) {
        for (let index = 0; index < rigapx; index++) {
            for (let j = 0; j < colonnapx; j++) {
                if(contieni[(colonnapx*index)+j]===1){
                    contieni[(colonnapx*index)+j]=2;
                    //console.log("posizione vettoriale numero: "+((colonnapx*index)+j));
                } 
            }
        }
    }
}

function refresh(){
    background(0);
    for (let index = 0; index < rigapx; index++) {
        for (let j = 0; j < colonnapx; j++) {
            console.log((contieni[(colonnapx*index)+j])+'---'+((index*colonnapx)+j));
            if (contieni[(colonnapx*index)+j]!=2)  {
                fill(200);
                rect(j*hpx,index*wpx,hpx,wpx);
                contieni[(colonnapx*index)+j]=0;
            }else{
                fill(255);
                rect(j*hpx,index*wpx,hpx,wpx);
                //contieni[(colonnapx*index)+j]=2;
            }
        }
        console.log('\r');
    };
}

function geenraPezzo() {
    refresh();
    console.log(tetromino);
    if (tetrominoes[tetromino].length>=6) {
            for (let j = 0; j < tetrominoes[tetromino].length; j++) {
                if(tetrominoes[tetromino][j]==1){
                    if(j<tetrominoes[tetromino].length/2){
                        fill(255);
                        rect((movimento+j+3)*wpx,movimentoSG*wpx,hpx,wpx);
                        contieni[movimento+j+3+(movimentoSG*colonnapx)]=1;
                    }else{
                        fill(255);
                        rect((j+movimento)*wpx,(movimentoSG*wpx)+wpx,hpx,wpx);
                        contieni[j+movimento+colonnapx+(movimentoSG*colonnapx)]=1;
                    }
                }
            }
    }else{
        if (tetromino==1) {
            for (let j = 0; j < tetrominoes[tetromino].length; j++) {
                if(tetrominoes[tetromino][j]==1){
                    if(j<tetrominoes[tetromino].length-3){
                        fill(255);
                        rect((movimento+j+4)*wpx,movimentoSG*wpx,hpx,wpx);
                    }else{
                        fill(255);
                        rect((j+movimento+2)*wpx,(movimentoSG*wpx)+wpx,hpx,wpx);
                    }
                }
            }
        }else{
            for (let j = 0; j < tetrominoes[tetromino].length; j++) {
                if(tetrominoes[tetromino][j]==1){
                    fill(255);
                    rect((movimento+j+3)*wpx,movimentoSG*wpx,hpx,wpx);
                }
            }
        }
    }
}

function draw(){
    if(!stop){
        tempoGenerazione++;
        if(tempoGenerazione>=60){
            tempoGenerazione=0;
            controllo();
            geenraPezzo();  
            movimentoSG+=1;
            console.log("posizione colonna ="+ movimentoSG);
            console.log('\r');
        }
        provaFine++;
        if (provaFine>=(60*(rigapx-1))) {
            controllo();
            refresh();
            stop=false;
            tetromino = floor(random(tetrominoes.length));
            provaFine=0;
            movimentoSG=0;
            movimento=0;
        }
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        movimento-=1;
        //refresh();
        //tetromino = floor(random(tetrominoes.length));
        geenraPezzo();
    }
    if (keyCode === RIGHT_ARROW) {
        movimento+=1;
        //refresh();
        //tetromino = floor(random(tetrominoes.length));
        geenraPezzo();
    }
}

