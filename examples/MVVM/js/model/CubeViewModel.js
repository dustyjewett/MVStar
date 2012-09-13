(function(scope){
	var Model 		= scope.Model;

	/*
	The Cube UI Model is a decorator for the 'standard' CubeModel. 

	It adds the ability to save some UI-specific state, and helper functions for
	modifying the original model.


	*/
	Model.CubeViewModel = function(cubeModel){
		var _data = cubeModel
		
		var _activeRotationAxis = {
			x:true,
			y:false,
			z:false
		}

		var _rotateEnabled = true;

	//Public
		//We pull down some of the properties of the _data directly
		this.label = _data.label;
		this.color = _data.color;
		this.getRotation = _data.getRotation;
		//We have our own 'on' method, so we make a little helper
		//method to make it clear what's going on
		this.onDataUpdate = function(fn){
			_data.on("update", fn);
		};

		this.isRotationEnabled = function(){
			return _rotateEnabled;
		};

		this.isAxisActive = function(axis){
			return _activeRotationAxis[axis];
		};
		//Increment any of the active rotations
		this.incrementActiveRotation = function(amount){
			if(!_rotateEnabled) return false;

			var r = _data.getRotation();
			if(_activeRotationAxis.x)
				r.x += amount;
			if(_activeRotationAxis.y)
				r.y += amount;
			if(_activeRotationAxis.z)
				r.z += amount;
			_data.setRotation(r);
		};

		this.switchToAnotherAxis = function(){
			var r = _data.getRotation();
			if(_activeRotationAxis.x)
				_activeRotationAxis.x = false, _activeRotationAxis.y = true;
			else if(_activeRotationAxis.y)
				_activeRotationAxis.y = false, _activeRotationAxis.z = true;
			else if(_activeRotationAxis.z)
				_activeRotationAxis.z = false, _activeRotationAxis.x = true;
			_data.setRotation(r);
			this.emit("update")
		};

		this.toggleRotationEnabled = function(){
			_rotateEnabled = !_rotateEnabled;
			this.emit("update")
		};

		EventEmitter.apply(this);
	};
	Model.CubeViewModel.prototype = EventEmitter.extend();

})(MVVM);


