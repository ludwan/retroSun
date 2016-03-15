(function(){
	var sunStage, floorStage;
	var floorLineColor = "#C03E80";
	var floorX = window.innerWidth /2;
	var floorY = -window.innerHeight / 10;

	function init(){
		console.log("init");
		initStages();
		initSun();
		initFloor();
	}

	function initStages(){
		sunStage = new createjs.Stage("sunCanvas");
		sunStage.canvas.width = window.innerWidth;
		sunStage.canvas.height = window.innerHeight;

		floorStage = new createjs.Stage("floorCanvas");
		floorStage.canvas.width = window.innerWidth;
		floorStage.canvas.height = window.innerHeight/2;
	}

	function initSun(){
		var sun = new createjs.Shape();
		if(window.innerWidth >= window.innerHeight){
			sun.graphics.beginFill("yellow").drawCircle(window.innerWidth/2,window.innerHeight*0.3,window.innerHeight/4);
		} else {
			sun.graphics.beginFill("yellow").drawCircle(window.innerWidth/2,window.innerHeight*0.3,window.innerWidth/4);
		}
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

	window.onload = function() { init() };
})();