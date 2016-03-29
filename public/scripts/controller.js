'use strict';

angular.module('SnSApp')


       /* .controller('MediaPlayerController',
        function ($sce) {
            this.config = {
                preload: "none",
                sources: [
                    {src: $sce.trustAsResourceUrl("videos/1458733257481.mp4"), type: "video/mp4"}
                    /!*,
                    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
                    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}*!/
                ],
                tracks: [
                    {
                        src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
                        kind: "subtitles",
                        srclang: "en",
                        label: "English",
                        default: ""
                    }
                ],
                theme: {
                    url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
                }
            };
        })*/
/*.controller('LoginController',['$scope','cateFacotry',function($scope,cateFactory){
   $scope.loginUser = "Login"; $scope.logincheck=cateFactory.login($scope.email,$scope.password).success(function(data){
        if(data == "success")
            $scope.loginUser = $scope.email;
    })
}])*/
        .controller('CategoryController', ['$scope', 'cateFactory', function($scope, cateFactory){
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            
            $scope.show = false;
            $scope.message = "Loading ...";
            
           /* cateFactory.getVideos().query(
                function(response) {
                    $scope.videos = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error:"+response.status + " " + response.statusText;
                }
            );*/
            cateFactory.getVideos().success(function(data){
                $scope.videos = data.videos;
                $scope.showMenu = true;
                console.log(data);
            })
            
            
            $scope.select = function(setTab){
                $scope.tab = setTab;
                
                $scope.filtText = '';
                
                
            };
            
            $scope.isSelected = function(checkTab){
                return ($scope.tab ===checkTab);
            };
            
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
            
            

        }])


        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])



        .controller('FeedbackController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                   
                    $scope.invalidChannelSelection = false;

                    var feedback = feedbackFactory.getFeedback().get();
                    feedback.mychannel = $scope.feedback.mychannel;
                    feedback.firstName = $scope.feedback.firstName;
                    feedback.lastName = $scope.feedback.lastName;
                    feedback.agree = $scope.feedback.agree;
                    feedback.email = $scope.feedback.email;
                    feedback.$save();



                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])


        .controller('VideoDetailController', ['$scope', '$stateParams','cateFactory','$sce', function($scope, $stateParams, cateFactory,$sce) {

            
            $scope.showVideo = false;
            $scope.message = "Loading ...";
            
            /*$scope.video = cateFactory.getVideos().get({ id: parseInt($stateParams.id, 10) })
            .$promise.then(
                            function (response) {
                                $scope.video = response;
                                $scope.showVideo = true;
                            },
                            function (response) {
                                $scope.message = "Error: " + response.status + " " + response.statusText;
                            }
            );*/
            var that = this;
            cateFactory.getVideoById($stateParams.id).success(function(data){
                $scope.video = data.video;
                 that.config = {
                preload: "none",
                sources: [
                    {src: $sce.trustAsResourceUrl("videos/"+data.video.file), type: "video/mp4"}
                    /*,
                    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
                    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}*/
                ],
                tracks: [
                    {
                        src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
                        kind: "subtitles",
                        srclang: "en",
                        label: "English",
                        default: ""
                    }
                ],
                theme: {
                    url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
                }
            };
                $scope.isLogin=false;
                cateFactory.getUserSession().success(function (data) {
                    if(data){
                        $scope.isLogin=true;
                    }
                });
                  $scope.comment = {rating:5, comment:"", author:"", date:""};
            $scope.submitComment = function () {

                $scope.comment.date = new Date().toISOString();
                console.log($scope.comment);

                $scope.video.comments.push($scope.comment);
                //cateFactory.getVideos().update({ id: $scope.video.id }, $scope.video);
                console.log("comment:"+$scope.comment);
                cateFactory.addComment($stateParams.id,$scope.comment.rating,$scope.comment.comment,$scope.comment.author).success(function(data){})

                $scope.commentForm.$setPristine();

                $scope.comment = { rating: 5, comment: "", author: "", date: "" };
            };
        })}])


        
/*    .controller('VideoCommentController', ['$scope', 'cateFactory', function ($scope, cateFactory) {
            

            $scope.comment = {rating:5, comment:"", author:"", date:""};
            $scope.submitComment = function () {

                $scope.comment.date = new Date().toISOString();
                console.log($scope.comment);

                $scope.video.comments.push($scope.comment);
                //cateFactory.getVideos().update({ id: $scope.video.id }, $scope.video);
                cateFactory.addComment("56efc5988c063f2bcc7eaa7b",$scope.comment.rating,$scope.comment.comment,$scope.comment.author).success(function(data){})
                $scope.commentForm.$setPristine();

                $scope.comment = { rating: 5, comment: "", author: "", date: "" };
            };
        }])*/
    .controller('SubmitController',['$scope','cateFactory', function ($scope,cateFactory) {
        $scope.isLogin=false;
        cateFactory.getUserSession().success(function (data) {
            if(data){
                $scope.isLogin=true;
            }
        });
    }])
;