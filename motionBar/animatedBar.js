//javascript 
var data = [{"year":1982, "fatalities":8},
            {"year":1984, "fatalities":28},
            {"year":1986, "fatalities":15},
            {"year":1987, "fatalities":6},
            {"year":1988, "fatalities":7},
            {"year":1989, "fatalities":15},
            {"year":1990, "fatalities":10},
            {"year":1991, "fatalities":35},
            {"year":1992, "fatalities":9},
            {"year":1993, "fatalities":23},
            {"year":1994, "fatalities":5},
            {"year":1995, "fatalities":6},
            {"year":1996, "fatalities":6},
            {"year":1997, "fatalities":9},
            {"year":1998, "fatalities":14},
            {"year":1999, "fatalities":42},
            {"year":2000, "fatalities":7},
            {"year":2001, "fatalities":5},
            {"year":2003, "fatalities":7},
            {"year":2004, "fatalities":5},
            {"year":2005, "fatalities":17},
            {"year":2006, "fatalities":21},
            {"year":2007, "fatalities":53},
            {"year":2008, "fatalities":17},
            {"year":2009, "fatalities":39},
            {"year":2010, "fatalities":9},
            {"year":2011, "fatalities":19},
            {"year":2012, "fatalities":71},
            {"year":2013, "fatalities":35},
            {"year":2014, "fatalities":18},
            {"year":2015, "fatalities":46},
            {"year":2016, "fatalities":71},
            {"year":2017, "fatalities":117},
            {"year":2018, "fatalities":28}];


//bar height and width
var drawingWidth = 2000;
var barWidth = 10;

// total height depends on no of data points,  plus giving it a little bit of padding
var drawingHeight = (barWidth + 1) * data.length;

// the scaling needs range of data(domain call) and the range in pixel
// first is x and second is y axis.
// So,  given any data value, it scales it to pixels
// Here it is given in linear scale
var y = d3.scaleLinear().domain([0, data.length]).range([0, drawingHeight]);
var x = d3.scaleLinear().domain([0, d3.max(data, function(datum) 
            { 
              return datum.fatalities
            }) + 100
        ]).rangeRound([0, drawingWidth]);

// svg drawing space with height and width specified
var barDemo = d3.select('#animated-bar')
             .append('svg')
             .attr('width', drawingWidth)
             .attr('height', drawingHeight);


// append svg:rect for each data
// location of x coordinate (from top left 0, 0 origin)
// location of y coordinate (from top left 0, 0 origin)
// from x location provide the width
// from y location provide the height
// then fill in the color

barDemo.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("y", function(datum, index) { return y(index)})
  .attr("height", barWidth)
  .attr("width", function(datum) { return x(datum.fatalities)})
  .attr("fill", function(datum) { 
         return "rgba(" + (datum.fatalities + 20 ) + ",  0,  0,  0.9)"});
function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min ) + 1) + min;
}


// var i;
// for (i = 0; i< data.length; i++){
//     barDemo.selectAll("rect").
//     data(data[i]).
//     transition().
//     duration(2500).
//     delay(200).
//     attr("width", function(datum) { 
//         return x(datum[0]) + getRandomInRange(1, 100) 
// });
// }

// var counter;
// counter =0;
// //animate the bar by changing the width 




function redraw() {
    barDemo.selectAll("rect")
    .data(data)
    .transition()
    .duration(2500)
    .delay(200)
    .attr("width", function(datum) { 
        return x(datum.fatalities) + (5*datum.fatalities) 
    });
}

// calls redraw every few seconds
setInterval(redraw(), 1000);




