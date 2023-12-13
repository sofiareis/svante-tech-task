import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './GraphColor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faBackward } from "@fortawesome/free-solid-svg-icons";


function GraphColor({ dataset, time, row, column, velocity = 800 }) {
    const concentrationGraphRef = useRef(null)
    const [animationEnabled, setAnimationEnabled] = useState(false);
    const [iter, setIter] = useState(0);
    const [initData, setInitData] = useState(null);
    const [labels, setLabels] = useState(null);
    const [initTime, setInitTime] = useState(null);
    const [data, setData] = useState(null);
    const colorScale = d3
          .scaleThreshold()
          .domain([0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16])
          .range(['#020079', '#0021f3', '#8b48fe', '#00c0ff', ' #00d267', '#81e650', '#ffd200', '#ff8e00', '#ff5400']);
    const animationSpeedRef = useRef(velocity);

    const speedUpAnimation = () => {
        animationSpeedRef.current /= 2;
        console.log('spedup: ' + animationSpeedRef.current);
      };
  
    const speedDownAnimation = () => {
        animationSpeedRef.current *= 2;
        console.log('yoyo: ' + animationSpeedRef.current);
    };

    const restartAnimation = () => {
        animationSpeedRef.current = velocity;
        // clear existing chart
        d3.select(concentrationGraphRef.current).select('svg').remove();
        setIter(0)
        drawChart();
    };

    const width = 450;
    const height = 150;
    const margin = { top: 20, right: 80, bottom: 70, left: 50 };
    
    const yScale = d3
            .scaleLinear()
            .range([height, 0])
            .domain([0, 0]);

    useEffect(()=>{
      if (dataset.length > 0 && time.length > 0) {
        let initLabels = [];

        //Passing the correct data, labes, and time based on the given props
        if(column.length == 1 && row.length == 1){
            setInitData([dataset[row][column]])
            setInitTime(time[row])
            setData(dataset.map((val, i) => val[column]))
            initLabels.push(column);
        } else if (row.length == 1){
            setData(dataset)
            setInitTime(time[row])
            setInitData(dataset[row]);
            const col = [];
            dataset.map((d, i) => {
                col.push(Object.keys(d));
            })
            initLabels = col[0].map(Number)
        } else if (column.length == 1){
            setInitTime(time[0])
            setData(dataset.map((val, i) => [val[column]]))
            initLabels.push(column);
            setInitData([dataset[0][column]])
        } else{
            setData(dataset)
            setInitTime(time[0])
            setInitData(dataset[0])
            const col = [];
            dataset.map((d, i) => {
                col.push(Object.keys(d));
            })
            initLabels = col[0].map(Number)
        }

        setLabels(initLabels)      
      }
    },[dataset, time, row, column])    

    useEffect(()=>{
        if (initData && labels) {
            setAnimationEnabled(false)
            d3.select(concentrationGraphRef.current).select('svg').remove();
            setIter(0)
            drawChart();
        }
    },[initData, labels, initTime])    


    //set up animation
	useEffect(() => {
        if (animationEnabled) {
            const barInterval = setInterval(() => {
				if (iter < data.length){
					updateChart(data[iter], time[iter])
					setIter(iter+1);
				}
				else {
					clearInterval(barInterval);
				}
            }, (iter==0) ? 0 : animationSpeedRef.current);
            return () => clearInterval(barInterval);
        }
    }, [animationEnabled, iter])

    const drawChart = () => {
        const xMinValue = d3.min(labels);
        const xMaxValue = d3.max(labels);

        // create chart area
        const svg = d3
            .select(concentrationGraphRef.current)
            .append('svg')
            .attr("class", "chart")
            .attr("viewBox", [0, 0,  width + margin.left + margin.right,  height + margin.top + margin.bottom])
            .attr("width",  width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("style", "max-width: 100%; height: auto;")
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`); 
       

        // create scale for the x axis
        const xScale = d3
        .scaleLinear() //numerical 
        .domain([xMinValue, xMaxValue]) //min to max value
        .range([0, width]); //map domain to pixel size
        
        const barWidth = column.length == 1 ? 30 * 0.8 : (xScale(labels[1]) - xScale(labels[0])) * 0.8;

        var tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .style("background", "white")
            .text("tooltip");
    
        const bar = svg
        .append("g")
        .selectAll("rect")
        .data(initData)
        .join("rect")
        .attr("fill", d => colorScale(d))
        .join("rect")
        .style("mix-blend-mode", "multiply") 
        .attr('class', 'bar')
        .attr("x", (d, i) => xScale(labels[i]) - barWidth / 2) // center the bars on the tick marks
        .attr("y", height - 100)
        .attr("height", 100)
        .attr("width", barWidth)
        .text(function(d) { return d; })
        .on("mouseover", function(event, d){
            return tooltip.style("visibility", "visible");})
        .on("mousemove", function(event, d){
            tooltip.text(d);
            return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
        .on("mouseout", function(){
            return tooltip.style("visibility", "hidden");})
        
        svg
            .append('text')
            .attr('class', 'chart-title')
            .attr('x', width / 2)
            .attr('y', margin.top - 10)
            .attr('text-anchor', 'middle')
            .style('font-size', '16px')
            .style('font-weight', 'bold')
            .text('Time: ' + initTime + 's');


        // create the x axis on the bottom
        svg
        .append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`) //
        .call(d3.axisBottom().scale(xScale).tickSize(15));

        svg
        .append('text')
        .attr('class', 'y-axis-label')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left + 15)
        .attr('x', 0 - height / 2 - margin.top)
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .style('text-align', 'center') 
        .style('font-size', '14px')
        .text('CO2 (mol%)');

        svg
        .append('text')
        .attr('class', 'x-axis-label')
        .attr('transform', `translate(0,${height})`) //
        .attr('y', margin.bottom - 20)
        .attr('x', width / 2 )
        .style('text-anchor', 'middle')
        .style('text-align', 'center') 
        .style('font-size', '14px')
        .text('Axial Length (i.e., Nodes/Finite Volumes)');

        const legendRectSize = 13;
        const legendSpacing = 2;
        const reversedDomain = colorScale.domain().reverse();

        // create a legend on the right side
        const legend = svg
        .append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${width + margin.right - 10}, ${margin.top})`);

        const legendItems = legend
            .selectAll('.legend-item')
            .data(reversedDomain)
            .enter()
            .append('g')
            .attr('class', 'legend-item')
            .attr('transform', function (d, i) {
                var height = legendRectSize + legendSpacing;
                var horz = -2 * legendRectSize - 13; 
                var vert = i * height + margin.top;
                return 'translate(' + horz + ',' + vert + ')';
            });

        legendItems
            .append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .attr('fill', colorScale);

        legendItems
            .append('text') //labels
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .attr('font-size', '14px')
            .text((d) => d);
    };

    const updateChart = (newData, time) => {
        let svg = d3.select(concentrationGraphRef.current)

        const bars = svg.selectAll(".bar")
          .data(newData)
          .text(function(d) {return d})

        svg.select('.chart-title').text('Time: '+ time + 's');

        bars
        .transition()
        .duration(animationSpeedRef.current/2)  // duration of the transition in milliseconds
        .attr("fill", d => colorScale(d))
    };

    
    return (
        <div className='graph-color'>
            <div className='graph-color-background'>
            <div ref={concentrationGraphRef}/>
                {row.length > 1 && <div className='graph-color-buttons'>
                    <button className='button-graph-options'
						onClick={() => { setAnimationEnabled(!animationEnabled) }}>
							{animationEnabled ? "Pause" : "Play"}
					</button>
                    <button className='button-graph-options' onClick={restartAnimation}>
                        Restart
                    </button>
                    <button className='button-graph-options' onClick={speedDownAnimation}>
                        Slow Down
                        <FontAwesomeIcon icon={faBackward} className='button-speed-icon'/>
                    </button>
                    <button className='button-graph-options' onClick={speedUpAnimation}>
                        Speed Up 
                        <FontAwesomeIcon icon={faForward} className='button-speed-icon'/>
                    </button>
                </div>
                }
            </div>
        </div>
        )

};
  
  export default GraphColor;
