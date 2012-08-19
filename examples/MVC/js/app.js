(function(scope){
	var Controller 	= scope.Controller;
	var Model 		= scope.Model;
	var View 		= scope.View;

	scope.MVCPassiveApp = function(){
		//Private 
		var mainModel;
		var mainView;
		var cubeRotaters = [];
		var renderCommand;

		//Instantiate our Model(s)
		mainModel = new Model.SceneModel();

		//Instantiate our View
		mainView = new View.Scene3dView(mainModel);

		//We loop through our items and add controllers for each
		var cubeI = mainModel.CUBES.length;
		while(cubeI--){
			var cubeR = new Controller.CubeRotater(mainModel.CUBES[cubeI], "x");
			cubeRotaters.push(cubeR);
			var toggleR = new Controller.CommandToggler(cubeR);
			mainView.setClickCommand(mainModel.CUBES[cubeI], toggleR);
		}

		renderCommand = new Controller.RenderViewOnce(cubeRotaters, mainView);
		//renderCommand = new Controller.RenderViewLoop(cubeRotaters, mainView);

		//Public
		return {
			initialize:function(){
				mainView.initialize();
				renderCommand.execute();
				
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
