var can = $("#boardCanvas")[0];
var canw = can.width;
var canh = can.height;
var c = can.getContext("2d");
var COLNUM = 7;
var ROWNUM = 6;
var boardw = canw*0.8;
var boardh = canh*0.8;
var squarew = boardw*0.9/COLNUM;
var squareh = boardh*0.9/ROWNUM;
var radius = squareh*0.4;
var boardArray = [];
var boardSquareColumn = [];
var turn = 0;

begin()

function begin(){
    
	var start = null; 													// start will contains actual time expressed in milliseconds
	var t = null;

	var next = function(time)
	{
		if(!start){
			start = time; 												// set start during the first "next()" call
			for(i=0; i<ROWNUM; ++i){
				boardArray.push([[false, "black"], [false, "black"], [false, "black"], [false, "black"], [false, "black"], [false, "black"], [false, "black"]]);
			}
			for(i=0; i<COLNUM; ++i){
				boardSquareColumn.push(canw*0.1 + boardw*0.05 + squarew * (i+1));
			}
		}
		t = (time - start)/1000.0; 										// In every loop t will be the seconds passed from previous iteration
		start = time;

		
		c.clearRect(0, 0, canw, canh);
		drawBoard();
		drawDiscs();


		window.requestAnimationFrame(next);
	}
	window.requestAnimationFrame(next);
}

function drawBoard(){
	c.fillStyle = "#00008b";
	c.rect(canw*0.1,canh*0.1,boardw,boardh);
	c.fill();

	var xCenter;
	var yCenter;
	for(i=0; i<COLNUM; ++i){
		for(j=0; j<ROWNUM; ++j){
			xCenter = canw*0.1 + boardw*0.05 + i*squarew + squarew/2;
			yCenter = canh*0.1 + boardh*0.05 + j*squareh + squareh/2;
			c.beginPath();
			c.arc(xCenter, yCenter, radius, 0, 2*Math.PI); 
			c.fillStyle = "#000000";
			c.fill();
		}
	}
}

function drawDiscs(){
	var xCenter;
	var yCenter;
	for(i=0; i<ROWNUM; ++i){
		for(j=0; j<COLNUM; ++j){
			if(boardArray[i][j][0]){
				xCenter = canw*0.1 + boardw*0.05 + j*squarew + squarew/2;
				yCenter = canh*0.1 + boardh*0.95 - i*squareh - squareh/2;
				if(boardArray[i][j][1] == "red")
				{
					c.beginPath();
					c.arc(xCenter, yCenter, radius, 0, 2*Math.PI); 
					c.fillStyle = "#8b0000";
					c.fill();
				}
				else{
					c.beginPath();
					c.arc(xCenter, yCenter, radius, 0, 2*Math.PI); 
					c.fillStyle = "#ffea00";
					c.fill();
				}
			}
		}
	}
}

$("#boardCanvas").mousedown(function(e)
{
	var colIndex = columnIndexClick(e.offsetX);
	if((colIndex != -1) && (!boardArray[ROWNUM-1][colIndex][0])) {
		var fromBottom = true;
		var currentRow = 0;

		while(fromBottom){
			if(boardArray[currentRow][colIndex][0] == false){
				boardArray[currentRow][colIndex][0] = true;
				if(turn%2 == 0) boardArray[currentRow][colIndex][1] = "red";
				else boardArray[currentRow][colIndex][1] = "yellow";
				fromBottom = false;
			}
			else{
				currentRow++;
			}
		}
		checkWin();
		turn++;
	}
	else{
		if(colIndex == -1) console.log("-1!");
		if(boardArray[ROWNUM-1][colIndex][0]) console.log("FULL!");
	}
});

/*	Returns the column's index where the user clicked
*	if the user clicked outside the columns returns -1
*	else returns the index
*/ 
function columnIndexClick(c){
	if(c<canw*0.1 + boardw*0.05) return -1;
	if(c>canw*0.1 + boardw*0.05 + squarew * COLNUM) return -1;
	for(i=0; i<boardSquareColumn.length; ++i){
		if(c<boardSquareColumn[i]) return i;
	}
}

/*	Check whether a user has won
*	This function is called everytime a move is made, so everytime a user insert a disc
*/
function checkWin(){
	var stringColor;
	if(turn%2 == 0) stringColor = "red";
	else stringColor = "yellow";

	for(i=0; i<ROWNUM; ++i){
		for(j=0; j<COLNUM; ++j){
			if((i>2) && (j==(COLNUM-3))) j=COLNUM;
			else{
				if(boardArray[i][j][1] == stringColor){
					if(checkNeighbours(stringColor, i, j)) console.log("The " + stringColor + " player WON!");
				}

			}
		}
	}
}

/*	checkNeighbours checks the color of some position around [i,j] where i is the row number, and j the column number. When checkNeighbours finds 4 positions of the 
*	same color, it returns true. checkNeighbours checks the following positions(marked with x):
*
*	---------------------------------------------------------
*	|	x 	|		|		|	x 	|		|		|	x	|
*	---------------------------------------------------------
*	|		|	x 	|		|	x	|		|	x	|		|
*	---------------------------------------------------------
*	|		|		|	x	|	x	|	x	|		|		|
*	---------------------------------------------------------
*	|		|		|		| [i,j]	|	x	|	x	|	x	|
*	---------------------------------------------------------
*/
function checkNeighbours(sc, i, j){
	//First we check the 3 positions above [i,j] 
	var streak = false;
	for(k=1; k<4; ++k){
		if(i>2) break;								// If i>2 it's impossible to find a 4-colour-streak above i
		if(boardArray[i+k][j][1] != sc) break;		// Whether the color it's different the streak has ended, useless to proceed
		if(k==3) streak = true;
	}
	// if streak is now true we found a 4-colour-streak, it's useless to proceed, we return true, someone has won
	if(streak) return streak;

	// Now we check the 3 position to the right of [i,j]
	for(k=1; k<4; ++k){
		if(j>3) break;								// if j>3 it's impossible to find a 4-colour-streak to the right of j
		if(boardArray[i][j+k][1] != sc) break;		// Whether the color it's different the streak has ended, useless to proceed
		if(k==3) streak = true;
	}
	// if streak is now true we found a 4-colour-streak, it's useless to proceed, we return true, someone has won
	if(streak) return streak;

	// Now we check the diagonal up and right
	for(k=1; k<4; ++k){
		if((i>2) || (j>3)) break;
		if(boardArray[i+k][j+k][1] != sc) break;
		if(k==3) streak = true;
	}
	// if streak is now true we found a 4-colour-streak, it's useless to proceed, we return true, someone has won
	if(streak) return streak;

	// Now we check the diagonal up and right
	for(k=1; k<4; ++k){
		if((i>2) || (j<3)) break;
		if(boardArray[i+k][j-k][1]!= sc) break;
		if(k==3) streak = true;
	}
	return streak;

}