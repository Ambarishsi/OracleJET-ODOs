/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your application specific code will go here
 */
define(['knockout', 'ojs/ojmodule-element-utils', 'ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils', 'ojs/ojcorerouter', 'ojs/ojmodulerouter-adapter', 'ojs/ojknockoutrouteradapter', 'ojs/ojurlparamadapter', 'ojs/ojarraydataprovider', 'ojs/ojknockouttemplateutils', 'ojs/ojmodule-element', 'ojs/ojknockout'],
  function(ko, moduleUtils, ResponsiveUtils, ResponsiveKnockoutUtils, CoreRouter, ModuleRouterAdapter, KnockoutRouterAdapter, UrlParamAdapter, ArrayDataProvider, KnockoutTemplateUtils) {
     function ControllerViewModel() {
        this.KnockoutTemplateUtils = KnockoutTemplateUtils;
        // Handle announcements sent when pages change, for Accessibility.
        this.manner = ko.observable('polite');
        this.message = ko.observable();
        announcementHandler = (event) => {
          this.message(event.detail.message);
          this.manner(event.detail.manner);
      };
      document.getElementById('globalBody').addEventListener('announce', announcementHandler, false);
      // Media queries for repsonsive layouts
      const smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      let navData = [
        { path: '', redirect: 'dashboard' },
        { path: 'dashboard', detail: { label: 'Create Notes', iconClass: 'oj-ux-ico-create-options' } },
        
      ];
      // Router setup
      let router = new CoreRouter(navData, {
        urlAdapter: new UrlParamAdapter()
      });
      router.sync();
      this.moduleAdapter = new ModuleRouterAdapter(router);
      this.selection = new KnockoutRouterAdapter(router);
      // Setup the navDataProvider with the routes, excluding the first redirected
      // route.
      this.navDataProvider = new ArrayDataProvider(navData.slice(1), {keyAttributes: "path"});
      // Header
      // Application Name used in Branding Area
      this.appName = ko.observable("TODOs");
  
  
     
     }
     return new ControllerViewModel();
  }
);