(function(scope){
	var Controller 	= scope.Controller;
	var Model 		= scope.Models;
	var View 		= scope.View;

	View.AwesomeView = function(theModel){
		//Private 
		var model = theModel;

		var itemToCommandMap = {};

		// get the DOM element to attach to
		// - assume we've got jQuery to hand
		var $container = $('#container');

		// create a WebGL renderer, camera
		// and a scene
		var renderer = new THREE.WebGLRenderer();
		// start the renderer
		renderer.setSize(model.WIDTH, model.HEIGHT);

		var camera = new THREE.PerspectiveCamera(  model.VIEW_ANGLE,
		                                model.ASPECT,
		                                model.NEAR,
		                                model.FAR  );
		var scene = new THREE.Scene();
		var projector = new THREE.Projector();

		// and the camera
		scene.add(camera);

		// attach the render-supplied DOM element
		$container.append(renderer.domElement);


		var cubes = [];
		var meshes = [];
		var pointLight;

		$container.on('mousedown', function( event ) {
				event.preventDefault();

				var vector = new THREE.Vector3( ( event.clientX / model.WIDTH ) * 2 - 1, - ( event.clientY / model.HEIGHT ) * 2 + 1, 0.5 );
				projector.unprojectVector( vector, camera );

				var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );

				var intersects = ray.intersectObjects( meshes );

				if ( intersects.length > 0 ) {

					var command = itemToCommandMap[intersects[0].object.id];
					if(command != undefined)
						command.execute();

				}

			});

		//Public
		return {
			initialize:function(){
				this.createCubes();
				this.createLight();

				this.updateCamera();
				this.updateCubes();
				this.updateLight();
			},
			setClickCommand:function(model, command){
				itemToCommandMap[model.id] = command;
			},
			createCubes:function(){
				var numOfCubes = model.CUBES.length;
				while(numOfCubes--){
					var boundCube = new View.Component.BoundCube(model.CUBES[numOfCubes]);
					cubes.push(boundCube);
					meshes.push(boundCube.mesh);
					scene.add(boundCube.mesh);
				}
			},
			createLight:function(){
				// create a point light
				pointLight = new THREE.PointLight( 0xFFFFFF );
				// add to the scene
				scene.add(pointLight);
			},
			updateCamera:function(){
				// set the camera position
				camera.position.x = model.CAMERA.x;
				camera.position.y = model.CAMERA.y;
				camera.position.z = model.CAMERA.z;
				// look where we're supposed to
				camera.lookAt(new THREE.Vector3(
					model.FOCUS.x,
					model.FOCUS.y,
					model.FOCUS.z
					));
			},
			updateLight:function(){
				// set its position
				pointLight.position.x = model.LIGHT.x;
				pointLight.position.y = model.LIGHT.y;
				pointLight.position.z = model.LIGHT.z;
			},
			updateCubes:function(){
				var cubeI = cubes.length;
				while(cubeI--){
					cubes[cubeI].update();
				}
			},
			render:function(){
				// draw!
				renderer.render(scene, camera);
			}
		};

	};

})(MVCPassive);


