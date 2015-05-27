


$( document ).ready(function(){

    tree = new tree();
    tree.redraw();


    updateTree(39055, 0);
    //updateTree(39056, 1);
    //drawGraph();

    makeGraph("container",39055);
    makeGraph("container1",39056);

});

function updateGraph() {
	setTimeout(15000,function(){updateTree(39055, 0, updateGraph)});
};

function updateTree(channel, string) {
	console.log("updating");
	getData(channel, 1, function(data){
    	//console.log(data);
    	if (data.feeds.length) {
	    	//console.log(data.feeds[0]);
	    	var vals = [];
	    	for (var i = 1; i<7; i++) {
	    		var d = Number(data.feeds[0]["field"+i]);
	    		if (d < 0) {
	    			d = 0;
	    		}
	    		vals.push(d);
	    	}
	    	//console.log(vals);
	    	if (string == 0) {
		    	//drawGraph(channel,vals);
		    }
	    	tree.setData(string,vals.reverse());
	    }

	    setTimeout(function(){
	    	updateTree(channel,string);
	    },15000);
    });
}

function makeGraph(container, channel) {
	var jsonURL = "https://api.thingspeak.com/" + ("channels/" + channel + "/feed.json?results=" + 100);
    //
    // fetches json from the specied url
    //
    $.getJSON(jsonURL, function(data) {
    	//console.log(data);     
    	var valss = {};
    	var d = data.feeds;
    	//console.log(d);
    	for (var i=0;i<d.length;i++) {
    		//console.log(d[i]);
    		for (k in d[i]) {
    			//console.log(k);
    			//console.log(d[i][k]);
    			if (valss.hasOwnProperty(k)) {
    				
    			} else {
    				valss[k] = [];
    				
    			}

    			var val = Number(d[i][k]);
    			//console.log(d[i]["created_at"]);
    			var date = Date.parse(d[i]["created_at"]);
    			//console.log(date);
    				//console.log("added");
    				valss[k].push([date,val]);
    				//valss[k].push(val);
    		}
    	}

    	//console.log(valss);
    	drawGraph(container, valss)

    	//console.log(valss);
    });
}


function getData(channel, n, callback) {
	var jsonURL = "https://api.thingspeak.com/" + ("channels/" + channel + "/feed.json?results=" + n);
    //
    // fetches json from the specied url
    //
    $.getJSON(jsonURL, function(data) {
      
      callback(data);
    });
}


function drawGraph(container,data) {
	//console.log(data["field1"]);
    $('#'+container).highcharts({
    	chart: {
            type: 'spline'
        },
        title: {
            text: 'Temperature',
            x: -20 //center
        },
        subtitle: {
            text: 'Woodlands',
            x: -20
        },
        xAxis: {
        	type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }],
            min: 20,
            max: 30
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: '1',
            data: data["field1"]
        },{
            name: '1',
            data: data["field2"]
        },{
            name: '1',
            data: data["field3"]
        },{
            name: '1',
            data: data["field4"]
        },{
            name: '1',
            data: data["field5"]
        },{
            name: '1',
            data: data["field6"]
        }]
    });
}

