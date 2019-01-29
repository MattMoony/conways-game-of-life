function create_init() {
    cells = [];

    for (let y = 0; y < Math.floor(canvas.height / globs.tile_side); y++) {
        cells.push([]);
        for (let x = 0; x < Math.floor(canvas.width / globs.tile_side); x++) {
            cells[y].push(0);
        }
    }
}

function get_self_made() {
    if (localStorage.getItem('gol_patterns')) {
        Patterns.self_made = JSON.parse(localStorage.getItem('gol_patterns'));
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

function main_loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (globs.show_grid)
        draw_grid();

    Cells.update_cells();
    Cells.show_cells();
}

function title_case(str) {
    return str.split(' ').map(v => v.substr(0, 1).toUpperCase() + v.substr(1)).join(' ');
}

window.onload = function () {
    create_init();
    draw_grid();
    get_self_made();

    let d = document.getElementById('in_patterng');
    for (let k of Object.keys(Patterns)) {
        let x = document.createElement('option');

        x.value = k;
        x.innerHTML = title_case(k.replace('_', ' '));

        d.appendChild(x);
    }

    document.getElementById('in_pattern').innerHTML = "";

    for (let k of Object.keys(Patterns[d.value])) {
        let x = document.createElement('option');

        x.value = k;
        x.innerHTML = title_case(k.replace(/_/g, ' '));

        document.getElementById('in_pattern').appendChild(x);
    }



    document.getElementById('in_ticks').value = globs.tick_pause;
    document.getElementById('in_tiles').value = globs.tile_side;
    document.getElementById('in_acells').value = globs.alive_cells;


    // SUBMITTED // 
    document.getElementById('sub_settings').onclick = e => {
        window.clearInterval(tick_intval);
        tick_intval = null;

        globs.tick_pause = +document.getElementById('in_ticks').value;
        globs.tile_side = +document.getElementById('in_tiles').value;
        globs.alive_cells = +document.getElementById('in_acells').value;

        if (document.getElementById('in_spattern').checked) {
            let x = +document.getElementById('in_patternx').value,
                y = +document.getElementById('in_patterny').value;

            try {
                Cells.spawn_at(x, y, Patterns[document.getElementById('in_patterng').value][document.getElementById('in_pattern').value]);
            } catch (e) {
                window.alert('Pattern will not completely spawn, please try to spawn somewhere around P(0, 0) ... ');
            }
        } else {
            Cells.populize_random();
        }

        if (globs.show_grid)
            draw_grid();

        Cells.show_cells();
        tick_intval = window.setInterval(main_loop, globs.tick_pause);
    };
    document.getElementById('sub_clear').onclick = e => {
        create_init();
        main_loop();
    };
    document.getElementById('sub_pp').onclick = e => {
        if (tick_intval) {
            window.clearInterval(tick_intval);
            tick_intval = null;
        } else {
            tick_intval = window.setInterval(main_loop, globs.tick_pause);
        }
    };
    document.getElementById('sub_refresh').onclick = e => {
        get_self_made();
    };

    document.getElementById('in_sgrid').onclick = e => {
        globs.show_grid = e.target.checked;

        if (e.target.checked) {
            draw_grid();
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    d.onchange = e => {
        document.getElementById('in_pattern').innerHTML = "";

        for (let k of Object.keys(Patterns[d.value])) {
            let x = document.createElement('option');

            x.value = k;
            x.innerHTML = title_case(k.replace(/_/g, ' '));

            document.getElementById('in_pattern').appendChild(x);
        }
    };


    document.getElementById('in_spattern').onclick = e => {
        for (let el of document.getElementsByClassName('pattern_row'))
            el.style.display = e.target.checked ? "table-row" : "none";
    };
};