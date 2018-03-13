myApp.factory('Authentication', ['$rootScope','$location','$firebaseObject','$firebaseAuth',
function($rootScope,$location,$firebaseObject,$firebaseAuth){
  var ref = firebase.database().ref();
  var auth = $firebaseAuth();
  var myObj;

  auth.$onAuthStateChanged(function(authUser){
      if(authUser){
        var userRef = ref.child('users').child(authUser.uid);
        var userObj = $firebaseObject(userRef);
        $rootScope.currentUser = userObj;
      }
      else{
        $rootScope.currentUser = '';

      }
  });

  myObj = {
    login:function(user){
      auth.$signInWithEmailAndPassword(
        user.email,
        user.password
      ).then(function(){
        $rootScope.message = '';
        $location.path('/home');
      }).catch(function(error){
        $rootScope.message = error.message;
      });
    },
    logout:function(){
      auth.$signOut();
      $rootScope.message = '';
    },
    requireAuth: function(){
        return auth.$requireSignIn();
      },
    register:function(user){
      auth.$createUserWithEmailAndPassword(
        user.email,
        user.password
      ).then(function(regUser){
        var regRef = ref.child('users').
        child(regUser.uid).set({
          date:firebase.database.ServerValue.TIMESTAMP,
          regUser:regUser.uid,
          firstname:user.firstname,
          lastname:user.lastname,
          email:user.email
        });
      }).catch(function(error){
        $rootScope.message = error.message;
      });
    }
  }
  return myObj;
}]);
