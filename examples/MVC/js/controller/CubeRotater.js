(function(scope){
	var Controller 	= scope.Controller;

	Controller.CubeRotater = function(cubeModel){
		var theCube = cubeModel;

		//Public
		return {
			enabled:true,
			execute:function(){
				if(this.enabled)
					theCube.rotation.y += 0.01;
			}

		};

	};

})(MVCPassive);


