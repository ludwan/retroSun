(function(){
	var sunStage, floorStage;
	var floorLineColor = "#C03E80";
	var upperSunColor = "#FFF321";
	var lowerSunColor = "#F9138F";
	var backgroundColor= "#021921";
	var floorX = window.innerWidth /2;
	var floorY = -window.innerHeight / 10;

	window.addEventListener('resize', resize, false);

	function init(){
		console.log("init");
		initStages();
		initSun();
		initFloor();
	}

	function initStages(){
		sunStage = new createjs.Stage("sunCanvas");
		sunStage.canvas.width = window.innerWidth-10;
		sunStage.canvas.height = window.innerHeight*0.6;

		floorStage = new createjs.Stage("floorCanvas");
		floorStage.canvas.width = window.innerWidth-10;
		floorStage.canvas.height = window.innerHeight/2;
	}

	function initSun(){
		var sun = new createjs.Shape();
		console.log(window.innerHeight/4);
		console.log(window.innerHeight/30);
		var currPos = -window.innerHeight/40;
		sun.graphics.beginRadialGradientFill([upperSunColor,lowerSunColor], [0, 1], 0, 0,window.innerHeight/3, window.innerHeight*0.25, window.innerHeight*0.5, window.innerHeight/2).drawCircle(0,0,window.innerHeight*0.25);
		sun.graphics.beginFill(backgroundColor).drawRect(-window.innerHeight*0.25,window.innerHeight/4 + currPos,window.innerHeight/2, window.innerHeight/40);
		for(var i = 0; i < 9; i++){
			currPos = currPos -2*(window.innerHeight/(i*10+40));
			sun.graphics.drawRect(-window.innerHeight*0.25,window.innerHeight/4 + currPos,window.innerHeight/2, window.innerHeight/(i*20+40));
			
			console.log(window.innerHeight/(i*20));

		}
		// currPos = currPos - 2*(window.innerHeight/40);
		// sun.graphics.drawRect(-window.innerHeight*0.25,window.innerHeight/4 + currPos,window.innerHeight/2, window.innerHeight/(40));
		// currPos = currPos - 2*(window.innerHeight/50);
		// sun.graphics.drawRect(-window.innerHeight*0.25,window.innerHeight/4 + currPos,window.innerHeight/2, window.innerHeight/(50));


		sun.x = window.innerWidth/2;
		sun.y = window.innerHeight*0.3;

		 // var blurFilter = new createjs.BlurFilter(20, 20, 1);
	 	// 	sun.filters = [blurFilter];
	 	// 	var bounds = blurFilter.getBounds();

 		console.log(sun);
 		//sun.cache(-window.innerHeight/4+bounds.x, window.innerHeight/4+bounds.y, window.innerHeight/2+bounds.width, window.innerHeight/2+bounds.height);

		sunStage.addChild(sun);
		sunStage.update();

	}

	function initFloor(){
		var verticalLine = new createjs.Shape();
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
		sunStage.canvas.width = window.innerWidth;
    	sunStage.canvas.height = window.innerHeight*0.6;
    	initSun();
	}

	window.onload = function() { init() };
})();