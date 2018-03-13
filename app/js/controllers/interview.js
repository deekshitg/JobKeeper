myApp.controller('InterviewController',['$filter','$scope','$firebaseAuth','$firebaseArray',
  function($filter,$scope,$firebaseAuth,$firebaseArray){
    var ref = firebase.database().ref();
    var auth = $firebaseAuth();
    var myObj;

    auth.$onAuthStateChanged(function(authUser){
        if(authUser){
         var intRef = ref.child('users').child(authUser.uid).child('interviews');
         var intInfo = $firebaseArray(intRef);
         $scope.interviews = intInfo;
         // $date = $filter('date')($scope.interviewdate, 'fullDate');
         $scope.addInterview = function(){
           intInfo.$add({
             name:$scope.interviewname,
             date:$filter('date')($scope.interviewdate,'shortDate')
           }).then(function(){
             $scope.message = "Interview added";
             $scope.interviewname = '';
             $scope.interviewdate = '';
           })
         };//addInterview
         $scope.deleteInterview = function(key){
           intInfo.$remove(key);
         }

       }//authUser
    });//onAuthStateChanged

}])//controller
