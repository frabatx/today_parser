

// const svg = d3.select('#best50svg');

var svg = d3.select(".graficoAnnuale")
  .append("svg")
  .attr("preserveAspectRatio", "xMidYMid meet")
  .attr("viewBox", "0 0 1000 1000")
  .classed("graficoAnnualeSvg", true);


const render = data =>{
    // Settaggi generali
    const margin = {top: 60,right: 30,bottom: 20,left: 150}
    const width = parseInt(d3.select('.graficoAnnuale').style('width'));
    const height = parseInt(d3.select('.graficoAnnuale').style('height'));
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const paddingX = 5;
    // Settaggi view
    const title = "Articoli per anno"
    const xAxisLabel = "Anno";
    const yAxisLabel = "Numero di articoli";
    const xValue = d => d.timestamp;
    const yValue = d => d.counts;
    // Settaggi assi
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, xValue))
        .range([paddingX,innerWidth])
        .nice();
    
    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([innerHeight,0])
        .nice();
    
    const xAxis = d3.axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(10);

    const yAxis = d3.axisLeft(yScale)
            .tickSize(-innerWidth)
            .tickPadding(10);

    // Nuovo gruppo all'interno dell'svg
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Creo gli assi dopo aver creato il gruppo di elementi g
    // Asse y
    const yAxisG = g.append('g')
        .call(yAxis)
        
    yAxisG.selectAll('.domain')
        .remove();

    yAxisG.append('text')
        .attr('class', 'axisTitle')
        .attr('y', -70)
        .attr('x', -innerHeight/2)
        .attr('fill', 'white')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .text(yAxisLabel);
    
    // Asse x
    const xAxisG = g.append('g')
        .call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`);
        
    xAxisG.select('.domain')
        .remove();

    xAxisG.append('text')
        .attr('class', 'axisTitle')
        .attr('y', 50)
        .attr('x', innerWidth/2)
        .attr('fill', 'white')
        .text(xAxisLabel);
    
    const lineGenerator = d3.line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)));

    g.append('path')
    .attr('class', 'linePath')
        .attr('stroke', 'black')
        .attr('d', lineGenerator(data));

    g.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', 5)

    g.append('text')
        .attr('class', 'titleTop50Key')
        .text(title)
        .attr('y', -15);


};

d3.csv('/src/countPerYear.csv').then(data => {
    //parsing string to int
    data.forEach(d => {
        d.counts = +d.counts;
        d.timestamp = +d.timestamp;
    });
    render(data);


});