var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}



var grid = [[], [], [], [], [], [], [], [], []]

function FillBoard(grid) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (grid[i][j] != 0) {
				arr[i][j].innerText = grid[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		grid = response.board
		FillBoard(grid)
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}


SolvePuzzle.onclick = () => {
	SudokuSolver(grid, 0, 0, 9);
};

function SudokuSolver(grid, i, j, n) {
	solveSudoku(grid, i, j);
	FillBoard(grid);
}


let N = 9;

function solveSudoku(grid, row, col)
{

	if (row == N - 1 && col == N){
		return true;
	}

	if (col == N)
	{
		row++;
		col = 0;
	}

	if (grid[row][col] != 0)
		return solveSudoku(grid, row, col + 1);

	for(let num = 1; num < 10; num++)
	{
		if (isSafe(grid, row, col, num))
		{
			grid[row][col] = num;
			if (solveSudoku(grid, row, col + 1))
				return true;
		}

		grid[row][col] = 0;
	}
	return false;
}

function isSafe(grid, row, col, num)
{
	for(let x = 0; x <= 8; x++)
		if (grid[row][x] == num)
			return false;

	for(let x = 0; x <= 8; x++)
		if (grid[x][col] == num)
			return false;

	let startRow = row - row % 3,
		startCol = col - col % 3;
		
	for(let i = 0; i < 3; i++)
		for(let j = 0; j < 3; j++)
			if (grid[i + startRow][j + startCol] == num)
				return false;

	return true;
}

