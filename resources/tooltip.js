g.selectAll('circle')
        .data(locations)
        .enter()
        .append('cx', function(d){
          if(d.geometry){
            return projection([d.geometry.coordinates[0],d.geometry.coordinates[1]])[0];
          }

      })
        .attr('cy', function(d){
          if(d.geometry){
            return projection([d.geometry.coordinates[0],d.geometry.coordinates[1]])[1];
          }
      })
       .attr('r', function(d){
        if(d.properties.mass){
          return Math.pow(parseInt(d.properties.mass), 1/9);
        }
      })
        .style('fill', function(d){
          return d.color;
      })
       .on('mouseover',function(d){
        d3.select(this).style('fill', 'black');
          //d3.select('#name').text(d.properties.name);
          //d3.select('#name').text(d.properties.name);
          //d3.select('#name').text(d.properties.name);
          //d3.select('#name').text(d.properties.name);
          //d3.select('#name').text(d.properties.name);
        d3.select('#tooltip')
          .style('left', (d3.event.pageX + 20)+ 'px')
          .style('top', (d3.event.pageY + 80)+ 'px')
          .style('display','black')
          .style('opacity', 0.8)
      })
        .on('mouseout',function(d){
          d3.select(this).style('fill', d.color);
          d3.select('#tip')
            .style('display', 'none');
      });
