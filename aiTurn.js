function threeStreakFree(){
	var yellow3Streaks = 0;
	var red3Streaks = 0;
	var currentColor;
	var threeStreak = false;

	for(i=0; i<ROWNUM; ++i){
		for(j=0; j<COLNUM; ++j){
			if(boardArray[i][j][0]){
				currentColor = boardArray[i][j][1];

				//First we check the 3 positions above [i,j]
				if(i<3){
					for(k=1; k<3; ++k){
						if(boardArray[i+k][j][1] != currentColor) break;	// Whether the color it's different the streak has ended, useless to proceed
						if(k==2) threeStreak = true;
					}
					if((threeStreak) && (!boardArray[i+3][j][0])){
						if(currentColor == "red") red3Streaks++;
						else yellow3Streaks++;
					}
					threeStreak = false;
				}

				// Now we check the 3 position to the right of [i,j]
				if(j<4){
					for(k=1; k<3; ++k){
						if(boardArray[i][j+k][1] != currentColor) break;	// Whether the color it's different the streak has ended, useless to proceed
						if(k==2) threeStreak = true;
					}
					if((threeStreak) && (!boardArray[i][j+3][0])){
						if(currentColor == "red") red3Streaks++;
						else yellow3Streaks++;
					}
					threeStreak = false;
				}

				// Now we check the 3 position to the left of [i,j]
				if(j>2){
					for(k=1; k<3; ++k){
						if(boardArray[i][j-k][1] != currentColor) break;	// Whether the color it's different the streak has ended, useless to proceed
						if(k==2) threeStreak = true;
					}
					if((threeStreak) && (!boardArray[i][j-3][0])){
						if(currentColor == "red") red3Streaks++;
						else yellow3Streaks++;
					}
					threeStreak = false;
				}

				// Now we check the diagonal up and right
				if((i<3) && (j<4)){
					for(k=1; k<3; ++k){
						if(boardArray[i+k][j+k][1] != currentColor) break;
						if(k==2) threeStreak = true;
					}
					if((threeStreak) && (!boardArray[i+3][j+3][0])){
						if(currentColor == "red") red3Streaks++;
						else yellow3Streaks++
					}
					threeStreak = false;
				}

				// Now we check the diagonal up and left
				if((i<3) && (j>2)){
					for(k=1; k<3; ++k){
						if(boardArray[i+k][j-k][1]!= currentColor) break;
						if(k==2) threeStreak = true;
					}
					if((threeStreak)  && (!boardArray[i+3][j-3][0])){
						if(currentColor == "red") red3Streaks++;
						else yellow3Streaks++;
					}
					threeStreak = false;
				}

                // Now we check the diagonal down and right
			    if((i>2) && (j<4)){
					for(k=1; k<3; ++k){
						if(boardArray[i-k][j+k][1] != currentColor) break;
						if(k==2) threeStreak = true;
					}
					if((threeStreak) && (!boardArray[i-3][j+3][0])){
						if(currentColor == "red") red3Streaks++;
						else yellow3Streaks++
					}
					threeStreak = false;
				}

                // Now we check the diagonal down and left
                if((i>2) && (j>2)){
					for(k=1; k<3; ++k){
						if(boardArray[i-k][j-k][1]!= currentColor) break;
						if(k==2) threeStreak = true;
					}
					if((threeStreak)  && (!boardArray[i-3][j-3][0])){
						if(currentColor == "red") red3Streaks++;
						else yellow3Streaks++;
					}
					threeStreak = false;
				}
			}

            
		}
	}
	return [red3Streaks, yellow3Streaks];
}