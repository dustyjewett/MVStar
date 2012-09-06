(function(scope){
	var Model 		= scope.Model;

	Model.Cubes = function(){
		//Public
		return [
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

})(MVPresenter);


