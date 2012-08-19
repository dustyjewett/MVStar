(function(scope){
	var Controller 	= scope.Controller;

	Controller.RenderViewOnce = function(preRenderCommands, view){	
		//Public
		return {
			execute:function(){
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

		};

	};

})(MVCPassive);


