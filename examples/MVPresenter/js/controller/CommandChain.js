(function(scope){
	var Controller 	= scope.Controller;

	Controller.CommandChain = function(){
		var commands = arguments;
		//Public
		return {
			execute:function(){
				for(var i = 0; i < commands.length; i++){
					commands[i].execute();
				}
			}

		};

	};

})(MVPresenter);


