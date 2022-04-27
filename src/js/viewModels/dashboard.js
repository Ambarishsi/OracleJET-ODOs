/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define([
  'knockout',
  "exports",
  'accUtils',
  "ojs/ojasyncvalidator-length",
  "ojs/ojarraydataprovider",
  'ojs/ojinputtext',
  "ojs/ojinputnumber",
  "ojs/ojformlayout",
  'ojs/ojlistview',
  'ojs/ojlistitemlayout',
  'ojs/ojcheckboxset'
],
 function(ko,exports,accUtils,AsyncLengthValidator,ArrayDataProvider) {
    function DashboardViewModel() {
      //initializing variables
      this.todoInputValue = ko.observable(null);
      this.todosArray = ko.observableArray([]);
      this.isCompleted = ko.observableArray([]);
      //validatord
      this.taskValidators = ko.observableArray  ([
        new AsyncLengthValidator(
          {
            min:5,
            max: 150,
            hint: {
              inRange: "must have atleast {min} and utmost {max} characters"
            },
            messageSummary: {
              tooLong: "to many characters",
              tooShort: "please ener atleast {min} characters"
            },
            messageDetails: {
              tooLong: "Details: to many characters",
              tooShort: "Detail: please ener atleast {min} characters"
            }
          }
          ),
      ]);
      //functions
       this.submitInput = () => {
        this.isCompleted = [null];
       this.todosArray.push(
        {
          names:new Date(),
          title:this.todoInputValue,
          isCompleted: null
        });
        this.todoInputValue = ko.observable(null);
     
      }
      // remove item from the observable array
      this.removeUser = (event, current, bindingContext) => {
        this.todosArray.remove(current.data);
      };
      // test if checkbox is checked
      this.testChecked = (event,current) => {
        if(event.target.checked == true){
          this.isCompleted = ["completed"];
          const tempObj = {
            names:current.data.names,
            title:current.data.title,
            isCompleted:'completed'
          }
          this.todosArray.replace(current.data, tempObj)
        }else{
          this.isCompleted = [null];
          const tempObj = {
            names:current.data.names,
            title:current.data.title,
            isCompleted: null
          }
          this.todosArray.replace(current.data, tempObj)
        }
      };
      this.dataProvider = new ArrayDataProvider(this.todosArray, {
        keyAttributes: "names",
    });
      this.disableControls = ko.computed(() => {
        if(this.todoInputValue() ===null || this.todoInputValue().trim() === ''){
          return true;
        }else{
          return false;
        }
      }, this);
      this.connected = () => {
        accUtils.announce('Dashboard page loaded.');
        document.title = "Dashboard";
        
        // Implement further logic if needed
      };
      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      this.disconnected = () => {
          log('destroy');
        // Implement if needed
      };
      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      this.transitionCompleted = () => {
        // Implement if needed
      };
    }
    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return DashboardViewModel;
  }
);