(function(scope){
	var Controller 	= scope.Controller;
	var Model 		= scope.Models;
	var View 		= scope.View;

	View.Scene3dView = function(
		theScene, theCubes, theLights, theCamera, theFocus, 
		theView){
	//Private 
		var scene = theScene;
		var cubes = theCubes;
		var lights = theLights;
		var camera = theCamera;
		var focus = theFocus;

		var itemToCommandMap = {};
		var cubeObjs = [];
		var meshes = [];
		var pointLight;


		var cubeRotaters = [];
		var renderCommand;

		// get the DOM element to attach to
		// - assume we've got jQuery to hand
		var $container = $('#container');

		// create a WebGL renderer, camera
		// and a scene
		var renderer = new THREE.WebGLRenderer();
			// start the renderer
			renderer.setSize(scene.WIDTH, scene.HEIGHT);
		var sceneObj = new THREE.Scene();
		var cameraObj = new THREE.PerspectiveCamera(  scene.VIEW_ANGLE,
		                                scene.ASPECT,
		                                scene.NEAR,
		                                scene.FAR  );
			sceneObj.add(cameraObj);
		var projector = new THREE.Projector();

		// attach the render-supplied DOM element
		$container.append(renderer.domElement);

		//This is an unfortunately complicated way of finding out if a mesh was clicked on
		$container.on('mousedown', function( event ) {
				event.preventDefault();
				var vector = new THREE.Vector3( ( event.clientX / scene.WIDTH ) * 2 - 1, - ( event.clientY / scene.HEIGHT ) * 2 + 1, 0.5 );
				projector.unprojectVector( vector, cameraObj );
				var ray = new THREE.Ray( cameraObj.position, vector.subSelf( cameraObj.position ).normalize() );
				var intersects = ray.intersectObjects( meshes );

				if ( intersects.length > 0  && itemToCommandMap[intersects[0].object.id]) {
					itemToCommandMap[intersects[0].object.id].execute(event);
				}
			});


		//We loop through our items and add controllers for each
		var cubeI = cubes.length;
		while(cubeI--){
			var cubeR = new Controller.CubeRotater(cubes[cubeI], "x");
			cubeRotaters.push(cubeR);
			var toggleR = new Controller.CommandToggler(cubeR);
			itemToCommandMap[cubes[cubeI].id] = toggleR;
		}

		//Technically, these are no longer 'render' loops... they just update the model
		//We let the views determine if they need to render or not.
		//renderCommand = new Controller.RenderViewOnce(cubeRotaters);
		renderCommand = new Controller.RenderViewLoop(cubeRotaters);

	//Public
		/**
		 * Initialize the View
		 */
		this.initialize = function(){
			this.createCubes();
			this.createLight();

			this.update();
			renderCommand.execute();
		},
		this.createCubes = function(){
			var numOfCubes = cubes.length;
			while(numOfCubes--){
				var cubeModel = cubes[numOfCubes];
				var boundCube = new View.Component.BoundCube(cubeModel);
				//This is the 'active' part!
				//Whenever a model changes, we render!
				cubeModel.on('update', this.render);
				cubeObjs.push(boundCube);
				meshes.push(boundCube.mesh);
				sceneObj.add(boundCube.mesh);
			}
		},
		this.createLight = function(){
			// create a point light
			pointLight = new THREE.PointLight( 0xFFFFFF );
			// add to the scene
			sceneObj.add(pointLight);
		},
		this.update = function(){
			this.updateCamera();
			this.updateLight();
		},
		this.updateCamera = function(){
			// set the camera position
			cameraObj.position.x = camera.x;
			cameraObj.position.y = camera.y;
			cameraObj.position.z = camera.z;
			// look where we're supposed to
			cameraObj.lookAt(new THREE.Vector3(
				focus.x,
				focus.y,
				focus.z
				));
		},
		this.updateLight = function(){
			// set its position
			pointLight.position.x = lights[0].x;
			pointLight.position.y = lights[0].y;
			pointLight.position.z = lights[0].z;
		},
		this.render = function(){
			// draw!
			renderer.render(sceneObj, cameraObj);
		}

	};

})(MVCActive);


