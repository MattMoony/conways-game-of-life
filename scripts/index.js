function game_init() {
    for (let y = 0; y < Math.floor(canvas.height/globs.tile_side); y++) {
        cells.push([]);
        for (let x = 0; x < Math.floor(canvas.width/globs.tile_side); x++) {
            cells[y].push(0);
        }
    }

    Cells.populize_random();
}

function draw_grid() {
    ctx.strokeStyle = "#515151";
    ctx.lineWidth = "0.1";

    ctx.beginPath();
    for (let x = 0; x < canvas.width; x+=globs.tile_side) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }

    for (let y = 0; y < canvas.height; y+=globs.tile_side) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }

    ctx.stroke();
}

function main_loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    draw_grid();

    Cells.update_cells();
    Cells.show_cells();

    console.log('asdf');
}

window.onload = function() {
    game_init();
    tick_intval = window.setInterval(main_loop, globs.tick_pause);
};