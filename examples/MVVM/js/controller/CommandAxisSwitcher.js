(function(scope){
	var Controller 	= scope.Controller;

	Controller.CommandAxisSwitcher = function(UiModel){
		var _model = UiModel;
		//Public
		return {
			execute:function(){
				_model.switchToAnotherAxis();
			}

		};

	};

})(MVVM);


