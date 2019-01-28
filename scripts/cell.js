class Cells {
    static populize_random() {
        for (let i = 0; i < globs.alive_cells; i++) {
            let x = Math.floor(Math.random()*cells[0].length),
                y = Math.floor(Math.random()*cells.length);

            if (!cells[y][x]) {
                cells[y][x]=1;
            } else {
                i--;
                continue;
            }
        }
    }

    static get_neighbours(cx, cy) {
        let neighbours = [];

        for (let y = cy-1>=0 ? cy-1 : cy; 
            y <= (cy+1 < canvas.height/globs.tile_side ? cy+1 : cy);
            y++) {

            for (let x = cx-1>=0 ? cx-1 : cx;
                x <= (cx+1 < canvas.width/globs.tile_side ? cx+1 : cx); 
                x++) {

                if (y == cy && x == cx)
                    continue;

                if (cells[y][x])
                    neighbours.push([x, y]);
            }
        }

        return neighbours;
    }

    static update_cells() {
        for (let y = 0; y < cells.length; y++) {
            for (let x = 0; x < cells[y].length; x++) {
                let n_count = Cells.get_neighbours(x, y);

                if (cells[y][x]) {
                    if (n_count.length<2 || n_count.length>3)
                        cells[y][x]=0;
                } else {
                    if (n_count.length==3)
                        cells[y][x]=1;
                }
            }
        }
    }

    static show_cells() {
        ctx.fillStyle = "#48D1FF";

        for (let y = 0; y < cells.length; y++) {
            for (let x = 0; x < cells[y].length; x++) {
                if (cells[y][x])
                    ctx.fillRect(x*globs.tile_side, y*globs.tile_side, globs.tile_side, globs.tile_side);
            }
        }
    }
}