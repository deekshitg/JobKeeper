myApp.controller('CompanyController',['$filter','$scope','$firebaseAuth','$firebaseArray',
  function($filter,$scope,$firebaseAuth,$firebaseArray){
    var ref = firebase.database().ref();
    var auth = $firebaseAuth();
    var myObj;

    auth.$onAuthStateChanged(function(authUser){
        if(authUser){
         var cmpRef = ref.child('users').child(authUser.uid).child('companies');
         var cmpInfo = $firebaseArray(cmpRef);
         // $date = $filter('date')($scope.interviewdate, 'fullDate');
         $scope.companies = cmpInfo;
         $scope.query = "";
         $scope.addCompany = function(){
           cmpInfo.$add({
             name:$scope.comapny.name,
             role:$scope.comapny.role,
             status:$scope.comapny.status,
             date:$filter('date')($scope.comapny.date,'shortDate')
           }).then(function(){
             $scope.message = "Company added to the list..";
             $scope.comapny.name = '';
             $scope.comapny.role = '';
             $scope.comapny.status = '';
             $scope.comapny.date = '';
           })
         };
         $scope.deleteCompany = function(key){
            cmpInfo.$remove(key);
         }

       }//authUser
    });//onAuthStateChanged

}])//controller
