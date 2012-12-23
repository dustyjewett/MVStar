(function(scope){
	var Controller 	= scope.Controller;

	Controller.RenderViewLoop = function(preRenderCommands, onFinishFunction){	
		var render = function(){
			//First, we request another frame
			window.requestAnimationFrame(render);
			
			//This command now just executes all of the other commands,
			//Then it calls onFinishFunction, so the presenter can know
			//When all of the items have been updated.
			var commandI = preRenderCommands.length;
			while(commandI--){
				preRenderCommands[commandI].execute();
			}
			onFinishFunction.call();
		}
		//Public
		return {
			execute:function(){
				render();
			}

		};

	};

})(MVPresenter);


