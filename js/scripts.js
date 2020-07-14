// Function to create a grid of square divs
function createGrid(size=16) {
    let container = document.getElementById("container");
    for (let i = 0; i < size; i++) { 
        // create each row
        let row = document.createElement("div");
        row.classList = "row";

        // calculate a height for a decent view
        let windowHeight = 790;
        row.style.width = windowHeight + "px";
        row.style.height = windowHeight / size + "px";

        // Set container width so that its border surrounds grid
        container.style.width = windowHeight + "px";

        // create each cell
        for (let j = 0; j < size; j++) {
            let cell = document.createElement("div");
            cell.classList = "cell";
            cell.style.width = windowHeight / size + "px";
            cell.style.height = windowHeight / size + "px";
            cell.style.backgroundColor = "rgb(255, 255, 255)";
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

// Clears the grid and allow a new custom sized grid
function resetGrid() {
    let cells = document.querySelectorAll(".cell");
    let rows = document.querySelectorAll(".row");

    // Remove cells and rows from the DOM
    cells.forEach((cell) => {
        cell.remove()
    })
    rows.forEach((row) => {
        row.remove()
    })

    // prompt for new size
    let size = -1;
    while (size === -1) {
        size = prompt("Enter size of Grid Between 1 and 200");
        if (Number(size) <= 0 || Number(size) > 200 || !Number(size)) {
            size = -1;
        } else {
            size = size;
        }
    }

    // reset randomColor and consecutiveColor
    randomColor = -1;
    consecutiveColor = -1;

    // Recreate Grid
    createGrid(size);
    colorCells();

    // run toggleGridFunc with opposite value, to save states between reset
    grid = !grid;
    toggleGridFunc();
}

function colorCells () {
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.addEventListener('mouseover', function () {

        let selectedMode = updateMode()
        runMode(selectedMode, cell); 
    })
})
}

// Run the appropriate method for the selected mode from dropdown
function runMode(selectedMode, cell) {
    // black squares only
    if (selectedMode === "black") {
        cell.style.backgroundColor = "rgb(0, 0, 0)";
    } else if (selectedMode === "random") {
        // random color each square
        const r = Math.random() * 256;
        const g = Math.random() * 256;
        const b = Math.random() * 256;
        cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    } else if (selectedMode === "shade") {
        // increase shade of color 20% each pass over
        let background = cell.style.backgroundColor;
        background = background.slice(4, background.length - 1);
        let rgb = background.split(", ");
        cell.style.backgroundColor = `rgb(${rgb[0] - 51}, ${rgb[1] - 51}, ${rgb[2] - 51})`

    } else if (selectedMode === "rainbow") {
        if (consecutiveColor == -1) {
            // set a random hue if none set before
            let hue = Math.floor(Math.random() * 361);
            consecutiveColor = `hsl(${hue}, 100%, 50%)`;
            cell.style.backgroundColor = consecutiveColor;

        } else {
            // If a hue has been set, cycle to next value by adding 1
            let colorArray = (consecutiveColor.slice(4, consecutiveColor.length - 2)).split(", ");
            let hue = Number(colorArray[0]) + 1;
            consecutiveColor = `hsl(${hue}, 100%, 50%)`;
            cell.style.backgroundColor = consecutiveColor;
        }

    // random single color
    } else if (selectedMode === "randomColor") {
        if (randomColor === -1) {
            // choose random color if none set yet
            let colorChoice = Math.floor(Math.random() * 361);
            randomColor = `hsl(${colorChoice}, 100%, 50%)`;
            cell.style.backgroundColor = randomColor;
        } else {
            cell.style.backgroundColor = randomColor;
        }
    }
}

// Get the selected mode from dropdown menu
function updateMode() {
    let mode = document.getElementById("mode");
    let selectedMode = mode.value
    return selectedMode;
}

// Toggle gridlines
function toggleGridFunc() {
    let cells = document.querySelectorAll(".cell");
    if (grid === true) {
        cells.forEach((cell) => {
            cell.style.border = "none";
            grid = false;
        })
    } else {
        cells.forEach((cell) => {
            cell.style.border = "1px solid rgb(201, 201, 201)"
            grid = true;
        })
    }
}

// Toggle gridlines button
let toggleGrid = document.getElementById("toggleGrid");
toggleGrid.addEventListener('click', function() {
    toggleGridFunc();
})

// Reset button
let resetButton = document.getElementById("reset");
resetButton.addEventListener('click', function() {
    resetGrid();
})

// Set changeable global variables
var consecutiveColor = -1;
var randomColor = -1;
var grid = false;

// Create initial grid and start mouseover actions
createGrid(12);
colorCells();