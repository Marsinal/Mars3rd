var displayAtWork = [0,0];

var x = document.getElementById('X');
var y = document.getElementById('Y');

class Display {
    constructor(display, scale, colour) {
        this.display = document.getElementById(display);
        this.field = this.display.getContext('2d');
        this.scale = scale;
        this.colour = colour;

        this.display.width = this.scale[0];
        this.display.height = this.scale[1];

        this.field.fillStyle = this.colour;
        this.field.fillRect(0, 0, this.display.width, this.display.height);
    }
    updateScale(scale) {
        if (scale[0] != this.scale[0] || scale[1] != this.scale[1]) {
            this.scale = scale;
            this.display.width = this.scale[0];
            this.display.height = this.scale[1];
            //upd = true
        }
    }
    changeColour(colour) {
        this.colour = colour;
    }
    updateScreen() {
        this.field.fillStyle = this.colour;
        this.field.fillRect(0, 0, this.display.width, this.display.height);
    }
}

function displayAtWorkSet(workPlace) {
    window.displayAtWork = [workPlace.display,workPlace.field];
}

function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function pos(e) {
    x = e.pageX;
    y = e.pageY;
    /*if (x != e.pageX || y != e.pageY){
        x = e.pageX;
        y = e.pageY;
        upd = true
    }*/
}

function click() {
    window.CLICK = true;
}

function getCenterX() {
    return Math.round(window.displayAtWork[0].width/2);
}

function getCenterY() {
    return Math.round(window.displayAtWork[0].height/2);
}

function doPixel(coord, colour) {
    window.displayAtWork[1].strokeStyle = colour;
    window.displayAtWork[1].strokeRect(coord[0], coord[1], 1, 1);
}

function doSquare(elem1, colour, scale) {
    window.displayAtWork[1].fillStyle = colour;
    window.displayAtWork[1].fillRect(elem1[0], elem1[1], scale[0], scale[1]);
}

function doSprite(elem1, coord, scale) {
    i = 2;
    for (let x = 0; x != elem1[0]*scale[0]; x=x+scale[0]) {
        for (let y = 0; y != elem1[1]*scale[1]; y=y+scale[1]) {
            if (elem1[i][0]+elem1[i][1]+elem1[i][2] != 0) {
                doSquare([coord[0]+x,coord[1]+y],"rgb("+elem1[i][0]+","+elem1[i][1]+","+elem1[i][2]+")",[scale[0],scale[1]]);
            }
            else null;
            i++;
        }
    }
}

function translateX(x, z, pos) {
    return ((x + pos) + (z * (x / perspective)));
}

function translateY(y, z, pos) {
    return ((y + pos) + (z * (y / perspective)));
}

function doRotateX(angle,group) {
    var rad, cosa, sina, Yn, Zn;

    rad = angle * Math.PI / 180;
    cosa = Math.cos(rad);
    sina = Math.sin(rad);
    for (let i = 0; i != group.length; i++) {
        Yn = (group[i][1] * cosa) - (group[i][2] * sina);
        Zn = (group[i][1] * sina) + (group[i][2] * cosa);
        group[i][1] = Yn;
        group[i][2] = Zn;
    }
}

function doRotateY(angle,group) {
    var rad, cosa, sina, Yn, Zn;

    rad = angle * Math.PI / 180;
    cosa = Math.cos(rad);
    sina = Math.sin(rad);
    for (let i = 0; i != group.length; i++) {
        Xn = (group[i][0] * cosa) - (group[i][2] * sina);
        Zn = (group[i][0] * sina) + (group[i][2] * cosa);
        group[i][0] = Xn;
        group[i][2] = Zn;
    }
}

function doRotateZ(angle,group) {
    var rad, cosa, sina, Yn, Zn;

    rad = angle * Math.PI / 180;
    cosa = Math.cos(rad);
    sina = Math.sin(rad);
    for (let i = 0; i != group.length; i++) {
        Xn = (group[i][0] * cosa) - (group[i][1] * sina);
        Yn = (group[i][0] * sina) + (group[i][1] * cosa);
        group[i][0] = Xn;
        group[i][1] = Yn;
    }
}

function doRotate(rotation,group) {
    doRotateX(rotation[0],group)
    doRotateY(rotation[1],group)
    doRotateZ(rotation[2],group)
}

function doX(elem1, at) {
    return translateX(elem1[0], elem1[2], at)
}

function doY(elem1, at) {
    return translateY(elem1[1], elem1[2], at)
}

function doPixel(elem1, color) {
    displayAtWork[1].strokeStyle = color;
    displayAtWork[1].strokeRect(elem1[0], elem1[1], 1, 1);
}

function doSprite(elem1, coord) {
    i = 2;
    for (let x = 0; x != elem1[0]; x++) {
        for (let y = 0; y != elem1[1]; y++) {
            if (elem1[i][0]+elem1[i][1]+elem1[i][2] == 0) {
                //pass
            }
            else {
                doPixel([coord[0]+x,coord[1]+y],"rgb("+elem1[i][0]+","+elem1[i][1]+","+elem1[i][2]+")")
            }
            i++;
        }
    }
}

function doLine(pos1, pos2, at, width, color) {
    displayAtWork[1].beginPath();
    displayAtWork[1].lineWidth = width;
    displayAtWork[1].strokeStyle = color;
    displayAtWork[1].moveTo(doX(pos1,at[0]), doY(pos1,at[1]));
    displayAtWork[1].lineTo(doX(pos2,at[0]), doY(pos2,at[1]));
    displayAtWork[1].stroke();
    displayAtWork[1].closePath();
}

function doX(elem1, at) {
    return translateX(elem1[0], elem1[2], at)
}

function doY(elem1, at) {
    return translateY(elem1[1], elem1[2], at)
}

function doNgon(elemlist, coord, width, color) {
    displayAtWork[1].beginPath();
    for (let i = 0; i < elemlist.length-1; i++) {
        doLine(elemlist[i],elemlist[i+1], coord, width, color);
    }
    doLine(elemlist[0],elemlist[elemlist.length-1], coord, width, color);
    displayAtWork[1].stroke();
    displayAtWork[1].closePath();
}

function doFillNgon(elemlist, coord, color) {
    displayAtWork[1].beginPath();
    displayAtWork[1].lineWidth = 0;
    displayAtWork[1].fillStyle = color;
    displayAtWork[1].moveTo(doX(elemlist[0],coord[0]), doY(elemlist[0],coord[1]));
    for (let i = 0; i < elemlist.length; i++) {
        displayAtWork[1].lineTo(doX(elemlist[i],coord[0]), doY(elemlist[i],coord[1]));
    }
    displayAtWork[1].fill();
    displayAtWork[1].closePath();
}

function doCircle(rad, coord, width, color) {
    displayAtWork[1].beginPath();
    displayAtWork[1].lineWidth = width;
    displayAtWork[1].strokeStyle = color;
    displayAtWork[1].arc(coord[0], coord[1], rad, 0, 2 * Math.PI, false);
    displayAtWork[1].stroke();
    displayAtWork[1].closePath();
}

function doFillCircle(rad, coord, color) {
    displayAtWork[1].beginPath();
    displayAtWork[1].fillStyle = color;
    displayAtWork[1].arc(coord[0], coord[1], rad, 0, 2 * Math.PI, false);
    displayAtWork[1].fill();
    displayAtWork[1].closePath();
}
