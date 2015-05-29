var conf = {
  Argentina:  { c: '#FBAA19', f: 'flag-ARG', g: 'B' },
  Bolivia:    { c: '#FFD400', f: 'flag-BOL', g: 'A' },
  Brazil:     { c: '#FFD400', f: 'flag-BRA', g: 'C' },
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

var f = {
  star: function( x, y, w ) {
    var sz = 3*w/2, yy = y+w/2;
    return [x,yy,x-sz,yy-sz,x,yy-sz,x,yy-2*sz,x+sz,yy-sz,x+2*sz,yy-2*sz,x+2*sz,yy-sz,x+3*sz,yy-sz,x+2*sz,
    yy,x+3*sz,yy+sz,x+2*sz,yy+sz,x+2*sz,yy+2*sz,x+sz,yy+sz,x,yy+2*sz,x,yy+sz,x-sz,yy+sz];
  },
  a_ini: function( x, y, l, w ) {
    return [x,y,x+l/3,y,x+l/3,y+w,x,y+w,x+(w/2),y+(w/2)];
  },
  a_pas: function( x, y, l, w ) {
    return [x+l/3,y,x+l,y,x+l+(w/2),y+(w/2),x+l,y+w,x+l/3,y+w];
  },
  a_nop: function( x, y, l, w ) {
    return [x+l/3,y+w,x+l/3,y+w+l/6,x+l/3-w/2,y+l/6+3*w/2,x+l/3-w,y+w+l/6,x+l/3-w,y+w];
  }
};


var createFlag = function( svgContainer, xCoord, yCoord, flagName, winProba, color ){
  var p = { x: 90, y: 35 + yCoord };
  var w = 10;
  var l = 300;
  var nocolor = '#DEDEDE';
  var pmayor = winProba >= (100-winProba);
  svgContainer.polygon( f.a_ini( p.x, p.y, l, w ) ).attr( { fill: color, class: flagName, opacity: 0 } );
  svgContainer.polygon( f.a_pas( p.x, p.y, l, w ) ).attr( { fill: pmayor?color:nocolor, class: flagName, opacity: 0 } );
  svgContainer.polygon( f.a_nop( p.x, p.y, l, w ) ).attr( { fill: pmayor?nocolor:color, class: flagName, opacity: 0 } );
  svgContainer.polygon( f.star( p.x+l+10, p.y, w ) ).attr( { fill: pmayor?color:nocolor, class: flagName, opacity: 0 } );
  svgContainer.polygon( f.star( p.x+l/3-2*w, p.y+l/6+3*w, w ) ).attr( { fill: pmayor?nocolor:color, class: flagName, opacity: 0 } );
  svgContainer.text( p.x+l+10.5, p.y+w/2+4, winProba+'%' ).attr( { fill: '#FFF', fontFamily: 'Bree Serif', class: flagName, opacity: 0 } );
  svgContainer.text( p.x+l/3-2*w+5, p.y+l/6+7*w/2+4, (100-winProba)+'%' ).attr( { fill: '#FFF', fontFamily: 'Bree Serif', class: flagName, opacity: 0 } );

  Snap.load( 'sprites.svg', function( f ) {
    var flag = f.select( '#'+flagName ).attr({ x:xCoord, y:yCoord, viewBox: '0 0 600 600' });
    flag.mouseover( function() {
      $.each( conf, function( k, v ) {
        if( v.f != flagName ) svgContainer.selectAll( '.'+v.f ).animate( { opacity: 0 }, 200 );
        else svgContainer.selectAll( '.'+flagName ).animate( { opacity: 1 }, 200 );
      } );
    } );
    svgContainer.append( flag );
  } );

}


var figHeight = 90;
var figWidth = 480;
d3.tsv("../data_local.tsv", function(data) {
	for( i = 0; i < data.length; i++ ){
		var equipo = data[i]["Equipo"];
		conf[equipo]['d'] = data[i];
	}
  var s = {
    A: Snap( '#GrupoA' ).attr({ height: figHeight*4+60, width: figWidth, id: 'GrupoA' }),
    B: Snap( '#GrupoB' ).attr({ height: figHeight*4+60, width: figWidth, id: 'GrupoB' }),
    C: Snap( '#GrupoC' ).attr({ height: figHeight*4+60, width: figWidth, id: 'GrupoC' }),
  };
  var ycoord = { A: 0, B: 0, C: 0 };
  $.each( conf, function( k, v ) {
    var perc = Math.round( Number(v.d.Cuartos)*100, 3 );
    createFlag( s[v.g], 0, ycoord[v.g], v.f, perc, v.c );
    s[v.g].rect(300, 0, 0.5, 500).attr({opacity: 0.1});
    ycoord[v.g] += figHeight;
  } );
} );
$('#myTab a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})
