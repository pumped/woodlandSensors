



function tree() {
    this.sensorPos = [
        {
            x: 175,
            y: 100,
            x2: 200
        },{
            x: 625,
            y: 100,
            x2: 200
        },{
            x: 400,
            y: 100,
            x2: 200
        }
    ];

    this.nodeA = {
        size: 80,
        blur: 2
    };

    this.currentData = [
        [0,0,0,0,0,0],
        [0,0,0,0,0,0]
    ];

    this.mm = this.minmax(this.currentData);

    this.getColor(24);

    this.setup();
};

tree.prototype.getColor = function(value) {
    //console.log(value);

    var newMax = 180;
    var newMin = 40;
    var newRange = newMax - newMin;

    var oldRange = this.mm[1] - this.mm[0];

    var color = (((value - this.mm[0]) * newRange) / oldRange) + newMin;

    var red = color;
    var blue = newMax - color;
    var col = "rgb("+Math.round(red)+",0,"+Math.round(blue)+")";

    return col;
}

tree.prototype.minmax = function(data) {
    var minT = [];
    var maxT = [];

    for (i in data) {
        var nData = data;

        var nData = removeZeros(nData);
        //console.log(nData);

        for (var j in data[i]) {
            //console.log(j);
            removeElement(data[i],0);    
    }
        //console.log("removal");        
        //console.log(nData[i])
        minT.push(Math.min.apply(null, nData[i]));
        maxT.push(Math.max.apply(null, nData[i]));
    }

    var min = Math.min.apply(null, minT);
    var max = Math.max.apply(null, maxT)

    //console.log("Min: "+ min+", Max: "+max);
    return [min,max];
}

function removeZeros (array) {
    var data = array.slice();
    //console.log(array);
    //console.log(data);
    for (var j in data[i]) {
            //console.log(j);
            removeElement(data[i],0);    
    }
    return data;
}

function removeElement(arrayName,arrayElement)
 {
    for(var i=0; i<arrayName.length;i++ )
     { 
        if(arrayName[i]==arrayElement)
            arrayName.splice(i,1); 
      } 
}

tree.prototype.redraw = function() {
    // create image
    var image = this.draw.image('tree.jpg');
    image.size(400, 650).move(0,-50);
    image.opacity(0.5);

    var image = this.draw.image('tree.jpg');
    image.size(400, 650).move(450,-50);
    image.opacity(0.5);

    var xCoord = [200, 450];
    this.drawTree(xCoord, 30, 6, false);


};

tree.prototype.setData = function(i,data) {
    console.log(data);
    //console.log("data added");
    this.currentData[i] = data;
    this.mm = this.minmax(this.currentData);
    //console.log(this.currentData);
    this.draw.clear();   
    this.redraw();
}

tree.prototype.setup = function() {
        this.draw = SVG('drawing')
        .size(900,600);
};

tree.prototype.drawTree = function(xCoord, y, sensorCount, data) {

    //draw x
    
    var len = xCoord[1] - xCoord[0];

    xGroup = this.xGroup = this.draw.group("Tree")
    this.gradA = {};

    for (var j=0; j<this.currentData.length; j++) {
        for (var i=0; i<this.currentData[j].length; i++) {
            //create gradient
            var that = this;
            var grad = this.gradA[i] = this.draw.gradient('radial', function(stop) {
                  stop.at({ offset: 0, color: that.getColor(that.currentData[j][i]), opacity: 0.8 })
                  stop.at({ offset: 1, color: that.getColor(that.currentData[j][i]), opacity: 0 })
                });

            //draw
            this.drawSensor(xGroup, [this.sensorPos[j].x, ((len/6)*i)+xCoord[0]], grad);
        }
    }
};

tree.prototype.drawSensor = function(group, xy, color) {
    //console.log('drawing sensor');
    sensor = group.circle(this.nodeA.size);
    sensor.move(xy[0],xy[1]);
    sensor.fill(color);
};

