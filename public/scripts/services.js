'use strict';

angular.module('SnSApp')
        .constant("baseURL","http://localhost:3000/")

    .service('cateFactory', ['$http', 'baseURL', function($http,baseURL) {
    
    
        this.getVideoById = function(videoId){
            return $http.get(baseURL+'videos/getVideoById?videoId='+videoId);
        };
        this.getVideos = function(){
            return $http.get(baseURL+'videos/getVideos');
        }

        this.addComment = function(videoId,rate,comment,author){
            return $http.post(baseURL+'videos/addComment',{videoId:videoId,
            rate:rate,comment:comment,author:author})};
        
       /* this.login = function(email,password){
            return $http.post(baseURL + "/register",{email:email,password:password})
        }*/
        this.getUserSession = function(){
            return $http.get(baseURL +'getUserSession');
        }
        
    }])



;