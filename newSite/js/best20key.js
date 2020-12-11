

// const svg = d3.select('#best50svg')
//   .append("svg")
//   .attr("preserveAspectRatio", "xMidYMid meet")
//   .attr("viewBox", "0 0 800 700")
//   .attr('width', 600)
//   .attr('height', 800)
//   .classed("best50svg", true);

var svg = d3.select(".best50svg")


const render = data =>{

    const xValue = d => d.count;
    const yValue = d => d.key;
    const margin = {
        top: 60,
        right: 20,
        bottom: 60,
        left: 100
    }

    const width = parseInt(svg.style("width"));
    const height = parseInt(svg.style("height"));
    // const width = +svg.attr('width');
    // const height = +svg.attr('height');
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, xValue)])
        .range([0,innerWidth])
        .nice();
    
    const xAxis = d3.axisBottom(xScale)
    .ticks(5)
    .tickFormat(d3.format(""))
    .tickSize(-innerHeight);

    const yScale = d3.scaleBand()
        .domain(data.map(yValue))
        .range([0,innerHeight])
        .padding(0.1);
    
    const yAxis =d3.axisLeft(yScale);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    //creo gli assi dopo aver creato il gruppo di elementi g
    g.append('g')
        .call(yAxis)
        .selectAll('.domain, .tick line')
        .remove();

    
    const xAxisG = g.append('g')
        .call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`);
        
    xAxisG.select('.domain')
        .remove();

    xAxisG.append('text')
        .attr('class', 'xAxisTitle')
        .attr('y', 50)
        .attr('x', innerWidth/2)
        .attr('fill', 'white')
        .text('Numero di articoli per keyword');
    

    g.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
        .attr('y', d => yScale(yValue(d)))
        .attr('x', 0)
        .attr('rx',5)
        .attr('width', d=>xScale(xValue(d)))
        .attr('height', yScale.bandwidth())

    g.append('text')
        .attr('class', 'titleTop50Key')
        .text("Top 20 keywords")
        .attr('y', -15);


};

d3.csv('/src/best50key.csv').then(data => {
    //parsing string to int
    data.forEach(d => {
        d.count = +d.count
    });

    render(data);


});