var fstar = function( x, y, w ) {
      var sz = 3*w/2, yy = y+w/2;
      return [
          x,       yy, 
          x-sz,    yy-sz,
          x,       yy-sz, 
          x,       yy-2*sz,
          x+sz,    yy-sz,
          x+2*sz,  yy-2*sz,
          x+2*sz,  yy-sz,
          x+3*sz,  yy-sz,
          x+2*sz,  yy,
          x+3*sz,  yy+sz,
          x+2*sz,  yy+sz,
          x+2*sz,  yy+2*sz,
          x+sz,    yy+sz,
          x,       yy+2*sz,
          x,       yy+sz,
          x-sz,    yy+sz
      ];
};

var createFlag = function( svgContainer, xCoord, yCoord, flagName, winProba, loseProba ){
    Snap.load( 'sprites.svg', function( f ) {
      var flag = f.select( '#'+flagName ).attr({ x:xCoord, y:yCoord, viewBox: '0 0 480 480' });
      svgContainer.append( flag );
    } );
    var p = { x: 110, y: 45 + yCoord };
    var w = 10;
    var l = 300;
    var arrow_ini = svgContainer.polygon( [p.x, p.y, p.x+l/3, p.y, p.x+l/3, p.y+w, p.x, p.y+w, p.x+(w/2),p.y+(w/2)] ).attr( { fill: '#ED1C24' } ); 
    var arrow_pasar = svgContainer.polygon( [p.x+l/3, p.y, p.x+l, p.y, p.x+l+(w/2), p.y+(w/2), p.x+l, p.y+w, p.x+l/3, p.y+w] ).attr( { fill: '#ED1C24' } );
    var arrow_nopasar = svgContainer.polygon( [p.x+l/3,p.y+w,p.x+l/3,p.y+w+l/6,p.x+l/3-w/2,p.y+l/6+3*w/2,p.x+l/3-w,p.y+w+l/6,p.x+l/3-w,p.y+w] ).attr( { fill: '#DEDEDE' } );
    var star_pasar = svgContainer.polygon( fstar( p.x+l+10, p.y, w ) ).attr( { fill: '#ED1C24' } );
    var pasar_txt = svgContainer.text( p.x+l+10.5, p.y+w/2+4, winProba ).attr( { fill: '#FFF', fontFamily: 'Bree Serif' } );
    var star_nopasar = svgContainer.polygon( fstar( p.x+l/3-2*w, p.y+l/6+3*w, w ) ).attr( { fill: '#DEDEDE' } );
    var nopasar_txt = svgContainer.text( p.x+l/3-2*w+5, p.y+l/6+7*w/2+4, loseProba ).attr( { fill: '#FFF', fontFamily: 'Bree Serif' } );  
    
}

var createSvgContainer = function( svgId ){
	var body = document.getElementsByTagName('body')[0];
    var svg = document.createElement('svg');
    svg.id = svgId;
    
    var br = document.createElement('br');
   
    body.appendChild(svg);
    body.appendChild(br);
}

var flagConvertion = {
                      Argentina: 'flag-ARG',
                      Bolivia: 'flag-BOL',
                      Brazil: 'flag-BRA',
                      Chile: 'flag-CHI',
                      Colombia: 'flag-COL',
                      Ecuador: 'flag-ECU',
                      Jamaica: 'flag-JAM',
                      Mexico: 'flag-MEX',
                      Paraguay: 'flag-PAR',
                      Peru: 'flag-PER',
                      Uruguay: 'flag-URU',
                      Venezuela: 'flag-VEN'
					};


var show = [
            {
            	title: 'Grupo A',
            	teams: ['Chile', 'Bolivia', 'Ecuador', 'Mexico']
            },
            {
            	title: 'Grupo B',
            	teams: ['Argentina', 'Jamaica', 'Paraguay', 'Uruguay']
            },
            {
            	title: 'Grupo C',
            	teams: ['Brazil', 'Colombia', 'Peru', 'Venezuela']
            }            
            ];

var figHeight = 160;
var figWidth = 480;
d3.tsv("../data.tsv", function(data) {
	
	var countryData = {};
	
	for( i = 0; i < data.length; i++ ){
		var equipo = data[i]["Equipo"];
		countryData[equipo] = data[i];
	}
	
	for( i = 0; i < show.length; i++ ){
		
		var title = show[i]['title'];
		var teams = show[i]['teams'];
		var countTeams = teams.length;
		
		var svgId = title.replace(/\s/g, '');
		//createSvgContainer(svgId);
		
		var s = Snap( '#'+svgId ).attr({
		    height: figHeight*4,
		    width: figWidth,
		    id: svgId
		});
		var xCoord = 0;
		var yCoord = 0;
		for( j = 0; j < teams.length; j++ ){
			var percent = Math.round(countryData[teams[j]]["Cuartos"]*100, 3);
			
			createFlag(s,xCoord, yCoord,flagConvertion[teams[j]],percent+'%',(100-percent)+'%');
			yCoord += figHeight;
		}
		console.log(s);
	}
});
