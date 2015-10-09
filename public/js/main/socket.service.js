import io from '/socket.io/socket.io';

function socket($rootScope) {
  var socket = io.connect();
  return {
    init: function(eventsName) {
      socket.removeAllListeners(eventsName);
    },
    on: function(eventName, callback) {
      socket.on(eventName, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          callback.apply(socket, args);
        });
      });
    },
    emit: function(eventName, data, callback) {
      socket.emit(eventName, data, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
}
// class socket {
//   constructor($rootScope) {
//     this.socket = io.connect();
//     this.$rootScope = $rootScope;
//   }
//
//   on(eventName, callback) {
//     this.socket.on(eventName, function() {
//       var args = arguments;
//       this.$rootScope.$apply(function() {
//         callback.apply(socket, args);
//       });
//     });
//   }
//
//   emit(eventName, data, callback) {
//     this.socket.emit(eventName, data, function() {
//       var args = arguments;
//       this.$rootScope.$apply(function() {
//         if (callback) {
//           callback.apply(socket, args);
//         }
//       });
//     });
//   }
//
// }

socket.$inject = ['$rootScope'];
export default socket;
