(function() {
	'use strict';

	angular
		.module('app.core')
		.service('gameService', gameService);

	gameService.$inject = ['storageService'];

	function gameService(storageService) {
		var newTeamModal;

		var gameService = {
			addTeam: addTeam,
			start: start,
			end: end,
			removeTeam: removeTeam,
			getGame: getGame
		};
		
		return gameService;

		////////////////

		function addTeam(teamName) {
			getGame().then( function(game){
				var team = {
					name: teamName,
					score: parseInt(0)
				};

				game.teams.push(team);
				setGame(game);
			});
		};

		function start(game){
			game.started = true;
			setGame(game);
		};

		function end(game){
			game.started = false;
			setGame(game);
		}

		function removeTeam(teamIndex) {
			getGame().then( function(game){
				game.teams.splice(teamIndex, 1);
				setGame(game);
			});
		};

		function getGame() {
			return storageService.getGame().then(function(game){
				return game;
			});
		};

		function setGame(game) {
			storageService.setGame(game);
		};
	}
})();