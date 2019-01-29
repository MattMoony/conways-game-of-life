function create_init() {
    for (let y = 0; y < Math.floor(canvas.height / globs.tile_side); y++) {
        cells.push([]);
        for (let x = 0; x < Math.floor(canvas.width / globs.tile_side); x++) {
            cells[y].push(0);
        }
    }
}

function draw_grid() {
    ctx.strokeStyle = "#515151";
    ctx.lineWidth = "0.1";

    ctx.beginPath();
    for (let x = 0; x < canvas.width; x += globs.tile_side) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }

    for (let y = 0; y < canvas.height; y += globs.tile_side) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }

    ctx.stroke();
}

function refresh() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_grid();

    Cells.show_cells();

    let out = "[<br/>";
    for (let y = 0; y < cells.length; y++) {
        out += "[";
        for (let x = 0; x < cells[y].length; x++) {
            out += x==cells[y].length-1 ? cells[y][x] : cells[y][x]+", ";
        }
        out += "]" + (y == cells.length-1?"<br />":", <br/>");
    }
    out += "]";

    document.getElementById('output_div').innerHTML = out;
}

window.onload = function () {
    create_init();

    (function () {
        refresh();
    })();

    document.getElementById('main').onmousemove = function (e) {
        var rect = canvas.getBoundingClientRect();
        let x = Math.floor((e.clientX - rect.left) / globs.tile_side),
            y = Math.floor((e.clientY - rect.top) / globs.tile_side);

        if (e.buttons == 1) 
            cells[y][x] = 1;

        refresh();
    };
    document.getElementById('main').onclick = function (e) {
        var rect = canvas.getBoundingClientRect();
        let x = Math.floor((e.clientX - rect.left) / globs.tile_side),
            y = Math.floor((e.clientY - rect.top) / globs.tile_side);

        cells[y][x] = 1;

        refresh();
    };
};