(function( $ ) {

  var Core = Core || {};

  Core = {


    init: function (){

    },

    api: {

      submit: function( ajax_url, ajax_data, callback ){

        var auth_token = '';
        if( Core.auth.isAuthenticated() ) {
          auth_token = Core.auth.authToken.get();
        }

        $.ajax({

          type: "GET",

          dataType: "jsonp",
          // test
          url: "http://192.168.1.65:3000/" + ajax_url,
          // live
          //url: "http://www.loadmax.com/" + ajax_url,
          cache: false,

          //data: ajax_data,
          data: 'auth_token='+ auth_token + '&' + ajax_data,
          success: function(data) {
              if (data.response.status === 200 && callback.onSuccess) {
                  callback.onSuccess.call(this, data.response.data);
              }
              else if (data.response.status >= 400 && callback.onError) {
                  callback.onError.call(this, data.response.data.error);
              }
              if (callback.onComplete) {
                  callback.onComplete.call(this, data.response.data);
              }
          }
        });

      }

    }

  };

  $( Core.init );

  window.Core = Core;

})(jQuery);
