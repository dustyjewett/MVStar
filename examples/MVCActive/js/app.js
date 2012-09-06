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
		var mainView;

		//Instantiate our Model(s)
		scene = new Model.Scene();
		cubes = new Model.Cubes();
		lights = new Model.Lights();
		camera = new Model.Camera();
		focus = new Model.Focus();

		//Instantiate our View
		mainView = new View.Scene3dView(scene, cubes, lights, camera, focus);

		

	//Public
		return {
			initialize:function(){
				mainView.initialize();
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
