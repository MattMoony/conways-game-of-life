// -- GLOBALS -- //

var canvas = document.getElementById('main'),
    ctx = canvas.getContext('2d');

var globs = {
    tick_pause: 100,
    tile_side: 30,
    alive_cells: 100
},
    cells = [],
    tick_intval = null;

// ------------- //