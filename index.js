// making some notes
d3.json(
        "https://raw.githubusercontent.com/xcelsiorbosi/uniEx4/master/fatalities.json",
  function(data) {
    console.log(data);


    // choosing padding and width and height of svg
    var margin = { top: 20, right: 50, bottom: 20, left: 20 };
    var w = 1000;
    var h = 500 - margin.top;

    // the data to be visualized
    var dataset = data["data"];
    


    // tooltip code 
    var tip = d3
      .tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html(function(d) {
        var date = d[0];
        var months = [
          // changed to message for tooltip
          "Recorded Fatalities",

          // "February",
          // "March",
          // "April",
          // "May",
          // "June",
          // "July",
          // "August",
          // "September",
          // "October",
          // "November",
          // "December"
        ];
        return (
          "<strong> " +
          d[1] +
          " Fatalities" +
          " </strong><br> <p> " +
          date.getFullYear() +
          " - " +
          months[date.getMonth()] +
          "</p>"
        );
      });

    // appending svg into the body tag
    var svg = d3
      .select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h + 100);

    svg.call(tip);

     // dataset to be plotted
    dataset = dataset.map(function(d) {
      return [new Date(d[0]), d[1]];
    });
    
    // setting the scale for X-Axis
    var xScale = d3.time
      .scale()
      .domain([new Date(1980, 1, 1), new Date(2020, 1, 1)])
      .range([62, w - margin.right]);

    // setting the scale for Y-Axis
    var yScale = d3.scale.linear().domain([0, 100]).range([h, 0]);
length

    // plotting data by using svg rectangle as bar of the bar chart
    svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", function(d) {return xScale(d[0]);})
      .attr("y", function(d, i) {return yScale(d[1]);})
      .attr("width", function(d, i) {return w / dataset.length *0.75;})
      .attr("height", function(d) {return h - yScale(d[1]);})
      .style("stroke", "black") 

      .attr("class", "bar")
      .attr("fill", "#8E0101")
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);



    // Y-Axis for the plot
    var yAxis = d3.svg.axis().scale(yScale).orient("left");
    
    // placing Y-Axis
    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + 60 + ", " + 0 + ")")
      .call(yAxis);

    // X-Axis for the plot
    var xAxis = d3.svg
      .axis()
      .scale(xScale)
      .orient("bottom")
      .tickFormat(d3.time.format("%Y"));

    // placing X-Axis for the plot
    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + 0 + "," + h + ")")
      .attr("y", h)
      .call(xAxis);

    // placing footer
    svg
      .append("text")
      .attr("x", 100)
      .attr("y", h + 60)
      .text(
        "Units: Individual Fatalities"
          );

      function redraw() {
          svg.selectAll("rect")
          .data(dataset)
          .transition()
          .duration(2500)
          .delay(200)
          .attr("height", function(d) {return h - yScale(d[1]);})
          .attr("width", function(d) {return (xScale(d[0])) + (10)
          });
      }

setInterval(redraw(), 3500);

})
   