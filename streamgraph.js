chart("data_by_revenue.csv", "orange");

var datearray = [];
var colorrange = [];

function updateData() {  
    var graph = document.getElementById("graph");
    var line = document.getElementById("line");  
    graph.remove();
    line.remove();
    chart("data_by_revenue.csv", "orange"); 
}

function updateData1() {  
    var graph = document.getElementById("graph");
    var line = document.getElementById("line");  
    graph.remove();
    line.remove();
    chart("data_by_action_genre.csv", "blue");
    
}

function updateData2() {  
    var graph = document.getElementById("graph");
    var line = document.getElementById("line");  
    graph.remove();
    line.remove();
    chart("data_by_rp_genre.csv", "blue");
}

function updateData3() {  
    var graph = document.getElementById("graph");
    var line = document.getElementById("line");  
    graph.remove();
    line.remove();
    chart("data_by_shooter_genre.csv", "blue");
}

function updateData4() {  
    var graph = document.getElementById("graph");
    var line = document.getElementById("line");  
    graph.remove();
    line.remove();
    chart("data_by_consoles.csv", "pink");
}

function updateData5() {  
    var graph = document.getElementById("graph");
    var line = document.getElementById("line");  
    graph.remove();
    line.remove();
    chart("data_by_handhelds.csv", "pink");
}

function chart(csvpath, color) {

if (color == "blue") {
  colorrange = ["#045A8D", "#2B8CBE", "#74A9CF", "#A6BDDB", "#D0D1E6", "#F1EEF6"];
}
else if (color == "pink") {
  colorrange = ["#980043", "#DD1C77", "#DF65B0", "#C994C7", "#D4B9DA", "#F1EEF6"];
}
else if (color == "orange") {
  colorrange = ["#B30000", "#E34A33", "#FC8D59", "#FDBB84", "#FDD49E", "#FEF0D9"];
}
strokecolor = colorrange[0];

var format = d3.time.format("%m/%d/%y");

var margin = {top: 20, right: 200, bottom: 45, left: 25};
var width = document.body.clientWidth - margin.left - margin.right;
var height = 450 - margin.top - margin.bottom;

var tooltip = d3.select("body")
        .append("div")
        .attr("id", "tooptip_content")
        .style("position", "absolute")
        .style("z-index", "20") // z-index or "bring-to-top"
        .style("visibility", "visible") //"visible" was originally "hidden"
        .attr("font-size", "20px")
        .style("color", "white");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height-10, 0]);

var z = d3.scale.ordinal()
    .range(colorrange);

//Custom axis scale
var axisScale = d3.scale.linear()
                        .domain([2005,2014])
                        .range([0,width]);
    
var xAxis = d3.svg.axis()
    .scale(axisScale)
    .orient("bottom")
    .tickFormat(d3.format("d"));

var yAxis = d3.svg.axis()
    .scale(y);

var yAxisr = d3.svg.axis()
    .scale(y);

var stack = d3.layout.stack()
    .offset("silhouette")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value; });

var nest = d3.nest()
    .key(function(d) { return d.key; });

