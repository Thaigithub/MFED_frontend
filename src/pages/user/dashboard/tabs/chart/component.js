import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function ChartComponent({ data, width, height }){
    const svgRef = useRef(null);

    useEffect(() => {
        d3.select(svgRef.current).selectAll('*').remove();

        const temperatureData = data
        const svg = d3.select(svgRef.current);
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;
    
        const x = d3
        .scaleTime()
        .domain(d3.extent(temperatureData, (d) => d.time))
        .range([0, width]);
    
        const y = d3
        .scaleLinear()
        .domain([0, d3.max(temperatureData, (d) => d.data)])
        .nice()
        .range([height, 0]);
    
        const xAxis = d3.axisBottom(x);
        const yAxis = d3.axisLeft(y);
    
        svg
        .append('g')
        .attr('transform', `translate(${margin.left},${height + margin.top})`)
        .call(xAxis);
    
        svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .call(yAxis);
    
        const line = d3
        .line()
        .x((d) => x(d.time))
        .y((d) => y(d.data));
    
        svg
        .append('path')
        .datum(temperatureData)
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('d', line);
    }, [data, width, height]);

    return<svg ref={svgRef} width={width} height={height}/>
}