/**
 * CubeRotater is a command that increments the model's rotation along a given axis
 * Patterns used: Dependency Injection, Command
 */
(function(scope){
	var Controller 	= scope.Controller;

	Controller.CubeRotater = function(model, axis){
		var _model = model;
		var _axis = axis;
		//Public
		return {
			enabled:true,
			execute:function(){
				if(this.enabled){
					var r = _model.getRotation();
					r[_axis] += 0.01;
					_model.setRotation(r);
				}
			},
			setAxis:function(newAxis){
				_axis = newAxis;
			},
			getAxis:function(){
				return _axis;
			}
		};
	};
})(MVCActive);