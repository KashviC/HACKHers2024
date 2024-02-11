console.log("start of script");

//     <script src="https://d3js.org/d3.v4.min.js"></script>

// use fetch api to load csv file then process data?
    // ADD UP ALL THE PRICE of those from the same company

data = FileAttachment("outputfile.csv").csv({typed: "auto"})
console.log(data)
    // typed: auto... auto infer data types for each col (saves from manually specifying data types)
    // company, item, price, dates

// specify dimensions of container
const width = 1000, height = 500;
const margin = {top:30, bottom:30, left:40, right: 0};

// creating the svg container in the div
    // .attr('nameOfAttr', val to assign to attr)
const svg = d3.select("#d3-chart-container")
    .append('svg')
    .attr('height', height - margin.top - margin.bottom) // in pixels
    .attr('width', width - margin.left - margin.right)
    .attr('viewBox', [0, 0, width, height]);
    // viewbox: define coord system+aspect ratio

// define data

// create scales (map data vals to visual->height/pos)
    // x-axis -> amount of $, linear scale (nums)
    // y-axis -> col name, ordinal scale (discrete cat data -> labels)
const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.price)])
    .range([margin.left, width - margin.right]);
const y = d3.scaleBand()
    .domain(d3.sort(data, d => -d.price).map(d => d.company)) // arr holding values we want to map: names
    .range([height - margin.bottom, margin.top]); 
// domain: rep input vals you want to map, array holding min/max vals of data [min, max]
// ouput vals (pixel pos + colors)

// add rectangle for each company 
svg.append("g")
    .attr("fill", "steelblue")
    .selectAll()
    .data(data)
    .join("rect")
        .attr("x", x(0))
        .attr("y", (d) => y(d.company))
        .attr("width", (d) => x(d.price) - x(0))
        .attr("height", y.bandwith());

// label each company's bar
svg.append("g")
        .attr("fill", "white")
        .attr("text-anchor", "end")
    .selectAll()
    .data(data)
    .join("text")
        .attr("x", (d) => x(d.price))
        .attr("y", (d) => y(d.company) + y.bandwith()/2)
        .text((d) => format(d.price))
    // much smaller purhcases have text format slightly different
    .call((text) => text.filter(d => x(d.frequency) - x(0) < 20)
        .attr("dx", +4)
        .attr("fill", "black")
        .attr("text-anchor", "start")
    ); 

// axes
svg.append("g")
    .attr("transform", translate(`translate(0,${margin.top})`))
    .call(d3.axisTop(x).ticks(width/80, "%"))
    .call(g => g.select(".domain").remove());

svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSizeOuter(0));


// draw bars by binding svg rectangles/bars -> enter()
// add visual properties

return svg.node();