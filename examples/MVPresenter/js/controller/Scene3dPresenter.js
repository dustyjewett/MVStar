(function(scope){
	"use strict";
	var Controller 	= scope.Controller;
	var Model 		= scope.Models;
	var View 		= scope.View;

	Controller.Scene3dPresenter = function(
		theScene, theCubes, theLights, theCamera, theFocus, 
		theView, theStatsView){
	//Private 
		var scene = theScene;
		var cubes = theCubes;
		var lights = theLights;
		var camera = theCamera;
		var focus = theFocus;
		var view = theView;
		var statsView = theStatsView;
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
			scene.WIDTH,
			scene.HEIGHT,
			scene.VIEW_ANGLE,
			scene.ASPECT,
			scene.NEAR,
			scene.FAR
			);



		//Add each of the cubes
		var numOfCubes = cubes.length;
		while(numOfCubes--){
			var cubeModel = cubes[numOfCubes];
			cubeModelMap[cubeModel.id] = cubeModel;
			view.createCube(cubeModel);
			var row = new View.Component.StatsRow(cubeModel);
			statsView.addRow(row);

			var cubeR = new Controller.CubeRotater(cubeModel, "x");
			row.setActiveCell("x");
			cubeRotaters.push(cubeR);
			var toggleR;
			if(cubeModel.label == "White"){
				toggleR = new Controller.CommandChain(
						new Controller.CommandAxisSwitcher(cubeR),
						new Controller.UpdateRowBasedOnRendering(cubeR, row)
					);
			}else{
				toggleR = new Controller.CommandChain(
						new Controller.CommandToggler(cubeR),
						new Controller.UpdateRowBasedOnRendering(cubeR, row)		
					);
			}
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
			view.updateCamera(camera, focus);
			view.updateLight(lights[0]);
		}

		this.start = function(){
			this.update();
			renderCommand.execute();
		};

	};

})(MVPresenter);


