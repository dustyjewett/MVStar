(function(scope){
	var Controller 	= scope.Controller;

	Controller.RenderViewLoop = function(preRenderCommands){	
		var render = function(){
			//First, we request another frame
			window.requestAnimationFrame(render);
			
			//Because the view is active, we just run the commands, the view will render itself
			var commandI = preRenderCommands.length;
			while(commandI--){
				preRenderCommands[commandI].execute();
			}
		}
		//Public
		return {
			execute:function(){
				render();
			}

		};

	};

})(MVPresenter);


