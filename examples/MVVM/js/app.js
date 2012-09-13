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
		var scene, cubes, lights, camera, focus;
		var mainView;

		//Poor-man's Dependency Injection

		//Instantiate our Model(s)
		scene = new Model.Scene();
		cubes = new Model.Cubes();
		lights = new Model.Lights();
		camera = new Model.Camera();
		focus = new Model.Focus();

		//Instantiate our ViewModel
		viewModel = new Model.SceneViewModel(scene, cubes, lights, camera, focus);

		//Instantiate our View
		mainView = new View.Scene3dView(viewModel);
		statsView = new View.StatsView(viewModel);
		

	//Public
		return {
			initialize:function(){
				mainView.initialize();
				statsView.initialize();
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
