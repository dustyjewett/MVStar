(function(scope){
	var Controller 	= scope.Controller;

	Controller.RenderViewOnce = function(preRenderCommands){	
		//Public
		return {
			execute:function(){
				//Because the view is active, we just run the commands, the view will render itself
				var commandI = preRenderCommands.length;
				while(commandI--){
					preRenderCommands[commandI].execute();
				}
			}

		};

	};

})(MVCActive);


