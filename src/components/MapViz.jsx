import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const categoryColors = {
  Music: '#A855F7',
  Fashion: '#EC4899',
  Lifestyle: '#14B8A6',
  Food: '#F59E0B',
  Tech: '#3B82F6'
}

export default function MapViz({ data, onSelect }){
  const ref = useRef(null)

  useEffect(()=>{
    const w = ref.current.clientWidth
    const h = Math.max(520, ref.current.clientHeight || 560)

    const svg = d3.select(ref.current).append('svg')
      .attr('width', w)
      .attr('height', h)
      .style('background', '#000')

    const x = d3.scaleLinear().domain([0,100]).range([50, w-30])
    const y = d3.scaleLinear().domain([0,10]).range([h-40, 30])

    const xAxis = d3.axisBottom(x).ticks(10).tickSize(-h+70).tickPadding(8)
    const yAxis = d3.axisLeft(y).ticks(10).tickSize(-w+80).tickPadding(8)

    svg.append('g')
      .attr('transform', `translate(0, ${h-40})`)
      .call(xAxis)
      .selectAll('text').attr('fill','#aaa')
    svg.selectAll('.domain, .tick line').attr('stroke','#222')

    svg.append('g')
      .attr('transform', `translate(50, 0)`)
      .call(yAxis)
      .selectAll('text').attr('fill','#aaa')
    svg.selectAll('.domain, .tick line').attr('stroke','#222')

    svg.append('text')
      .attr('x', w/2).attr('y', h-8)
      .attr('fill','#bbb').attr('text-anchor','middle').text('Brand Fit Score (0–100)')

    svg.append('text')
      .attr('transform','rotate(-90)')
      .attr('x', -h/2).attr('y', 15)
      .attr('fill','#bbb').attr('text-anchor','middle').text('Engagement Rate (%)')

    const rScale = d3.scaleSqrt().domain([8000, 2500000]).range([3, 18])

    svg.selectAll('circle.node')
      .data(data, d=>d.id)
      .join('circle')
      .attr('class','node')
      .attr('cx', d=>x(d.brand_fit_score))
      .attr('cy', d=>y(d.engagement_rate))
      .attr('r', d=>rScale(d.followers))
      .attr('fill', d=>categoryColors[d.category] || '#888')
      .attr('fill-opacity', 0.9)
      .attr('stroke', '#000')
      .attr('stroke-width', 1)
      .style('cursor','pointer')
      .on('mouseenter', function(){
        d3.select(this).attr('stroke','#fff').attr('stroke-width',2)
      })
      .on('mouseleave', function(){
        d3.select(this).attr('stroke','#000').attr('stroke-width',1)
      })
      .on('click', (_, d)=> onSelect && onSelect(d))

    return ()=>{
      d3.select(ref.current).selectAll('*').remove()
    }
  }, [data, onSelect])

  return <div ref={ref} className="w-full h-[72vh] rounded-lg border border-zinc-800"></div>
}
