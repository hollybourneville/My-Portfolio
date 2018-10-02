//bar graph - amount of time plastic is in use vs how long it takes to break dwon


// $(function() {

// 	var i = 55555;

// 	// while(true) {

// 		setInterval(function(){ 
// 			$('#counter').empty().html(i++); 
// 		}, 30);
// 	// }



// });


var width = 600,
	height = 200,
	margin = 100;


var info = [

	{
		year:'2000',
		values:[
			{name:'Fish',weight:3, icon:'fish'},
			{name:'Plastic',weight:0.8, icon:'plastic'}
		]
	},
	{
		year:'2025',
		values:[
			{name:'Fish',weight:3, icon:'fish'},
			{name:'Plastic',weight:1, icon:'plastic'}
		]
	},	
	{
		year:'2050',
		values:[
			{name:'Fish',weight:3, icon:'fish'},
			{name:'Plastic',weight:4, icon:'plastic'}
		]
	},
	


];

var spacing = width/info.length;
var barWidth =(spacing/2)/info[0].values.length;

var iconHeight = height/4;

var colGen = d3.scaleOrdinal(['#01cbe1','#003755']);

var yScale = d3.scaleLinear()
				.domain([0,4])
				.range([height,0]);
// var yScale2 = d3.scaleLinear()
// 				.domain([0,4])
// 				.range([height,0]);

var yAxisGen = d3.axisLeft(yScale).ticks(3);
// var yAxisGen2 = d3.axisRight(yScale2).ticks(3);

var chart = d3.select('.chart')
			.attr('viewBox','0 0 '+(width+margin*2)+' '+(height+margin*2))
			.append('g')
			.attr('transform','translate('+margin+','+margin+')');




var date = chart.selectAll('g')
						.data(info)
						.enter()
						.append('g')
						.attr('transform',(d,i)=>'translate('+i*spacing+',0)');

date.append('text')
			.text((d) => d.year)
			.attr('y',height+80)
			.attr('x',spacing/2)
			.attr('text-anchor','middle');

chart.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 20 - margin)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Metric Tons")
      .attr('font-size','10px');
    


var barGroups = date.append('g')
					.attr('transform',(d,i)=>'translate('+spacing/4+',0)');


var barRectCollection = [];
barGroups.each(function(d){

	var rectGroup = d3.select(this)
		.selectAll('g')
		.data(d.values)
		.enter()
		.append('g')
		.attr('transform',(d,i)=>'translate('+i*barWidth+',0)')



	let barRect = rectGroup.append('rect')
		.attr('width',barWidth)
		.attr('height',0)
		.attr('y',height)
		// .attr('x',(d,i)=>i*barWidth)
		.attr('fill',(d,i)=>colGen(d.name))
		// .transition()
		// .duration(2000)
		// .attr('y',(d) => yScale(d.weight))
		// .attr('height',(d) => height - yScale(d.weight));

	barRectCollection.push(barRect);


	rectGroup.append('g')
			.attr('transform','translate(0,'+height+')')
			.append(function(d){
				console.log('.icons .' + d.icon);
				return document.querySelector('.icons .' + d.icon).cloneNode(true);
			})
			.attr('transform','scale('+barWidth/100+')')//spacing is divided by 100 beacuse it is the origial size of the icon, this keeps it to scale
			.attr('fill',(d,i)=>colGen(d.name));
});	



$(document).on('scroll',function(){

	if($(document).scrollTop() > 300){
		_(barRectCollection).each(function(barRect){
			barRect.transition()
			.duration(900)
			.attr('y',(d) => yScale(d.weight))
			.attr('height',(d) => height - yScale(d.weight));
		});
	}



})


chart.append('g')
	.call(yAxisGen);

$(function(){

	$('.counter').counterUp({
	    delay: 10,
	    time: 1500
	});


});	

$(function(){

	var center = {lat:19.809602, lng:162.142619};

	var map = L.map('map',{scrollWheelZoom:false}).setView(center,3);

	
    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaG9sbHlib3VybmV2aWxsZSIsImEiOiJjamtrZXlydTgwOGV4M3FvMjRmeGRoanVyIn0.jiZCNE5TVqmM8Ovl2lMVKw').addTo(map);

    L.circle([30.108106, 177.124718], {

            radius: 1970000,
            color: '#003755',
            weight:1, // this is the width of the stroke
            fill:'#003755'
            }).addTo(map);//center is center of where you want the circle to be can also be coordinates

    var marker = L.marker([30.108106, 177.124718]).addTo(map);


    var popup = L.popup({
    	// closeButton:false,
        closeOnClick:false,
        className: 'custom-popup',
        // content:'<div><iframe width="560" height="315" src="https://www.youtube.com/embed/9aHHVGHRffo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div><div class="content"><h3>Pitt Head Lookout</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia iusto quia totam ab consectetur laboriosam similique natus vitae voluptatibus, porro officiis dignissimos dicta, aut non iure voluptas odio?</p></div>',


    })
    .setLatLng([30.108106, 177.124718])
    .setContent('<div><iframe width="560" height="315" src="https://www.youtube.com/embed/0uU1ZyQ1OwA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div><div class="content"><h3>Great Pacific Garbage Patch</h3><p>The Great Pacific Garbage Patch is a collection of marine debris in the North pacific Ocean. Marine debris is litter that ends up in oceans, seas and other large bodies of water. The Great Pacific Garbage Patch covers an estimated surface of 1.6 million square kilometers.</p></div>')



    marker.on('click',function(){

          if(map.hasLayer(popup)){
              map.closePopup(popup);
          }else{

            map.addLayer(popup);

          }

        });

    //     var points =[
    //     {
    //         latlng:{lat:30.108106, lng:177.124718},
    //         description:'Great Pacific Garbage Patch',
    //         // icon:'circleaccom.svg',
    //         popup:{
    //             className:'custom-popup',
    //             content:'<div><iframe width="560" height="315" src="https://www.youtube.com/embed/9aHHVGHRffo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div><div class="content"><h3>Pitt Head Lookout</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia iusto quia totam ab consectetur laboriosam similique natus vitae voluptatibus, porro officiis dignissimos dicta, aut non iure voluptas odio?</p></div>',
    //             latlng:{lat:30.108106, lng:177.124718},
                
                
    //         }
           
    //     },
    // ];    

});


