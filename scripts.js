/*  Tourney  */
/*  Player  */
/*  Match  */
/*  Game  */


/*  Tourney  */

var Tourney = function (name, date) {
	this.name = name;
	this.date = date;
};


/*  Player  */

var Player = function (lastName, firstName, ttwRating, nickName) {
	this.lastName   = lastName;
	this.firstName  = firstName;
	this.ttwRating  = ttwRating;
	this.nickName   = nickName;
	this.firstServe = false;
};

Player.prototype.confirmFirstServe = function () {
	name = this.lastName;
// Чтобы не исчезала вся информация со страницы
//	setTimeout(function() {
	var choice = confirm("Первым подает " + name + "?");
	return choice;
//	}, 20);
};

Player.prototype.setFirstServe = function () {
	this.firstServe = true;
};

Player.prototype.showFirstServe = function () {
	servId = "#serve" + this.nickName;
	$(servId).text("Подача");
	$("#info").text("Подачу выбрал: " + this.lastName + ".");
};

Player.prototype.showServe = function () {

	numGame  = match.scoreA + match.scoreB + 1;
	numPoint = game.scoreA + game.scoreB + 1;

//console.log("g"+numGame + "p"+numPoint);
//console.log(playerA.firstServe)

	// PlayerA подает. Вся логика с его точки зрения
	if (playerA.firstServe) {
	  if (numGame % 2 === 1) { // единственное различие
		if (numPoint <= 20) {
		  if (numPoint % 4 === 1 || numPoint % 4 === 2) {
			game.serveA = true;
			$("#serveA").text("Подача");
			$("#serveB").text("...");
		  } else {
			game.serveA = false;
			$("#serveA").text("...");
			$("#serveB").text("Подача");
		  }
		} else {
		  if (numPoint % 2 === 1) {
			game.serveA = true;
			$("#serveA").text("Подача");
			$("#serveB").text("...");
		  } else {
			game.serveA = false;
			$("#serveA").text("...");
			$("#serveB").text("Подача");
		  }
		}
	  } else {
		if (numPoint <= 20) {
		  if (numPoint % 4 === 3 || numPoint % 4 === 0) {
			game.serveA = true;
			$("#serveA").text("Подача");
			$("#serveB").text("...");
		  } else {
			game.serveA = false;
			$("#serveA").text("...");
			$("#serveB").text("Подача");
		  }
		} else {
		  if (numPoint % 2 === 1) {
			game.serveA = true;
			$("#serveA").text("Подача");
			$("#serveB").text("...");
		  } else {
			game.serveA = false;
			$("#serveA").text("...");
			$("#serveB").text("Подача");
		  }
		}
	  }
	// PlayerA принимает. Вся логика с его точки зрения
	} else {
	  if (numGame % 2 === 0) { // единственное различие
		if (numPoint <= 20) {
		  if (numPoint % 4 === 1 || numPoint % 4 === 2) {
			game.serveA = true;
			$("#serveA").text("Подача");
			$("#serveB").text("...");
		  } else {
			game.serveA = false;
			$("#serveA").text("...");
			$("#serveB").text("Подача");
		  }
		} else {
		  if (numPoint % 2 === 1) {
			game.serveA = true;
			$("#serveA").text("Подача");
			$("#serveB").text("...");
		  } else {
			game.serveA = false;
			$("#serveA").text("...");
			$("#serveB").text("Подача");
		  }
		}
	  } else {
		if (numPoint <= 20) {
		  if (numPoint % 4 === 3 || numPoint % 4 === 0) {
			game.serveA = true;
			$("#serveA").text("Подача");
			$("#serveB").text("...");
		  } else {
			game.serveA = false;
			$("#serveA").text("...");
			$("#serveB").text("Подача");
		  }
		} else {
		  if (numPoint % 2 === 1) {
			game.serveA = true;
			$("#serveA").text("Подача");
			$("#serveB").text("...");
		  } else {
			game.serveA = false;
			$("#serveA").text("...");
			$("#serveB").text("Подача");
		  }
		}
	  }
	}
};

// Один mp3-файл для устранения задержки воспроизведения
Player.prototype.scoreSay = function (score, say) {

	var audioScoreA = document.createElement("audio");
	var audioScoreB = document.createElement("audio");

    // В мобильных браузерах не работает
	// audioScoreA.setAttribute("preload", "auto");
	// audioScoreB.setAttribute("preload", "auto");
	
	var srcA = { text: "" };
	srcA.text = "source/speech/" + say.lang + "/" + score.playerA + ".mp3";
	audioScoreA.setAttribute("src", srcA.text);
		
	if (score.playerA === score.playerB && say.lang === "en") {
		audioScoreB.setAttribute("src", "source/speech/en/all.mp3");
		audioScoreA.play();
		audioScoreA.addEventListener("ended", function() { 
			setTimeout(function() {
				audioScoreB.play();
			}, say.pause);
		}, true);
	return;
	}
		
	var srcB = { text: "source/speech/" + say.lang + "/" + score.playerB + ".mp3" };
	audioScoreB.setAttribute("src", srcB.text);
	
	if (score.serveA) {
		audioScoreA.play();
		audioScoreA.addEventListener("ended", function() { 
			setTimeout(function() {
				audioScoreB.play();
			}, say.pause);
		}, true);
	} else {
		audioScoreB.play();
		audioScoreB.addEventListener("ended", function() { 
			setTimeout(function() {
				audioScoreA.play();
			}, say.pause);
		}, true);
	
	}
};


