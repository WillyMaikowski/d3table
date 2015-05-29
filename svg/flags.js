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

var createFlag = function( svgContainer, xCoord, yCoord, flagName, winProba, looseProba, color ){
    Snap.load( 'sprites.svg', function( f ) {
      var flag = f.select( '#'+flagName ).attr({ x:xCoord, y:yCoord, viewBox: '0 0 600 600' });
      svgContainer.append( flag );
    } );
    var p = { x: 90, y: 35 + yCoord };
    var w = 10;
    var l = 300;
    var arrow_ini = svgContainer.polygon( [p.x, p.y, p.x+l/3, p.y, p.x+l/3, p.y+w, p.x, p.y+w, p.x+(w/2),p.y+(w/2)] ).attr( { fill: color } ); 
    var arrow_pasar = svgContainer.polygon( [p.x+l/3, p.y, p.x+l, p.y, p.x+l+(w/2), p.y+(w/2), p.x+l, p.y+w, p.x+l/3, p.y+w] ).attr( { fill: color } );
    var arrow_nopasar = svgContainer.polygon( [p.x+l/3,p.y+w,p.x+l/3,p.y+w+l/6,p.x+l/3-w/2,p.y+l/6+3*w/2,p.x+l/3-w,p.y+w+l/6,p.x+l/3-w,p.y+w] ).attr( { fill: '#DEDEDE' } );
    var star_pasar = svgContainer.polygon( fstar( p.x+l+10, p.y, w ) ).attr( { fill: color } );
    var pasar_txt = svgContainer.text( p.x+l+10.5, p.y+w/2+4, winProba ).attr( { fill: '#FFF', fontFamily: 'Bree Serif' } );
    var star_nopasar = svgContainer.polygon( fstar( p.x+l/3-2*w, p.y+l/6+3*w, w ) ).attr( { fill: '#DEDEDE' } );
    var nopasar_txt = svgContainer.text( p.x+l/3-2*w+5, p.y+l/6+7*w/2+4, looseProba ).attr( { fill: '#FFF', fontFamily: 'Bree Serif' } );  
    
}

var createSvgContainer = function( svgId ){
	var body = document.getElementsByTagName('body')[0];
  var svg = document.createElement('svg');
  svg.id = svgId;
  
  var br = document.createElement('br');
   
  body.appendChild(svg);
  body.appendChild(br);
}

var conf = {
  Argentina:  { c: '#FBAA19', f: 'flag-ARG', g: 'B' },
  Bolivia:    { c: '#FFD400', f: 'flag-BOL', g: 'A' },
  Brazil:     { c: '#FFF200', f: 'flag-BRA', g: 'C' },
  Chile:      { c: '#ED1C24', f: 'flag-CHI', g: 'A' },
  Colombia:   { c: '#FFCB05', f: 'flag-COL', g: 'C' },
  Ecuador:    { c: '#FFCB05', f: 'flag-ECU', g: 'A' },
  Jamaica:    { c: '#FFD400', f: 'flag-JAM', g: 'B' },
  Mexico:     { c: '#ED1C24', f: 'flag-MEX', g: 'A' },
  Paraguay:   { c: '#ED1C24', f: 'flag-PAR', g: 'B' },
  Peru:       { c: '#ED1C24', f: 'flag-PER', g: 'C' },
  Uruguay:    { c: '#FBAA19', f: 'flag-URU', g: 'B' },
  Venezuela:  { c: '#FFD400', f: 'flag-VEN', g: 'C' }
}

var figHeight = 90;
var figWidth = 480;
d3.tsv("../data_local.tsv", function(data) {
	console.log(data);
	for( i = 0; i < data.length; i++ ){
		var equipo = data[i]["Equipo"];
		conf[equipo]['d'] = data[i];
	}
  var s = {
    A: Snap( '#GrupoA' ).attr({ height: figHeight*4, width: figWidth, id: 'GrupoA' }),
    B: Snap( '#GrupoB' ).attr({ height: figHeight*4, width: figWidth, id: 'GrupoB' }),
    C: Snap( '#GrupoC' ).attr({ height: figHeight*4, width: figWidth, id: 'GrupoC' }),
  };
  var ycoord = { A: 0, B: 0, C: 0 };
  $.each( conf, function( k, v ) {
    var perc = Math.round( Number(v.d.Cuartos)*100, 3 );
    createFlag( s[v.g], 0, ycoord[v.g], v.f, perc+'%', (100-perc)+'%', v.c );
    ycoord[v.g] += figHeight;
  } );
} );
$('#myTab a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})
