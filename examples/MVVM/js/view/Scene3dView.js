(function(scope){
	var Controller 	= scope.Controller;
	var Model 		= scope.Models;
	var View 		= scope.View;

	/*
	
	Our View here has quite a bit of logic in it, as it relates to drawing the scene,
	but the logic for responding to user events, and  how the data may be separated
	into different models is all abstracted.  

	The 'big deal' here is that there's only interface into the rest of the app... 
	whether it's acquiring data or responding to user input
	*/

	View.Scene3dView = function(viewModel){
	//Private 
		var viewModel = viewModel;

		var cubes = [];
		var meshes = [];
		var pointLight;

		// get the DOM element to attach to
		// - assume we've got jQuery to hand
		var $container = $('#container');

		// create a WebGL renderer, camera
		// and a scene
		var renderer = new THREE.WebGLRenderer();
			// start the renderer
			renderer.setSize(viewModel.WIDTH, viewModel.HEIGHT);
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera(  viewModel.VIEW_ANGLE,
		                                viewModel.ASPECT,
		                                viewModel.NEAR,
		                                viewModel.FAR  );
			scene.add(camera);
		var projector = new THREE.Projector();

		// attach the render-supplied DOM element
		$container.append(renderer.domElement);

		//This is an unfortunately complicated way of finding out if a mesh was clicked on
		$container.on('mousedown', function( event ) {
				event.preventDefault();
				var vector = new THREE.Vector3( ( event.clientX / viewModel.WIDTH ) * 2 - 1, - ( event.clientY / viewModel.HEIGHT ) * 2 + 1, 0.5 );
				projector.unprojectVector( vector, camera );
				var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );
				var intersects = ray.intersectObjects( meshes );

				if ( intersects.length > 0 ) {
					viewModel.handleClick(intersects[0].object.id)
					
				}
			});

	//Public
		return {
			/**
			 * Initialize the View
			 */
			initialize:function(){
				this.createCubes();
				this.createLight();

				this.update();
				viewModel.initialize();
			},
			createCubes:function(){
				var numOfCubes = viewModel.CUBES.length;
				while(numOfCubes--){
					var cubeModel = viewModel.CUBES[numOfCubes];
					var boundCube = new View.Component.BoundCube(cubeModel);
					//This is the 'active' part!
					//Whenever a viewModel changes, we render!
					cubeModel.on('update', this.render);
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
			update:function(){
				this.updateCamera();
				this.updateLight();
			},
			updateCamera:function(){
				// set the camera position
				camera.position.x = viewModel.CAMERA.x;
				camera.position.y = viewModel.CAMERA.y;
				camera.position.z = viewModel.CAMERA.z;
				// look where we're supposed to
				camera.lookAt(new THREE.Vector3(
					viewModel.FOCUS.x,
					viewModel.FOCUS.y,
					viewModel.FOCUS.z
					));
			},
			updateLight:function(){
				// set its position
				pointLight.position.x = viewModel.LIGHT.x;
				pointLight.position.y = viewModel.LIGHT.y;
				pointLight.position.z = viewModel.LIGHT.z;
			},
			render:function(){
				// draw!
				renderer.render(scene, camera);
			}
		};

	};

})(MVVM);


