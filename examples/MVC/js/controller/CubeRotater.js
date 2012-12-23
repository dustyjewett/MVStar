/**
 * CubeRotater is a command that increments the model's rotation along a given axis
 * Patterns used: Dependency Injection, Command
 */
(function(scope){
	var Controller 	= scope.Controller;

	Controller.CubeRotater = function(model, axis){
		//Public
		return {
			enabled:true,
			execute:function(){
				if(this.enabled)
					model.rotation[axis] += 0.01;
			}
		};
	};
})(MVCPassive);