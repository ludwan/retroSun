(function(){
	var sunStage, floorStage;
	var floorLineColor = "#C03E80";
	var upperSunColor = "#FFF321";
	var lowerSunColor = "#F9138F";
	var backgroundColor= "#021921";
	var floorX = window.innerWidth / 2;
	var floorY = -window.innerHeight / 10;
	var sizes = ['micro', 'mini', 'medium', 'big', 'max'];
	var starsCount = 1000;	/*Amount of stars*/
	var starOpacity = 0.5;	/*General brightness of stars*/

	window.addEventListener('resize', resize, false);

	function init(){
		initStages();
		initStars(); /*Remove this to hide the stars*/
		initSun();	 /*Remove this to hide the sun*/
		initFloor();
	}

	function initStages(){
		sunStage = new createjs.Stage("sunCanvas");
		sunStage.canvas.width = window.innerWidth-2;
		sunStage.canvas.height = window.innerHeight*0.6;

		floorStage = new createjs.Stage("floorCanvas");
		floorStage.canvas.width = window.innerWidth-2;
		floorStage.canvas.height = window.innerHeight/2;
	}

	function initStars(){
		var starColor = createjs.Graphics.getRGB(152, 158, 180, starOpacity);	
		for(var i = 0; i < starsCount; i++) {
			var x = randomInt(2, window.innerWidth-2);
			var	y = randomInt(2, window.innerHeight*0.6-2);
			var	size = sizes[randomInt(0, sizes.length-1)];
			var radius = 0;

			switch(size) {
				case 'micro':
					radius = 0.2;
					break;
				case 'mini':
					radius = 0.4;
					break;
				case 'medium':
					radius = 0.6;
					break;
				case 'big':
					radius = 0.8;
					break;
				case 'max':
					radius = 1.0;
					break;
			}
			var star = new createjs.Shape();

			star.graphics.beginFill(starColor).arc(x, y, radius, 0, Math.PI*2);
			sunStage.addChild(star);
		}
		sunStage.update();
	}

	function initSun(){
		var sun = new createjs.Shape();
		var currPos = -window.innerHeight/40 +1;

		sun.graphics.beginRadialGradientFill([upperSunColor,lowerSunColor], [0, 1], 0, 0,window.innerHeight/3, window.innerHeight/4, window.innerHeight/2, window.innerHeight/2).drawCircle(0,0,window.innerHeight/4);
		sun.graphics.beginFill(backgroundColor).drawRect(-window.innerHeight/4,window.innerHeight/4 + currPos,window.innerHeight/2, window.innerHeight/40);
		for(var i = 0; i < 9; i++){
			currPos = currPos -2*(window.innerHeight/(i*10+40));
			sun.graphics.drawRect(-window.innerHeight/4,window.innerHeight/4 + currPos,window.innerHeight/2, window.innerHeight/(i*20+40));
		}
		sun.cache(-window.innerHeight/4, -window.innerHeight/4, window.innerHeight/2, window.innerHeight/2);
		sun.x = window.innerWidth/2;
		sun.y = window.innerHeight*0.3;
		sunStage.addChild(sun);
		sunStage.update();
	}

	function initFloor(){
		var verticalLine = new createjs.Shape();
		console.log(window.innerWidth);
		verticalLine.graphics.setStrokeStyle(3).beginStroke(floorLineColor);
		for(var i = 0; -3*window.innerWidth + i*300 < 4*window.innerWidth; i++){
			verticalLine.graphics.moveTo(-3*window.innerWidth + i * 300, window.innerHeight/2);
			verticalLine.graphics.lineTo(floorX,floorY);
		}
		var horizontalLine = new createjs.Shape();

		horizontalLine.graphics.setStrokeStyle(3).beginStroke(floorLineColor);
		for(var i = 0; window.innerHeight/2-i*(window.innerHeight/14) > -window.innerHeight/2; i++){
			horizontalLine.graphics.moveTo(0,window.innerHeight/2-i*(window.innerHeight/14)).lineTo(window.innerWidth,window.innerHeight/2 - i *(window.innerHeight/14));
		}		
		floorStage.addChild(horizontalLine);
		floorStage.addChild(verticalLine);
		createjs.Tween.get(horizontalLine, {loop:true})
			.to({y: window.innerHeight/2}, 2000);
		createjs.Ticker.setFPS(40);
		createjs.Ticker.addEventListener("tick", floorStage);
	}

	function resize(){
		sunStage.removeAllChildren();
		sunStage.canvas.width = window.innerWidth-2;
    	sunStage.canvas.height = window.innerHeight*0.6;
    	initStars();
    	initSun();
	}

	function randomInt(a, b) {
    	return Math.floor(Math.random()*(b-a+1)+a);
	}

	window.onload = function() { init() };
})();