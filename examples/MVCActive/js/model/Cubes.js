(function(scope){
	var Model 		= scope.Model;

	Model.Cubes = function(){
		//Public
		return [
				new Model.CubeModel(
					"White",
					{//position
						x:0,
						y:0,
						z:0
					},
					"EEEEEE"
				),
				new Model.CubeModel(
					"Yellow",
					{//position
						x:100,
						y:0,
						z:0
					},
					"EEEE00"
				),
				new Model.CubeModel(
					"Magenta",
					{//position
						x:-100,
						y:0,
						z:0
					},
					"EE00EE"
				),
				new Model.CubeModel(
					"Green",
					{//position
						x:0,
						y:100,
						z:0
					},
					"00EE00"
				),
				new Model.CubeModel(
					"Cyan",
					{//position
						x:0,
						y:-100,
						z:0
					},
					"00EEEE"
				),
				new Model.CubeModel(
					"Blue",
					{//position
						x:0,
						y:0,
						z:100
					},
					"0000EE"
				),
				new Model.CubeModel(
					"Red",
					{//position
						x:0,
						y:0,
						z:-100
					},
					"EE0000"
				),


			]

	};

})(MVCActive);


