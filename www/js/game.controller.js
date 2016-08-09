(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('GameCtrl', GameCtrl);

	GameCtrl.$inject = ['$scope', '$ionicModal', 'gameService', 'storageService', 'teamService'];

	function GameCtrl($scope, $ionicModal, gameService, storageService, teamService) {
		var vm             = this;
		vm.currentGame     = {};
		vm.teamName;
		vm.start           = start;
		vm.end             = end;
		vm.addTeam         = addTeam;
		vm.addPoints       = addPoints;
		vm.removeTeam      = removeTeam;
		vm.openModal       = openModal;
		vm.closeModal      = closeModal;
		vm.currentTeamData = {};
		vm.editTeam        = editTeam;
		vm.updateTeam      = updateTeam;
		vm.pointsToAdd     = 0;

		vm.newTeamModal;
		vm.editTeamModal;
		vm.addPointsModal;

		activate();

		////////////////

		function activate() {
			setCurrentGame();

			$ionicModal.fromTemplateUrl('js/team/add-team.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				vm.newTeamModal = modal;
			});

			$ionicModal.fromTemplateUrl('js/team/edit-team.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				vm.editTeamModal = modal;
			});

			$ionicModal.fromTemplateUrl('js/team/add-points.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				vm.addPointsModal = modal;
			});
		};
		
		function start() {
			gameService.start(vm.currentGame);
			setCurrentGame();
		};

		function end() {
			gameService.end(vm.currentGame);
			setCurrentGame();
		};

		function openModal(modal){
			modal.show();
		}

		function closeModal(modal){
			modal.hide();
		}

		function addTeam() {

			if ( !vm.teamName ) {
				return;
			}

			gameService.addTeam(vm.currentGame, vm.teamName);
			closeModal(vm.newTeamModal);
			setCurrentGame();
		};

		function removeTeam(index) {
			gameService.removeTeam(vm.currentGame, index);
			setCurrentGame();
		};

		function editTeam(index) {
			openModal(vm.editTeamModal);
			vm.currentTeamData.team = vm.currentGame.teams[index];
			vm.currentTeamData.index = index;
		};

		function updateTeam(modal) {
			teamService.updateTeam(vm.currentTeamData.team.name, vm.currentTeamData.team.score + vm.pointsToAdd, vm.currentTeamData.index);
			closeModal(modal);
			vm.pointsToAdd = 0;
			setCurrentGame();
		};

		function addPoints(index) {
			openModal(vm.addPointsModal);
			vm.currentTeamData.team = vm.currentGame.teams[index];
			vm.currentTeamData.index = index;
		};

		function setCurrentGame() {
			storageService.getGame().then( function(game){
				vm.currentGame = game;
			});
		};
	}
})();