(function(scope){
	var View 		= scope.View;

	View.Component.BoundCube = function(cubeModel){
		//Private 
		var model = cubeModel;
		var _mesh;

		
		var cubeMaterial = new THREE.MeshLambertMaterial(
			{
			    color: parseInt(model.color, 16)
			});

		// set up the cube vars
		var size = 50, segmentSize = 10;

		// create a new mesh with cube geometry -
		// we will cover the cubeMaterial next!
		_mesh = new THREE.Mesh(
		   new THREE.CubeGeometry(size, size, size, 
		   	segmentSize, segmentSize, segmentSize),
		   cubeMaterial);

		//We associate the cube we created with the cube ID, so we can 
		//identify it when clicked
		_mesh.id = model.id;
		var update = function(){
				_mesh.position.x = model.getPosition().x;
				_mesh.position.y = model.getPosition().y;
				_mesh.position.z = model.getPosition().z;
				_mesh.rotation.x = model.getRotation().x;
				_mesh.rotation.y = model.getRotation().y;
				_mesh.rotation.z = model.getRotation().z;
			};
		update();
		model.on('update', update);
		//Public
		return {
			mesh:_mesh
		};

	};

})(MVVM);


