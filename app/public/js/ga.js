(function(){

  var getCookie = function(objname) {
      var arrstr = document.cookie.split("; ");
      for (var i = 0; i < arrstr.length; i++) {
          var temp = arrstr[i].split("=");
          if (temp[0] == objname) {
              return unescape(temp[1]);
          }
      }
      return "";
  };

  (function(para) {
    var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script',x = null,y = null;
    w['sensorsDataAnalytic201505'] = n;
    w[n] = w[n] || function(a) {return function() {(w[n]._q = w[n]._q || []).push([a, arguments]);}};
    var ifs = ['track','quick','register','registerPage','registerOnce','trackSignup', 'trackAbtest', 'setProfile','setOnceProfile','appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify','login','logout','trackLink','clearAllRegister','getAppStatus'];
    for (var i = 0; i < ifs.length; i++) {
      w[n][ifs[i]] = w[n].call(null, ifs[i]);
    }
    if (!w[n]._t) {
      x = d.createElement(s), y = d.getElementsByTagName(s)[0];
      x.async = 1;
      x.src = p;
      x.setAttribute('charset','UTF-8');
      y.parentNode.insertBefore(x, y);
      w[n].para = para;
    }
  })({
    sdk_url: '//static.sensorsdata.cn/sdk/1.9.3/sensorsdata.min.js',
    heatmap_url: '//static.sensorsdata.cn/sdk/1.9.3/heatmap.min.js',
    name: 'sa',
    server_url: 'https://wandaio.ffan.com/sa?project=cld_portal_t',
    heatmap: {
      //设置成 true 后，我们会自动给 a 标签绑定一个 sa.trackLink() 方法（详见本页 3.3 ）。
      //如果是单页面 a 标签不涉及页面跳转或者 a 标签的点击是下载功能，建议不要打开。默认 false 。
      isTrackLink: false,
      //设置多少毫秒后开始渲染点击图,因为刚打开页面时候页面又些元素还没加载
      loadTimeout:  3000,
      //返回真会采集当前页面的数据，返回假表示不采集当前页面,设置这个函数后，内容为空的话，是返回假的。不设置函数默认是采集所有页面
      collect_url: function(){
          return true;
      },
      //用户点击（a，button，input）这些元素时会触发这个函数，让你来判断是否要采集当前这个元素，返回真表示采集，返回假表示不采集。
      //不设置这个函数，默认是采集 a button input 这些标签。
      collect_element: function(element_target){
          // 如果这个元素有属性sensors-disable=true时候，不采集
          if(element_target.getAttribute('disable') === 'true'){
              return false;
          }else{
              return true;
          }
      },
      //考虑到用户隐私，这里可以设置input里的内容是否采集
      //如果返回真，表示采集input内容，返回假表示不采集input内容,默认不采集    
      collect_input:function(element_target){
         return true;
      }    
  }
  });
  var uid = getCookie('sensor-uid');

  if(uid) sa.login(uid);

  sa.quick('autoTrack');
  sa.track('index_visit', {
    pageUrl: location.href,  
    referrerUrl: document.referrer
  });

  var saStartTime = new Date(); 
  window.onbeforeunload = function() {  
  var end = new Date();
  var duration = (end.getTime() - saStartTime.getTime()) / 1000;
  sa.track('index_leave', {
    pageUrl: location.href,
    pageStayTime: duration
  });
  };

  if(document.querySelector){
       var logoutButton = document.querySelector('[sensor-name="wandacloud-logout"]');
       if(logoutButton){
          logoutButton.addEventListener("click",function(){
              sa.logout(true);
          });
       }
  }

})();