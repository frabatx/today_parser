

// const svg = d3.select('#best50svg')
//   .append("svg")
//   .attr("preserveAspectRatio", "xMidYMid meet")
//   .attr("viewBox", "0 0 800 700")
//   .attr('width', 600)
//   .attr('height', 800)
//   .classed("best50svg", true);

var svg = d3.select("#graficoMensilePiccolosvg")

const render = data =>{

    const xValue = d => d.diciannove;
    const xValueSX = d=>d.venti;
    const yValue = d => d.keys;
    const margin = {
        top: 60,
        right: 80,
        bottom: 60,
        left: 250
    }

    // const width = parseInt(d3.select('.best50key').style('width'));
    // const height = parseInt(d3.select('.best50key').style('height'));
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, xValue)])
        .range([0,innerWidth])
        .nice();
    
    const xAxis = d3.axisBottom(xScale)
    .ticks(6)
    .tickSize(-innerHeight);

    const yScale = d3.scaleBand()
        .domain(data.map(yValue))
        .range([0,innerHeight])
        .padding(0.1);
    
    const yAxis =d3.axisLeft(yScale);

    const g = svg.append('g')
        .attr('class', 'dextra')
        .attr('transform', `translate(${margin.left + innerWidth/3}, ${margin.top})`);

    const sxg = svg.append('g')
        .attr('transform', `translate(${margin.left + innerWidth/3}, ${height-margin.bottom})`);
    //creo gli assi dopo aver creato il gruppo di elementi g
    g.append('g')
        .call(yAxis)
        .attr('class','ciao')
        .selectAll('.domain, .tick line')
        .remove();

    g.selectAll('.tick text')
        .style('font-size', '1.3em' )

    
    const xAxisG = g.append('g')
        .call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`);

    xAxisG.select('.domain')
        .remove();

    xAxisG.append('text')
        .attr('class', 'xAxisTitle')
        .attr('y', 50)
        .attr('x', innerWidth/2-120)
        .attr('fill', 'white')
        .text('Numero di articoli totali per keyword');
        

    g.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
        .attr('y', d => yScale(yValue(d)))
        .attr('x', 0)
        .attr('rx',5)
        .attr('width', d=>xScale(xValue(d)))
        .attr('height', yScale.bandwidth())


    const xScaleSX = d3.scaleLinear()
        .domain([0, 250])
        .range([innerWidth,0])

    const yScaleSX = d3.scaleBand()
        .domain(data.map(yValue))
        .range([innerHeight,0])
        .padding(0.1);
    
    const xAxisSX = d3.axisBottom(xScaleSX)
    .ticks(6)
    .tickSize(-innerHeight);

    const xAxisSxG = g.append('g')
        .call(xAxisSX)
        .attr('transform', `translate(-270, ${innerHeight})`);

    xAxisSxG.select('.domain')
        .remove();

    sxg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
        .attr('y', d => yScaleSX(yValue(d)))
        .attr('x', 100)
        .attr('rx',5)
        .attr('width', d=>xScale(xValueSX(d)))
        .attr('height', yScale.bandwidth())
        .attr('transform', 'rotate(180)')
        //.attr('transform', `translate(0,0)`);
    sxg.append('text')
        .attr('class', 'titleTop50Key')
        .text("2020 vs 2019")
        .attr('y', -innerHeight-15)
        .attr('x', 35-innerWidth );
    
};

d3.csv('/src/compared20192020.csv').then(data => {
    //parsing string to int
    data.forEach(d => {
        d.diciannove = +d.diciannove
        d.venti = +d.venti
    });
    console.log(data)
    render(data);


});