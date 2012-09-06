(function(scope){
	var Controller 	= scope.Controller;
	var Model 		= scope.Models;
	var View 		= scope.View;

	/*
	In MVP, our view is passive.  It has the bare amount of logic to create the UI 
	and nothing more.  We've added more public methods to allow the Presenter to
	be able to control the UI at a finer level.

	Because there is so little logic in the view, very little needs to be tested, 
	in comparison to the other patterns.
	*/
	View.Scene3dView = function(){
	//Private 

		var itemToCommandMap = {};
		var cubes = [];
		var meshes = [];
		var pointLight;
		var renderer;
		var scene;
		var camera;
		var projector;

		// get the DOM element to attach to
		// - assume we've got jQuery to hand
		var $container = $('#container');

	//Public
		this.initialize = function(WIDTH, HEIGHT, VIEW_ANGLE, ASPECT, NEAR, FAR){
			// create a WebGL renderer, camera
			// and a scene
			renderer = new THREE.WebGLRenderer();
			// start the renderer
			renderer.setSize(WIDTH, HEIGHT);
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera( 
											VIEW_ANGLE,
			                                ASPECT,
			                                NEAR,
			                                FAR  );
			scene.add(camera);
			projector = new THREE.Projector();

			// create a point light
			pointLight = new THREE.PointLight( 0xFFFFFF );
			// add to the scene
			scene.add(pointLight);

			// attach the render-supplied DOM element
			$container.append(renderer.domElement);

			//This is an unfortunately complicated way of finding out if a mesh was clicked on
			$container.on('mousedown', function( event ) {
					event.preventDefault();
					var vector = new THREE.Vector3( ( event.clientX / WIDTH ) * 2 - 1, - ( event.clientY / HEIGHT ) * 2 + 1, 0.5 );
					projector.unprojectVector( vector, camera );
					var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );
					var intersects = ray.intersectObjects( meshes );

					if ( intersects.length > 0) {
						//Here we dispatch an event for the cube that was clicked
						//The Presenter can do whatever it wants with this.
						this.emit("cubeClick",intersects[0].object.id);
					}
				}.bind(this));

		};
		/**
		 * Creates an individual cube
		 */
		this.createCube = function(/*CubeModel*/ cubeModel){
			var boundCube = new View.Component.BoundCube(cubeModel);
			//This is the 'active' part!
			//Whenever a model changes, we render!
			cubeModel.on('update', this.render);
			cubes.push(boundCube);
			meshes.push(boundCube.mesh);
			scene.add(boundCube.mesh);

		};

		this.updateCamera = function(cameraModel, focusModel){
				// set the camera position
				camera.position.x = cameraModel.x;
				camera.position.y = cameraModel.y;
				camera.position.z = cameraModel.z;
				// look where we're supposed to
				camera.lookAt(new THREE.Vector3(
					focusModel.x,
					focusModel.y,
					focusModel.z
					));
			};
		this.updateLight = function(lightModel){
				// set its position
				pointLight.position.x = lightModel.x;
				pointLight.position.y = lightModel.y;
				pointLight.position.z = lightModel.z;
			};
		this.render = function(){
				// draw!
				renderer.render(scene, camera);
			};


		EventEmitter.apply(this);
	};
	View.Scene3dView.prototype = EventEmitter.extend();

})(MVPresenter);


