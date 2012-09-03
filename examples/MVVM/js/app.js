(function(scope){
	var Controller 	= scope.Controller;
	var Model 		= scope.Model;
	var View 		= scope.View;

	/**
	 * The App is basically just a factory that creates the pieces
	 * and hooks them together.
	 */
	scope.MVVMApp = function(){
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

		//Technically, these are no longer 'render' loops... they just update the model
		//We let the views determine if they need to render or not.
		//renderCommand = new Controller.RenderViewOnce(cubeRotaters);
		renderCommand = new Controller.RenderViewLoop(cubeRotaters);

	//Public
		return {
			initialize:function(){
				mainView.initialize();
				renderCommand.execute();
				
			}
		};

	};

})(MVVM);



/** Start up the application **/

(function(scope){
	var Controller 	= scope.Controller;
	var Model 		= scope.Model;
	var View 		= scope.View;

	scope.app = new scope.MVVMApp();
	scope.app.initialize();

})(MVVM);
