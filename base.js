body = document.querySelector("body")
body.style.overflow = "hidden"
body.style.backgroundColor = "#0f0f0f"

disp = document.getElementById("display")
disp.style.position = "absolute"
disp.style.margin = "auto"
disp.style.top = 0
disp.style.right = 0
disp.style.bottom = 0
disp.style.left = 0

var tab = 0;

var fps = [144,0,[41]];

var scope = 2;
var start = [0,0];

/*var map = new Map();
map.set(String(0), ["0"]);
map["0"].push["1"]
console.log(map)*/
/*for (let x = 0; x != displayAtWork[0].width; x++) {
    for (let y = 0; y != displayAtWork[0].height; y++) {
        map[String(x)].append(['-'])
    }
}*/

var perspective = 500;
var camera = [10000,10000,10000]
const Cube = [[[2, 3, 5, '#ffffff'],[3, 4, 5, '#ffffff'],[4, 5, 5, '#ffffff'],[5, 2, 5, '#ffffff'],[6, 7, 5, '#ffffff'],[7, 8, 5, '#ffffff'],[8, 9, 5, '#ffffff'],[9, 6, 5, '#ffffff'], [2, 6, 5, '#ffffff'],[3, 7, 5, '#ffffff'],[4, 8, 5, '#ffffff'],[5, 9, 5, '#ffffff']],[[2,3,4,5,[0,0,0],"grass_block"],[3,4,4,5,[0,0,0],"grass_block"],[2,3,4,5,[0,0,0],"grass_block"],[2,3,4,5,[0,0,0],"grass_block"],[2,3,6,7,[0,0,0],"grass"],[2,3,4,5,[0,0,0],"glass_block"]],[100, 100, 100],[-100, 100, 100],[-100, -100, 100],[100, -100, 100],[100, 100, -100],[-100, 100, -100],[-100, -100, -100],[100, -100, -100]];

dis = new Display("display", [100,100], "#1a1a1a");
displayAtWorkSet(dis);
dis.updateScale([window.innerWidth,window.innerHeight]);
//requestAnimationFrame(step);

function step() {
    setTimeout(function() {
        dis.updateScale([window.innerWidth,window.innerHeight]);
        dis.updateScreen()
        //doPixel([i,i], "#FFFFFF");
        //doSquare([100,100], "#FFFFFF", [512,512])
        doRotate([0.1,0.1,0.1],Cube.slice(2,Cube.length));
        for (let i = 0; i != Cube[0].length; i++) {
            doLine(Cube[Cube[0][i][0]], Cube[Cube[0][i][1]], [getCenterX(),getCenterY()], Cube[0][i][2], Cube[0][i][3]);
        }
        fps[1]++
        clearTimeout(step);
        step();
    }, 1000 / fps[0]);
}

function fpsCount() {
    setTimeout(function() {
        fps[2] = fps[1];
        fps[1] = 0;
        console.log(fps[2])
        clearTimeout(fpsCount);
        fpsCount();
    }, 1000);
}
fpsCount();
step();
