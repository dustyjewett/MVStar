(function(scope){
	var Model 		= scope.Model;

	Model.Scene = function(){
		//Private 
		var _WIDTH = 600;
		var _HEIGHT = 600;


		//Public
		return {
			WIDTH:_WIDTH,
			HEIGHT:_HEIGHT,
			VIEW_ANGLE:45,
			ASPECT: _WIDTH / _HEIGHT,
			NEAR:0.1,
			FAR:10000,
			


		};

	};

})(MVVM);


