(function(scope) {
	var Controller 	= scope.Controller;
	var Model 		= scope.Models;
	var View 		= scope.View;

	var tableTemplate 	= '<table><thead><td>Box</td><td>x</td><td>y</td><td>z</td></thead></table>';
	var rowTemplate 	= '<tr></tr>';
	var cellTemplate 	= '<td></td>';

	/*
	The Stats View is a simple view into the underlying data

	It serves here to show how the same model can drive several views.
	*/
	View.StatsView = function(viewModel) {
		//Private 
		var viewModel = viewModel;

		var cubes = viewModel.CUBES_UI;
		var rows = [];

		// get the DOM element to attach to
		// - assume we've got jQuery to hand
		var $stats = $('#stats');

		$stats.append($(tableTemplate));
		var $table = $stats.find('table');

		function createRows() {
			var numOfCubes = cubes.length;
			while (numOfCubes--) {
				var cubeUIModel = cubes[numOfCubes];
				var row = new View.Component.StatsRow(cubeUIModel);
				rows.push(row);
				$table.append(row.$el);

			}
		};

		//Public
		/**
		 * Initialize the View
		 */
		this.initialize = function() {
			createRows();
		};


	};

	View.Component.StatsRow = function(theCubeVM) {
		var viewModel = theCubeVM;
		var $el = $(rowTemplate);
		var cells = {};
		//Initialize children
		var $rowLabel = $("<td>" + viewModel.label + "</td>");
		$rowLabel.css("color", "#" + viewModel.color);
		$el.append($rowLabel);

		cells.x = new View.Component.StatsCell(viewModel, "x");
		$el.append(cells.x.$el);
		cells.y = new View.Component.StatsCell(viewModel, "y");
		$el.append(cells.y.$el);
		cells.z = new View.Component.StatsCell(viewModel, "z");
		$el.append(cells.z.$el);

		this.update = function() {
			$rowLabel.toggleClass("css3-blink", !viewModel.isRotationEnabled())
			cells.x.$el.toggleClass("inactiveCell", !viewModel.isAxisActive("x"));
			cells.y.$el.toggleClass("inactiveCell", !viewModel.isAxisActive("y"));
			cells.z.$el.toggleClass("inactiveCell", !viewModel.isAxisActive("z"));
		}
		this.update();
		viewModel.on('update', this.update);

		//Public
		this.$el = $el;
	}

	var PI = 3.141592653;
	var OVER_PI = 180 / PI;

	View.Component.StatsCell = function(theCubeVM, theProperty) {
		var viewModel = theCubeVM;
		var prop = theProperty;
		var $el = $(cellTemplate);


		this.$el = $el;
		this.update = function() {
			var degs = viewModel.getRotation()[prop] * OVER_PI;
			degs = degs % 360;
			$el.text(degs.toFixed(0));
		}

		viewModel.onDataUpdate(this.update);

	}

})(MVVM);