(function(scope){
	var Model 		= scope.Model;

	Model.CubeModel = function(position, color, rotation){
		var _id = Model.generateGUID();
		var _position = position;
		var _color = color || 0xCC0000
		var _rotation = rotation || {x:0,y:0,z:0};

		//Public
		return {
			id:_id,
			position:_position,
			rotation:_rotation,
			color:_color
		};

	};

})(MVCPassive);


