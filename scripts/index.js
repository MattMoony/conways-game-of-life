function create_init() {
    for (let y = 0; y < Math.floor(canvas.height/globs.tile_side); y++) {
        cells.push([]);
        for (let x = 0; x < Math.floor(canvas.width/globs.tile_side); x++) {
            cells[y].push(0);
        }
    }

    Cells.populize_random();
    // Cells.spawn_at(0, 0, Patterns.self_made.one);

    // Cells.spawn_at(0, 0, Patterns.still_lifes.block);
    // Cells.spawn_at(0, 5, Patterns.still_lifes.beehive);
    // Cells.spawn_at(0, 11, Patterns.still_lifes.loaf);
    // Cells.spawn_at(0, 18, Patterns.still_lifes.boat);
    // Cells.spawn_at(0, 24, Patterns.still_lifes.tub);

    // Cells.spawn_at(6, 0, Patterns.oscillators.blinker);
    // Cells.spawn_at(6, 6, Patterns.oscillators.toad);
    // Cells.spawn_at(6, 13, Patterns.oscillators.beacon);

    // Cells.spawn_at(0, 0, Patterns.maps.gosper_glider_gun_right_down)

    // Cells.spawn_at(13, 0, Patterns.oscillators.pentadecathlon);
    // Cells.spawn_at(23, 0, Patterns.oscillators.pulsar);

    // Cells.spawn_at(10, 0, Patterns.spaceships.lightweight_spaceship_right);
    // Cells.spawn_at(10, 10, Patterns.spaceships.middleweight_spaceship_right);
    // Cells.spawn_at(10, 20, Patterns.spaceships.heavyweight_spaceship_right);
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
}

window.onload = function() {
    create_init();

    
    (function () {
        draw_grid();
        Cells.show_cells();
    })();
    tick_intval = window.setInterval(main_loop, globs.tick_pause);
};
