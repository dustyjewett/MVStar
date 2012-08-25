(function(scope){
	var Controller 	= scope.Controller;
	//We don't use 'this' anywhere to ensure that we don't have scoping issues.
	Controller.CommandToggler = function(command){
		var theCommand = command;
		//Public
		return {
			execute:function(){
				theCommand.enabled = !theCommand.enabled;
			}

		};

	};

})(MVPresenter);


