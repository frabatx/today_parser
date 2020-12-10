

const svg = d3.select('#drogaTrento');

// var svg = d3.select(".graficoAnnuale")
//   .append("svg")
//   .attr("preserveAspectRatio", "xMidYMid meet")
//   .attr("viewBox", "0 0 800 1000")
//   .classed("graficoAnnualeSvg", true);


const render = data =>{
    // Settaggi generali
    const margin = {top: 60,right: 50,bottom: 100,left: 50}
    const width = +svg.attr('width');
    const height = +svg.attr('height')
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    // Settaggi view
    const title = "Droga a Trento"
    const xAxisLabel = "Mesi";
    const yAxisLabel = "Numero di articoli";
    const xValue = d => d.timestamp;
    const yValue = d => d.counts;
    // Settaggi assi
    const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0,innerWidth])
    .nice();

    
    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([innerHeight,0])
        .nice();
    
    const xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format(""))
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

    yAxisG.selectAll(".tick line")
        .attr("stroke","rgb(87, 87, 87)");

    yAxisG.append('text')
        .attr('class', 'axisTitle')
        .attr('y', -40)
        .attr('x', -innerHeight/2)
        .attr('fill', 'white')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .text(yAxisLabel);
    
    // Asse x
    const xAxisG = g.append('g')
        .call(xAxis)
        .attr('transform', `translate(0, ${innerHeight+15})`);
        
    xAxisG.select('.domain')
        .remove();
    
    xAxisG.selectAll(".tick line")
        .attr("stroke","rgb(87, 87, 87)");


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
        .attr('d', lineGenerator(data));

    // g.selectAll('circle')
    // .data(data)
    // .enter()
    // .append('circle')
    //     .attr('cy', d => yScale(yValue(d)))
    //     .attr('cx', d => xScale(xValue(d)))
    //     .attr('r', 5)

    g.append('text')
        .attr('class', 'titleTop50Key')
        .text(title)
        .attr('y', -15);

    g.selectAll('.tick text')
        .style('font-size', '1.3em' )



};

d3.csv('/src/drogaTrento.csv').then(data => {
    //parsing string to int
    data.forEach(d => {
        d.counts = +d.counts;
        d.timestamp = +d.timestamp;
    });
    render(data);


});