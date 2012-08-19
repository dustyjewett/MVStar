(function(scope){
	var Model 		= scope.Model;

	Model.CubeModel = function(position, color, rotation){
		var _id = Model.generateGUID();
		var _position = position;
		var _color = color || 0xCC0000;
		var _rotation = rotation || {x:0,y:0,z:0};

		//Public
		this.id = _id;
		this.setPosition = function(p){
				_position = p;
				this.emit('update');
			};
		this.getPosition = function(){
				return _position;
			};
		this.setRotation = function(r){
				_rotation = r;
				this.emit('update');
			};
		this.getRotation = function(){
				return _rotation
			};
		this.color = _color;

		EventEmitter.apply(this);
	};
	Model.CubeModel.prototype = EventEmitter.extend();

})(MVCActive);


