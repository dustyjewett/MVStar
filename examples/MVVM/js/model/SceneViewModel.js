(function(scope){
	var Controller 	= scope.Controller;
	var Model 		= scope.Model;

	/*

	Our ViewModel acts as a facade into the rest of the 'system'
	Therefore, any actions that affect other views must
	go through the VM.
	On the other hand, actions that don't affect other views
	can happen in the View itself.
	Generally speaking, MVVM is somewhere between MVC and MVP
	Whereas MVP requires as little logic in the view as possible
	and MVC defaults to putting logic in the view.

	MVVM distributes 'logic' throughout all of the pieces, but 
	'Business Logic' is kept out of the View.  

	In this example, the Commands are rather pointless, but 
	they become more important when dealing with synchronizing
	views and async server communication.

	*/

	Model.SceneViewModel = function(sceneModel, cubes, lights, camera, focus){
	//Private 
		var cubeRotaters = [];
		var renderCommand;
		var itemToCommandMap = {};
		


	//Public

		this.WIDTH = sceneModel.WIDTH;
		this.HEIGHT = sceneModel.HEIGHT;
		this.VIEW_ANGLE = sceneModel.VIEW_ANGLE;
		this.ASPECT = sceneModel.ASPECT;
		this.NEAR = sceneModel.NEAR;
		this.FAR = sceneModel.FAR;

		this.CUBES = cubes;
		this.CUBES_UI = [];
		this.CAMERA = camera;
		this.FOCUS = focus;
		this.LIGHT = lights[0];

		//We loop through our items and add controllers for each
		var cubeI = cubes.length;
		while(cubeI--){
			var cubeUIModel = new Model.CubeViewModel(cubes[cubeI]);
			this.CUBES_UI.push(cubeUIModel);

			var cubeR = new Controller.CubeRotater(cubeUIModel, "x");
			cubeRotaters.push(cubeR);
			var toggleR;
			if(cubes[cubeI].label == "White"){
				toggleR = new Controller.CommandAxisSwitcher(cubeUIModel);
			}else{
				toggleR = new Controller.CommandToggler(cubeR);
			}
			itemToCommandMap[cubes[cubeI].id] = toggleR;
		}

		//Technically, these are no longer 'render' loops... they just update the model
		//We let the views determine if they need to render or not.
		//renderCommand = new Controller.RenderViewOnce(cubeRotaters);
		renderCommand = new Controller.RenderViewLoop(cubeRotaters);

		this.initialize = function(){
			renderCommand.execute();
		}

		this.handleClick = function(cubeId){
			if(itemToCommandMap[cubeId])
				itemToCommandMap[cubeId].execute();
		}


		EventEmitter.apply(this);
	};
	Model.SceneViewModel.prototype = EventEmitter.extend();

})(MVVM);


