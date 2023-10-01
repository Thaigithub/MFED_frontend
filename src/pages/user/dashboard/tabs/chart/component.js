import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function ChartComponent({ data, width, height }){
    const svgRef = useRef(null);

    useEffect(() => {
        if (data.real.length===0 | data.forecast.lenth===0) return;
        d3.select(svgRef.current).selectAll('*').remove();
        
        const svg = d3.select(svgRef.current);
        const realData = data['real'];
        const forecastData = data['forecast'];
        

        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const chartwidth = width - margin.left - margin.right;
        const chartheight = height - margin.top - margin.bottom;
    
        const xScale = d3.scaleTime().domain(d3.extent([...realData, ...forecastData], d => d.time)).range([0, chartwidth]);
        const yScale = d3.scaleLinear().domain([0, d3.max([...realData, ...forecastData], d => d.data)]).nice().range([chartheight, 0]);
        
        const lineReal = d3.line()
        .x(d => xScale(d.time))
        .y(d => yScale(d.data))
        .curve(d3.curveLinear);

        const lineForecast = d3.line()
        .x(d => xScale(d.time))
        .y(d => yScale(d.data))
        .curve(d3.curveLinear);

        const chart = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
        chart.append('g')
        .attr('transform', `translate(0,${chartheight})`)
        .call(d3.axisBottom(xScale));

        chart.append('g')
        .call(d3.axisLeft(yScale));

        chart.append('path')
        .datum(realData)
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('stroke-width', 4)
        .attr('d', lineReal);

        chart.append('path')
        .datum(forecastData)
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-width', 4)
        .attr('d', lineForecast);
    }, [data, width, height]);

    return<svg ref={svgRef} width={width} height={height}/>
}