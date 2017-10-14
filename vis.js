// full heat map
var margin = { top: 50, right: 0, bottom: 50, left: 30 },
    height = 600 - margin.top - margin.bottom,
    width = 430 * 1.5 - margin.left - margin.right,
    gridSize = Math.floor(height / 24),
    legendElementWidth = gridSize*2,
    colors = ["#fee5d9", "#cb181d"], // green = ["#edf8e9", "#006d2c"],
    days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    times = ["12a", "1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a",
             "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p"];

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return days[d.day-1] + " at " + times[d.hour-1] + ": " + d.value + " min";
  });

var dayLabels = svg.selectAll(".dayLabel")
    .data(days)
    .enter().append("text")
      .text(function (d) { return d; })
      .attr("x", function (d, i) { return i * gridSize * 3.2; })
      .attr("y", 0)
      .style("text-anchor", "middle")
      .attr("transform", "translate(" + gridSize * 1.6 + ", -6)")
      .attr("class", function (d, i) {
                            return ((i > 0 && i <= 5) ?
                                "dayLabel mono axis axis-workweek" :
                                "dayLabel mono axis");
                     });

var timeLabels = svg.selectAll(".timeLabel")
    .data(times)
    .enter().append("text")
      .text(function(d) { return d; })
      .attr("x", 0)
      .attr("y", function (d, i) { return i * gridSize; })
      .style("text-anchor", "end")
      .attr("transform", "translate(-6, " + gridSize / 1.5 + ")")
      .attr("class", function(d, i) {
                            return ((i >= 8 && i <= 17) ?
                                "timeLabel mono axis axis-worktime" :
                                "timeLabel mono axis");
                     });

d3.csv('data.csv',
  function(d) {
    return {
      day: +d.day,
      hour: +d.hour,
      value: +d.value
    };
  },
  function(error, data) {
    if (error) {
      console.log(error);
      return;
    }

    var colorScale = d3.scale.linear()
        .domain([ 0, d3.max(data, function (d) { return d.value; }) ])
        .range(colors);

    var cards = svg.selectAll(".hour")
        .data(data, function(d) {return d.day+':'+d.hour;});

    cards.append("title");

    svg.call(tooltip);

    cards.enter().append("rect")
        .attr("x", function(d) { return (d.day - 1) * gridSize * 3.2; })
        .attr("y", function(d) { return (d.hour - 1) * gridSize})
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("class", "hour bordered")
        .attr("width", gridSize * 3.2)
        .attr("height", gridSize)
        .on('mouseover', tooltip.show)
        .on('mouseout', tooltip.hide)
        .style("fill", function(d) { return colorScale(d.value); });

    cards.transition().duration(1000)
        .style("fill", function(d) { return colorScale(d.value); });

    cards.select("title").text(function(d) { return d.value; });

    cards.exit().remove();

    svg.append("g")
      .attr("class", "legend")
      .attr("transform", "translate(520,100)");

    var legend = d3.legend.color()
      .shapeWidth(30)
      .title('Minutes')
      .scale(colorScale);

    svg.select(".legend")
      .call(legend);
});

// timeline code
jQuery(document).ready(function($){
  var $timeline_block = $('.cd-timeline-block');

  // hide timeline blocks which are outside the viewport
  $timeline_block.each(function(){
    if($(this).offset().top > $(window).scrollTop()+$(window).height()*0.75) {
      $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
    }
  });

  // on scolling, show/animate timeline blocks when enter the viewport
  $(window).on('scroll', function(){
    $timeline_block.each(function(){
      if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75
                  && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
        $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
      }
    });
  });
});