// @TODO: YOUR CODE HERE!
// Creating width and height variables for the chart
var svgWidth = 1000;
var svgHeight = 700;

var margin = {
  top: 30,
  right: 30,
  bottom: 70,
  left: 70
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Creating an SVG wrapper anf appending an SVG group to hold the chart, then shifting the chart by left and top margins
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Importing data
d3.csv("assets/data/data.csv").then(function(statesData){
    // Parsing data as numbers
    statesData.forEach(function(data){
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });

    // Creating scale functions
    var xLinearScale = d3.scaleLinear()
        .domain([(d3.min(statesData, d => d.poverty)-1),(d3.max(statesData, d => d.poverty)+1)])
        .range([0,width]);

    var yLinearScale = d3.scaleLinear()
        .domain([(d3.min(statesData, d => d.healthcare)-1),(d3.max(statesData, d => d.healthcare)+1)])
        .range([height,0]);

    // Creating axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Appending Axes to the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Creating circles
    chartGroup.selectAll("circle")
        .data(statesData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "15")
        .attr("class", "stateCircle");

    // Adding State abbreviations to the circles
    chartGroup.selectAll("text")
        .data(statesData)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => (yLinearScale(d.healthcare)+4))
        .attr("class", "stateText")
        .attr("font-size", "12")
        .text(d => d.abbr)
                
    // Creating axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("class", "aText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "aText")
      .text("In Poverty (%)");
//   }).catch(function(error) {
//     console.log(error);
  });