(function(scope){
	var Controller 	= scope.Controller;
	var Model 		= scope.Model;
	var View 		= scope.View;

	/**
	 * The App is basically just a factory that creates the pieces
	 * and hooks them together.
	 */
	scope.MVCActiveApp = function(){
	//Private 
		var scene, cubes, lights, camera, focus;
		var mainView, statsView;

		//Instantiate our Models
		scene = new Model.Scene();
		cubes = new Model.Cubes();
		lights = new Model.Lights();
		camera = new Model.Camera();
		focus = new Model.Focus();

		//Instantiate our Views
		mainView = new View.Scene3dView(scene, cubes, lights, camera, focus);
		statsView = new View.StatsView(cubes);
		

	//Public
		return {
			initialize:function(){
				mainView.initialize();
				statsView.initialize();
			}
		};

	};

})(MVCActive);



/** Start up the application **/

(function(scope){
	var Controller 	= scope.Controller;
	var Model 		= scope.Model;
	var View 		= scope.View;

	scope.app = new scope.MVCActiveApp();
	scope.app.initialize();

})(MVCActive);
