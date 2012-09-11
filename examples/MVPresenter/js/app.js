(function(scope){
	var Controller 	= scope.Controller;
	var Model 		= scope.Model;
	var View 		= scope.View;

	/**
	 * The App is basically just a factory that creates the pieces
	 * and hooks them together.
	 */
	scope.MVPresenterApp = function(){
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

		//Instantiate our View
		mainView = new View.Scene3dView();
		statsView = new View.StatsView(cubes);

		//Instantiate our Presenter
		mainPresenter = new Controller.Scene3dPresenter(
			scene, cubes, lights, camera, focus, 
			mainView);


	//Public
		return {
			initialize:function(){
				mainPresenter.start();
				statsView.initialize();
			}
		};

	};

})(MVPresenter);



/** Start up the application **/

(function(scope){
	var Controller 	= scope.Controller;
	var Model 		= scope.Model;
	var View 		= scope.View;

	scope.app = new scope.MVPresenterApp();
	scope.app.initialize();

})(MVPresenter);