/* Много маленьких файлов 
// В мобильных браузерах - задержка в 1 секунду после клика.
// Очень много. Поэтому возврат к первому варианту с 
// одним длинным файлом (30 секунд)
Player.prototype.scoreSay = function (score, say) {

	var audioScoreA = document.createElement("audio");
	var audioScoreB = document.createElement("audio");

    // В мобильных браузерах не работает
	// audioScoreA.setAttribute("preload", "auto");
	// audioScoreB.setAttribute("preload", "auto");
	
	var srcA = { text: "" };
	srcA.text = "source/speech/" + say.lang + "/" + score.playerA + ".mp3";
	audioScoreA.setAttribute("src", srcA.text);
		
	if (score.playerA === score.playerB && say.lang === "en") {
		audioScoreB.setAttribute("src", "source/speech/en/all.mp3");
		audioScoreA.play();
		audioScoreA.addEventListener("ended", function() { 
			setTimeout(function() {
				audioScoreB.play();
			}, say.pause);
		}, true);
	return;
	}
		
	var srcB = { text: "source/speech/" + say.lang + "/" + score.playerB + ".mp3" };
	audioScoreB.setAttribute("src", srcB.text);
	
	if (score.serveA) {
		audioScoreA.play();
		audioScoreA.addEventListener("ended", function() { 
			setTimeout(function() {
				audioScoreB.play();
			}, say.pause);
		}, true);
	} else {
		audioScoreB.play();
		audioScoreB.addEventListener("ended", function() { 
			setTimeout(function() {
				audioScoreA.play();
			}, say.pause);
		}, true);
	
	}
};
*/

/*  Match  */

var Match = function (gamesMax, comment) {
	this.gamesMax = gamesMax;
	this.scoreA = 0;
	this.scoreB = 0;
	this.isOver = false;
};

Match.prototype.gameWinner = function (player) {
	if (player === playerA) {
		this.scoreA++;
	} else {
		this.scoreB++;
	}
};
	
Match.prototype.winner = function(player) {
	numWinGames = Math.floor(match.gamesMax/2) + 1;
	if (match.scoreA === numWinGames || match.scoreB === numWinGames) {
		setTimeout( function() {
			alert("Встречу выиграл " + player.lastName + ".");
		}, 20 );
		match.isOver = true;
	}
};


/*  Game  */

var Game = function () {
	this.scoreA = 0;
	this.scoreB = 0;
	this.serveA = "-";
};

/*
Game.prototype.scoreSay = function () {
	var score = {
		playerA: game.scoreA,
		playerB: game.scoreB,
		serveA: game.serveA
	};
	player.scoreSay(score, say);
};
*/

Game.prototype.pointWinner = function (player) {
	if (match.isOver) {
		return;
	}
	if (player === playerA) {
		this.scoreA++;
	} else {
		this.scoreB++;
	}
	player.showServe();

	var score = {
		playerA: this.scoreA,
		playerB: this.scoreB,
		serveA: game.serveA
	};
	// Перенес в index.html
	// var say = { lang: "ru", pause: 200 };
	player.scoreSay(score, say);
};
	
Game.prototype.getScore = function (player) {
	if (player === playerA) {
		return this.scoreA;
	} else {
		return this.scoreB;
	}
};
	
Game.prototype.winner = function(player) {
	if (match.isOver) {
		return;
	}
	  
	diffScore = Math.abs(game.scoreA - game.scoreB);
	if ( (game.scoreA >= 11 || game.scoreB >= 11) && diffScore > 1 ) {
		match.gameWinner(player);
		match.winner(player);
		if (match.isOver) {
			return;
		}
		game.scoreA = 0;
		game.scoreB = 0;
		setTimeout( function() {
			var okChoice = confirm("Партию выиграл " + player.lastName + ".\n" + "Нажмите кпопку OK, чтобы начать следующую партию...");
			if (okChoice === true) {
				// Обновить ВСЮ информацию о счете
				$("#scoreA").text(game.scoreA);
				$("#scoreB").text(game.scoreB);
				$("#playerA").text(match.scoreA + " " + playerA.lastName);
				$("#playerB").text(match.scoreB + " " + playerB.lastName);
				player.showServe();
			} else {
				match.isOver = true;
				alert("Закройте вкладку браузера, чтобы завершить работу.");
			}
		}, 3000);
	}
};

