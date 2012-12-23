(function(scope){
	var Controller 	= scope.Controller;

	Controller.CommandAxisSwitcher = function(command){
		var theCommand = command;
		//Public
		return {
			execute:function(){
				switch(theCommand.getAxis()){
					case "x":
						theCommand.setAxis("y");
						break;
					case "y":
						theCommand.setAxis("z");
						break;
					case "z":
						theCommand.setAxis("x");
						break;
				}
			}

		};

	};

})(MVCActive);


