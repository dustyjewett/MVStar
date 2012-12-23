/**
 * CubeRotater is a command that increments the model's rotation along a given axis
 * Patterns used: Dependency Injection, Command
 */
(function(scope){
	var Controller 	= scope.Controller;

	Controller.CubeRotater = function(UiModel, axis){
		var _model = UiModel;
		var _axis = axis;
		//Public
		return {
			execute:function(){
				_model.incrementActiveRotation(0.01);
			},
			toggleEnabled:function(){
				_model.toggleRotationEnabled();
			}
		};
	};
})(MVVM);