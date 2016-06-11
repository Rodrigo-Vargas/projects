"use strict";angular.module("webAppApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.utils.masks"]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/signup",{templateUrl:"views/signup.html",controller:"SignupCtrl",controllerAs:"signup"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl",controllerAs:"login"}).when("/dashboard",{templateUrl:"views/dashboard.html",controller:"DashboardCtrl",controllerAs:"dashboard"}).otherwise({redirectTo:"/"}),b.html5Mode(!0)}]),angular.module("webAppApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("webAppApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("webAppApp").controller("SignupCtrl",["$scope","$location",function(a,b){a.sendForm=function(){var a=!0;a?b.path("/dashboard"):$("#invalid-login").show()}}]),angular.module("webAppApp").controller("DashboardCtrl",["$scope","$http","UserService","$location",function(a,b,c,d){a.customers=[],a.workdDays=[];var e=c.getToken();if(""==e)return void d.path("/login");var f={Authorization:e,Accept:"application/json;odata=verbose"};a.loadCustomers=function(){b({method:"GET",url:"/api/customers/getByUser",data:a.formData,headers:f}).then(function(b){a.customers=b.data.customers,a.taskCustomer=a.customers[0]})},a.loadTasks=function(){b({method:"GET",url:"/api/tasks/getByUser",data:a.formData,headers:f}).then(function(b){1==b.data.success&&(a.workDays=b.data.agenda)})},a.loadCustomers(),a.loadTasks(),a.taskStart="00:00",a.taskEnd="00:00",a.addCustomer=function(){a.customers.push("To Do")},a.addTask=function(){a.taskSubmitted=!0,a.taskForm.$valid&&b({method:"POST",url:"/api/tasks/add",data:a.newTask,headers:f}).then(function(b){1==b.data.success&&(a.tasks=b.data.tasks,a.newTask.description="",a.newTask.start="00:00",a.newTask.end="00:00",a.taskCustomer=a.customers[0])})}}]),angular.module("webAppApp").controller("LoginCtrl",["$scope","$http","$location","UserService",function(a,b,c,d){a.loginMessage="",a.sendForm=function(){$("#invalid-login").hide(),b({method:"POST",url:"/api/login",data:a.formData}).then(function(b){if(1==b.data.success){d.setToken(b.data.token);c.path("/dashboard")}else a.loginMessage=b.data.message,$("#invalid-login").show()},function(a){})}}]),angular.module("webAppApp").factory("UserService",function(){var a="";return{getToken:function(){return a},setToken:function(b){a=b}}}),angular.module("webAppApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/dashboard.html",'<div class="row"> <div class="col-xs-3"> <div id="sidebar"> <div class="clearfix"> <h3 id="sidebar-title" class="pull-left">Customers</h3> <a href="/customer/add" id="add-customer-btn" class="pull-right"> <i class="fa fa-plus"></i> </a> </div> <ul id="customer-list" ng-repeat="customer in customers"> <li><a href="/customer/{{customer}}">{{customer.name}}</a></li> </ul> </div> </div> <div class="col-xs-9"> <div id="dashboard"> <h2 id="selected-board">Dashboard</h2> <form name="taskForm" ng-submit="addTask()" novalidate> <div class="row"> <div class="col-xs-6" ng-class="{ \'has-error\' : taskForm.description.$invalid && taskSubmitted }"> <input id="task-description" name="description" class="form-control" placeholder="What are you working on?" ng-model="newTask.description" ng-required="true"> <p ng-show="taskForm.description.$invalid && taskSubmitted" class="help-block">Required field</p> </div> <div class="col-xs-2" ng-class="{ \'has-error\' : taskForm.customer.$invalid && taskSubmitted }"> <select ng-model="newTask.customer" ng-options="customer as customer.name for customer in customers" class="form-control" ng-required="true" name="customer"> </select> <p ng-show="taskForm.customer.$invalid && taskSubmitted" class="help-block">Required field</p> </div> <div class="col-xs-1" ng-class="{ \'has-error\' : taskForm.start.$invalid && taskSubmitted }"> <input id="task-start" class="form-control" ng-model="newTask.start" ui-time-mask="short" ng-required="true" name="start"> <p ng-show="taskForm.start.$invalid && taskSubmitted" class="help-block">Required field</p> </div> <div class="col-xs-1" ng-class="{ \'has-error\' : taskForm.end.$invalid && taskSubmitted }"> <input id="task-conclusion" class="form-control" ng-model="newTask.conclusion" ui-time-mask="short" ng-required="true" name="conclusion"> <p ng-show="taskForm.conclusion.$invalid && taskSubmitted" class="help-block">Required field</p> </div> <div class="col-xs-2"> <a class="btn btn-green" ng-click="addTask()">Add</a> </div> </div> </form> <div id="task-list"> <div class="task-group" ng-repeat="workDay in workDays"> <div id="task-list-header"> <h3>{{ workDay.date}}</h3> <span>{{ workDay.workTime }}</span> </div> <div id="task-list-body"> <div class="gutter-0 row task-row" ng-repeat="task in workDay.tasks"> <div class="col-xs-1"> <input type="checkbox" class="checkbox"> </div> <div class="col-xs-2"> <span>{{ task.description }}</span> </div> <div class="col-xs-2"> <span class="customer-tag">{{ task.customer.name }}</span> </div> <div class="col-xs-2"> <span>{{ task.duration }}</span> </div> <div class="col-xs-2"> <span>{{ task.start }}</span> - <span>{{ task.conclusion }}</span> </div> </div> </div> </div> </div> </div> </div> </div>'),a.put("views/login.html",'<div class="container"> <div class="small-form-box"> <div id="invalid-login" style="display: none"> <span class="alert" ng-bind="loginMessage"></span> </div> <div class="form-group"> <label>Login</label> <input type="text" name="login" class="form-control" ng-model="formData.email"> </div> <div class="form-group"> <label>Password</label> <input type="password" name="password" class="form-control" ng-model="formData.password"> </div> <a ng-click="sendForm()" class="btn btn-primary">Login</a> </div> </div>'),a.put("views/main.html",'<div class="img-background"> <div class="marketing-text"> <h1 class="home-title">Project Management</h1> <h2 class="home-title">Track your team for better results</h2> <div class="btn-container"> <a class="home-btn" href="/signup">Signup</a> or <a class="home-btn" href="/login">Login</a> </div> </div> </div>'),a.put("views/signup.html",'<div class="container"> <div id="invalid-login" style="display: none"> <span class="alert">Invalid login</span> </div> <div class="form-group"> <label>Login</label> <input type="text" name="login" class="form-control"> </div> <div class="form-group"> <label>Password</label> <input type="password" name="password" class="form-control"> </div> <a ng-click="sendForm()" class="btn btn-primary">Login</a>  </div>')}]);