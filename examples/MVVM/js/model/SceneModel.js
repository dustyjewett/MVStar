(function(scope){
	var Model 		= scope.Model;

	Model.SceneModel = function(){
		//Private 
		var _WIDTH = 600;
		var _HEIGHT = 600;


		//Public
		return {
			WIDTH:_WIDTH,
			HEIGHT:_HEIGHT,
			VIEW_ANGLE:45,
			ASPECT: _WIDTH / _HEIGHT,
			NEAR:0.1,
			FAR:10000,
			CAMERA:{
				x:300,
				y:300,
				z:300
			},
			FOCUS:{
				x:0,
				y:0,
				z:0
			},
			LIGHT:{
				x:10,
				y:450,
				z:430
			},
			CUBES:[
				new Model.CubeModel(
					{//position
						x:0,
						y:0,
						z:0
					},
					0xEEEEEE
				),
				new Model.CubeModel(
					{//position
						x:100,
						y:0,
						z:0
					},
					0xEEEE00
				),
				new Model.CubeModel(
					{//position
						x:-100,
						y:0,
						z:0
					},
					0xEE00EE
				),
				new Model.CubeModel(
					{//position
						x:0,
						y:100,
						z:0
					},
					0x00EE00
				),
				new Model.CubeModel(
					{//position
						x:0,
						y:-100,
						z:0
					},
					0x00EEEE
				),
				new Model.CubeModel(
					{//position
						x:0,
						y:0,
						z:100
					},
					0x0000EE
				),
				new Model.CubeModel(
					{//position
						x:0,
						y:0,
						z:-100
					},
					0xEE0000
				),


			]


		};

	};

})(MVVM);


