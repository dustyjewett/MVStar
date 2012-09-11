(function(scope){
	var Controller 	= scope.Controller;

	Controller.UpdateRowBasedOnRendering = function(theCommand, theRow){
		var command = theCommand;
		var row = theRow;
		//Public
		return {
			execute:function(){
				if(command.enabled){
					row.setEnabled();
				}else{
					row.setDisabled();
				}

				row.setActiveCell(command.getAxis());
			}

		};

	};

})(MVPresenter);


