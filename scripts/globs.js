// -- GLOBALS -- //

var canvas = document.getElementById('main'),
    ctx = canvas.getContext('2d');

var globs = {
    tick_pause: 50,
    tile_side: 20,
    alive_cells: 500
},
    cells = [],
    tick_intval = null;

// ------------- //
