(function(scope){
	var Controller 	= scope.Controller;
	var Model 		= scope.Model;
	var View 		= scope.View;

	scope.MVCPassiveApp = function(){
		//Private 
		var mainModel;
		var mainView;
		var cubeRotaters = [];
		var render;


		mainModel = new Model.SceneModel();


		mainView = new View.AwesomeView(mainModel);

		var cubeI = mainModel.CUBES.length;
		while(cubeI--){
			var cubeR = new Controller.CubeRotater(mainModel.CUBES[cubeI]);
			cubeRotaters.push(cubeR);
			var toggleR = new Controller.CommandToggler(cubeR);
			mainView.setClickCommand(mainModel.CUBES[cubeI], toggleR);
		}


		render = function(){
			//First, we request another frame
			window.requestAnimationFrame(render);
			//We run any controllers that need to run every frame
			var rotaterI = cubeRotaters.length;
			while(rotaterI--){
				cubeRotaters[rotaterI].execute();
			}
			//Then we draw the main view
			mainView.updateCubes();
			mainView.render();
		}

		//Public
		return {
			initialize:function(){
				mainView.initialize();
				//Because the view is passive, it only does things when told
				//So we need to process all outside inputs, including animation
				//frames ouside of the view
				render();
				
			}
		};

	};

})(MVCPassive);



/** Start up the application **/

(function(scope){
	var Controller 	= scope.Controller;
	var Model 		= scope.Model;
	var View 		= scope.View;

	scope.app = new scope.MVCPassiveApp();
	scope.app.initialize();

})(MVCPassive);
