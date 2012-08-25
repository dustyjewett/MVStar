(function(scope){
	"use strict";
	var Controller 	= scope.Controller;
	var Model 		= scope.Models;
	var View 		= scope.View;

	Controller.Scene3dPresenter = function(theModel, theView){
	//Private 
		var model = theModel;
		var view = theView;
		var cubeModelMap = {};//Map
		var cubeRotaters = [];//Array to loop through
		var cubeTogglers = {};//Map
		var renderCommand;

		var cubeClickHandler = function cubeClickHandler(id){
			cubeTogglers[id].execute();
		};

		var render = function render(){
			view.render();
		};

		//Initialize the View
		view.initialize(
			model.WIDTH,
			model.HEIGHT,
			model.VIEW_ANGLE,
			model.ASPECT,
			model.NEAR,
			model.FAR
			);

		//Add each of the cubes
		var numOfCubes = model.CUBES.length;
		while(numOfCubes--){
			var cubeModel = model.CUBES[numOfCubes];
			view.createCube(cubeModel);
			cubeModelMap[cubeModel.id] = cubeModel;

			var cubeR = new Controller.CubeRotater(cubeModel, "x");
			cubeRotaters.push(cubeR);
			var toggleR = new Controller.CommandToggler(cubeR);
			cubeTogglers[cubeModel.id] = toggleR;
		}


		view.on("cubeClick", cubeClickHandler);


		//These commands are slightly different that previously, they now have an
		//onFinishFunction parameter that will execute after everything is done
		//That's where we call the render function defined above.
		//renderCommand = new Controller.RenderViewOnce(cubeRotaters, render);
		renderCommand = new Controller.RenderViewLoop(cubeRotaters, render);

	//Public
		this.update = function(){
			view.updateCamera(model.CAMERA, model.FOCUS);
			view.updateLight(model.LIGHT);
		}

		this.start = function(){
			this.update();
			renderCommand.execute();
		};

	};

})(MVPresenter);


