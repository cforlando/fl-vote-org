(function () {
  'use strict';

  angular
    .module('flvote')
    .controller('BillsCtrl', BillsCtrl);

  function BillsCtrl(BillsSvc, TwitterSvc, $timeout, $location, $stateParams) {

    var vm = this;

    vm.fetchBills = function (query) {
      var params = {
        q: query,
        subject: vm.subject
      };
      BillsSvc.fetchBillsCustomParams(params).then(function(d) {
        vm.allBills = d.data.data;
        vm.bills = vm.allBills.slice(0,10);
        vm.meta = d.data.meta;
        vm.links = d.data.links;
        generateTwitterShareLink(vm.bills)
      })
      // GA tracking
      ga('send', {
        'hitType': 'event',
        'eventCategory': 'User Find Bills',
        'eventAction': 'Submit Search Query',
        'eventLabel': query
        });
    };

    function generateTwitterShareLink(bills){
      angular.forEach(bills, function(bill){
        TwitterSvc.addTwitterLinksToBill(bill);
      });
    }

    vm.voteNo = function(bill){
      // GA tracking
      ga('send', {
        'hitType': 'event',
        'eventCategory': 'Twitter Button',
        'eventAction': 'Click Vote #NO',
        'eventLabel': bill.attributes.identifier + ' ' + bill.attributes.title
        });
    }

    vm.voteYes = function(bill){
      // GA tracking
      ga('send', {
        'hitType': 'event',
        'eventCategory': 'Twitter Button',
        'eventAction': 'Click Vote #YES',
        'eventLabel': bill.attributes.identifier + ' ' + bill.attributes.title
        });
    }

    vm.getNextPage = function() {

      var idx = vm.bills.length - 1;

      if (vm.bills.length < vm.allBills.length) {
        vm.bills = vm.allBills.slice(0, idx + 10);
        generateTwitterShareLink(vm.bills.slice(idx, idx + 10))
        sendGAEvent();
      } else if (vm.links.next) {
        BillsSvc.fetchNext(vm.links.next)
          .then(function(d) {
            vm.allBills = [].concat(vm.allBills, d.data.data);
            vm.bills = vm.allBills.slice(0, idx + 10);
            generateTwitterShareLink(vm.bills.slice(idx, idx + 10));
            sendGAEvent();
          })
      }

      function sendGAEvent(){
        ga('send', {
          'hitType': 'event',
          'eventCategory': 'User Find Bills',
          'eventAction': 'Click Load More',
          'eventLabel': 'Show ' + vm.bills.length + '  results'
          });
      }
    };

    vm.init = function () {
      vm.subject = $stateParams.subject;

      vm.fetchBills();

      // vm.searchQuery = $location.search().
    };

    vm.init();

  }

})();
