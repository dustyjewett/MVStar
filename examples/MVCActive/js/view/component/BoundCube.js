(function(scope){
	var View 		= scope.View;

	View.Component.BoundCube = function(cubeModel){
		//Private 
		var model = cubeModel;
		var _mesh;

		
		var cubeMaterial = new THREE.MeshLambertMaterial(
			{
			    color: model.color
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

		//Public
		return {
			mesh:_mesh,
			update:function(){
				_mesh.position.x = model.position.x;
				_mesh.position.y = model.position.y;
				_mesh.position.z = model.position.z;
				_mesh.rotation.x = model.rotation.x;
				_mesh.rotation.y = model.rotation.y;
				_mesh.rotation.z = model.rotation.z;
			}
		};

	};

})(MVCPassive);


