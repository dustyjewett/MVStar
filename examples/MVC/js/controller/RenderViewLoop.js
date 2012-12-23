(function(scope){
	var Controller 	= scope.Controller;

	Controller.RenderViewLoop = function(preRenderCommands, view){	
		var render = function(){
			//First, we request another frame
			window.requestAnimationFrame(render);
			
			//Because the view is passive, it only does things when told
			//So we need to process all outside inputs, including animation
			//frames ouside of the view
			var commandI = preRenderCommands.length;
			while(commandI--){
				preRenderCommands[commandI].execute();
			}

			view.update();
			view.render();
		}
		//Public
		return {
			execute:function(){
				render();
			}

		};

	};

})(MVCPassive);