var area = d3.svg.area()
    .interpolate("cardinal")
    .x(function(d) { return x(d.date); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

var svg = d3.select(".chart").append("svg")
    .attr("id", "graph")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var graph = d3.csv(csvpath, function(data) {
  data.forEach(function(d) {
    d.date = format.parse(d.date);
    d.value = d3.round(+d.value, 2);
    d.genre = d. genre;
    d.total = d3.round(d.total, 2);
    d.company = d. company;
    d.console = d. console;
  });

  var layers = stack(nest.entries(data));

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);

  svg.selectAll(".layer")
            .data(layers)
            .enter().append("path")
            .attr("class", "layer")
            .attr("stroke", "#DCDCDC")
            .attr("width", "2px")
            .attr("d", function(d) { return area(d.values); })
            //.style("fill", function(d, i) { return z(i); });        
            .style("fill", function(d, i) {
                if (d.values[1].total < 1) {
                    return z(0);
                }
                else if (d.values[1].total <= 2) {
                    return z(1);
                }
                else if (d.values[1].total <= 5) {
                    return z(2);
                }
                else if (d.values[1].total <= 10) {
                    return z(3);
                }
                else if (d.values[1].total <= 20) {
                    return z(4);
                }
                else return z(5);
            });  

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
    /*
            .append("text")
            .attr("class", "label")
            .attr("y", 40)
            .attr("x", width/2)
            .style("text-anchor", "end")
            .attr("font-size", "16px")
            .text("Years"); 

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + width + ", 0)")
            .call(yAxis.orient("right"));
        
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis.orient("left"))
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", -40)
            .attr("x", -130)
            .style("text-anchor", "end")
            .attr("font-size", "16px")
            .text("Revenue in Millions of USD"); */
        
    svg.selectAll(".layer")
        .attr("opacity", 1)
        .on("mouseover", function(d, i) {
            d3.select(this)
            .transition()
            //.duration(250)
                //.attr('stroke-width', "3px");
                .attr('opacity',".4");
            
            })
            .on("mousemove", function(d, i) {
                mousex = d3.mouse(this);
                mousex = mousex[0];
                var invertedx = x.invert(mousex);
                invertedx = invertedx.getMonth() + invertedx.getDate();
                var selected = (d.values);
                for (var k = 0; k < selected.length; k++) {
                    datearray[k] = selected[k].date
                    datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
                }

                mousedate = datearray.indexOf(invertedx);
                pro = d.values[mousedate].value;

                d3.select(this)
                    .attr("stroke-width", "2px"),
                    tooltip.html( "<h4>" + d.key + "<br>" + "Genre:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + d.values[mousedate].genre + "<br>" + "Company:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + d.values[mousedate].company + "<br>" + "Console:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + d.values[mousedate].console + "<br>" + "Annual Revenue:&nbsp; " + pro + " million USD" + "<br>" + "Total Revenue:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + d.values[mousedate].total + " million USD" + "<br>" + "</h4>" ).style("visibility", "visible");

    })

            .on("mouseout", function(d, i) {
                svg.selectAll(".layer")
                    .transition()
                    .duration(250)
                    .attr('opacity', 1)
                    d3.select(this)
                        .attr('stroke-width', '1px')
                        tooltip.html( "<h4>" + d.key + "<br>" + "Genre:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + d.values[mousedate].genre + "<br>" + "Company:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + d.values[mousedate].company + "<br>" + "Console:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + d.values[mousedate].console + "<br>" + "Annual Revenue:&nbsp; " + pro + " million USD" + "<br>" + "Total Revenue:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + d.values[mousedate].total + " million USD" + "<br>" + "</h4>" ).style("visibility", "hidden");
  });
    
    //Code for legend items begins here
        var LegendInfo1 = d3.select("svg")
            .append("text")
            .attr("y", 40)
            .attr("x", width + 40)
            .style("font-size", "14px")
            .style("top", "143px")
            .style("bottom", "0px")
            .text("Each shape shows how");
    
        var LegendInfo2 = d3.select("svg")
            .append("text")
            .attr("y", 55)
            .attr("x", width + 40)
            .style("font-size", "14px")
            .style("top", "143px")
            .style("bottom", "0px")
            .text("much one game earned");
    
        var LegendInfo2 = d3.select("svg")
            .append("text")
            .attr("y", 70)
            .attr("x", width + 40)
            .style("font-size", "14px")
            .style("top", "143px")
            .style("bottom", "0px")
            .text("in revenue");
    
        //Text for Height portion
        var LegendInfo3 = d3.select("svg")
            .append("text")
            .attr("y", 100)
            .attr("x", width + 40)
            .style("font-size", "16px")
            .attr("font-weight", "bold")
            .style("top", "143px")
            .style("bottom", "0px")
            .text("Height:");
        
    
        var LegendInfo4 = d3.select("svg")
            .append("text")
            .attr("y", 115)
            .attr("x", width + 40)
            .style("font-size", "14px")
            .style("top", "143px")
            .style("bottom", "0px")
            .text("shows yearly revenue");
    
    
        //Text for Width portion
        var LegendInfo5 = d3.select("svg")
            .append("text")
            .attr("y", 145)
            .attr("x", width + 40)
            .style("font-size", "16px")
            .attr("font-weight", "bold")
            .style("top", "143px")
            .style("bottom", "0px")
            .text("Width:");
            
        var LegendInfo6 = d3.select("svg")
            .append("text")
            .attr("y", 160)
            .attr("x", width + 40)
            .style("font-size", "14px")
            .style("top", "143px")
            .style("bottom", "0px")
            .text("shows longevity");
    
    
        //This is "The area of the shape (and its color) corresponds to the game's total lifetime revenue through the end of 2014"
        var LegendInfo7 = d3.select("svg")
            .append("text")
            .attr("y", 190)
            .attr("x", width + 40)
            .style("font-size", "14px")
            .style("top", "143px")
            .style("bottom", "0px")
            .text("the");
    
        var LegendInfo8 = d3.select("svg")
            .append("text")
            .attr("y", 190)
            .attr("x", width + 63)
            .attr("font-weight", "bold")
            .style("font-size", "14px")
            .style("top", "143px")
            .style("bottom", "0px")
            .text("area");
            
        var LegendInfo9 = d3.select("svg")
            .append("text")
            .attr("y", 190)
            .attr("x", width + 94)
            .style("font-size", "14px")
            .style("top", "143px")
            .style("bottom", "0px")
            .text("of the shape");
    
        var LegendInfo10 = d3.select("svg")
            .append("text")
            .attr("y", 205)
            .attr("x", width + 40)
            .style("font-size", "14px")
            .style("top", "143px")
            .style("bottom", "0px")
            .text("(and its ");
    
        var LegendInfo11 = d3.select("svg")
            .append("text")
            .attr("y", 205)
            .attr("x", width + 91)
            .style("font-size", "14px")
            .attr("font-weight", "bold")
            .style("top", "143px")
            .style("bottom", "0px")
            .text("color");
    
        var LegendInfo12 = d3.select("svg")
            .append("text")
            .attr("y", 205)
            .attr("x", width + 127)
            .style("font-size", "14px")
            .style("top", "143px")
            .style("bottom", "0px")
            .text(")");
    
        var LegendInfo13 = d3.select("svg")
            .append("text")
            .attr("y", 220)
            .attr("x", width + 40)
            .style("font-size", "14px")
            .style("top", "143px")
            .style("bottom", "0px")
            .text("corresponds to the");
    
        var LegendInfo14 = d3.select("svg")
            .append("text")
            .attr("y", 235)
            .attr("x", width + 40)
            .style("font-size", "14px")
            .style("top", "143px")
            .style("bottom", "0px")
            .text("game's total revenue");
    
        var LegendInfo14 = d3.select("svg")
            .append("text")
            .attr("y", 250)
            .attr("x", width + 40)
            .style("font-size", "14px")
            .style("top", "143px")
            .style("bottom", "0px")
            .text("through 2014");
    
    
    //Legend code for total revenue
    var LegendHeader = d3.select("svg")
            .append("text")
            .attr("y", 85 + (height/2))
            .attr("x", width + 55)
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .style("top", "143px")
            .style("bottom", "0px")
            .text("Total Revenue"); 
    
    var textItem1 = d3.select("svg")
            .append("text")
            .attr("y", 105 + (height/2))
            .attr("x", width + 80)
            .style("font-size", "16px")
            .style("top", "143px")
            .style("bottom", "0px")
            .text("< $1 million"); 
                
       var textItem2 = d3.select("svg")
            .append("text")
            .attr("y", 125 + (height/2))
            .attr("x", width + 80)
            .style("font-size", "16px")
            .style("top", "143px")
            .style("bottom", "0px")
            .text("< $2 million"); 
    
       var textItem3 = d3.select("svg")
            .append("text")
            .attr("y", 145 + (height/2))
            .attr("x", width + 80)
            .style("font-size", "16px")
            .style("top", "143px")
            .style("bottom", "0px")
            .text("< $5 million"); 
                
       var textItem4 = d3.select("svg")
            .append("text")
            .attr("y", 165 + (height/2))
            .attr("x", width + 80)
            .style("font-size", "16px")
            .style("top", "143px")
            .style("bottom", "0px")
            .text("< $10 million"); 
                       
       var textItem5 = d3.select("svg")
            .append("text")
            .attr("y", 185 + (height/2))
            .attr("x", width + 80)
            .style("font-size", "16px")
            .style("top", "143px")
            .style("bottom", "0px")
            .text("< $20 million"); 
    
        var textItem6 = d3.select("svg")
            .append("text")
            .attr("y", 205 + (height/2))
            .attr("x", width + 80)
            .style("font-size", "16px")
            .style("top", "143px")
            .style("bottom", "0px")
            .text("$20+ million"); 
    
        //Code for creating rectangles and corresponding colors in legend
         var rectLeg1 = d3.select("svg")
            .append("rect")
            .attr("y", 92 + (height/2))
            .attr("x", width + 60)
            .attr("width", 16)
            .attr("height", 16)
            .style("fill", z(0))
            .attr("font-size", "16px")
            .style("top", "143px")
            .style("bottom", "0px");
                 
         var rectLeg2 = d3.select("svg")
            .append("rect")
            .attr("y", 112 + (height/2))
            .attr("x", width + 60)
            .attr("width", 16)
            .attr("height", 16)
            .style("fill", z(1))
            .attr("font-size", "16px")
            .style("top", "143px")
            .style("bottom", "0px");
         
         var rectLeg3 = d3.select("svg")
            .append("rect")
            .attr("y", 132 + (height/2))
            .attr("x", width + 60)
            .attr("width", 16)
            .attr("height", 16)
            .style("fill", z(2))
            .attr("font-size", "16px")
            .style("top", "143px")
            .style("bottom", "0px");
                  
         var rectLeg4 = d3.select("svg")
            .append("rect")
            .attr("y", 152 + (height/2))
            .attr("x", width + 60)
            .attr("width", 16)
            .attr("height", 16)
            .style("fill", z(3))
            .attr("font-size", "16px")
            .style("top", "143px")
            .style("bottom", "0px");
         
          var rectLeg5 = d3.select("svg")
            .append("rect")
            .attr("y", 172 + (height/2))
            .attr("x", width + 60)
            .attr("width", 16)
            .attr("height", 16)
            .style("fill", z(4))
            .attr("font-size", "16px")
            .style("top", "143px")
            .style("bottom", "0px");
          
          var rectLeg6 = d3.select("svg")
            .append("rect")
            .attr("y",192 + (height/2))
            .attr("x", width + 60)
            .attr("width", 16)
            .attr("height", 16)
            .style("fill", z(5))
            .attr("font-size", "16px")
            .style("top", "143px")
            .style("bottom", "0px");
            
        var vertical = d3.select(".chart")
            .append("div")
            .attr("class", "remove")
            .attr("id", "line")
            .style("position", "absolute")
            .style("z-index", "19")
            .style("width", "1px")
            .style("height", "400px")
            //Change this variable to adjust the height of the dynamic white line.
            .style("top", "270px")
            .style("bottom", "30px")
            .style("left", "0px")
            .style("background", "#fff")
            .style("visibility", "hidden");


    
    //Changes position of white line
    d3.select(".chart")
        .on("mousemove", function(){
                mousex = d3.mouse(this);
                mousex = mousex[0] + 5;
                vertical.style("left", mousex + "px" )
                vertical.style("visibility", "hidden")})
        .on("mouseover", function(){
                mousex = d3.mouse(this);
                mousex = mousex[0] + 5;
                vertical.style("left", mousex + "px")
                vertical.style("visibility", "hidden")})
        .on("mouseout", function(){
                    vertical.style("visibility", "hidden")});
    
    });
    
}
