(function(scope){
	var Controller 	= scope.Controller;

	Controller.RenderViewOnce = function(preRenderCommands, onFinishFunction){	
		//Public
		return {
			execute:function(){
				//This command now just executes all of the other commands,
				//Then it calls onFinishFunction, so the presenter can know
				//When all of the items have been updated.
				var commandI = preRenderCommands.length;
				while(commandI--){
					preRenderCommands[commandI].execute();
				}
				onFinishFunction.call();
			}

		};

	};

})(MVPresenter);


