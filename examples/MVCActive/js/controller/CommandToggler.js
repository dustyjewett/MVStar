(function(scope){
	var Controller 	= scope.Controller;

	Controller.CommandToggler = function(command){
		var theCommand = command;
		//Public
		return {
			execute:function(){
				theCommand.enabled = !theCommand.enabled;
			}

		};

	};

})(MVCPassive);


