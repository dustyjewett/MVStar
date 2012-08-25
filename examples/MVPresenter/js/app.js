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
		var mainModel;
		var mainView;
		var renderCommand;

		//Instantiate our Model(s)
		mainModel = new Model.SceneModel();

		//Instantiate our View
		mainView = new View.Scene3dView();

		//Instantiate our Presenter
		mainPresenter = new Controller.Scene3dPresenter(mainModel, mainView);


	//Public
		return {
			initialize:function(){
				mainPresenter.start();
				
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
