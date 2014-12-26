(function( $ ) {

    var Core = window.Core || Core || {};

    Core.login = {

        init: function () {
            Core.auth.requireNoSession();
            Core.ui.showView();
            Core.login.bindEvents();
        },

        bindEvents: function () {
            $('#login').bind('submit', function () {
                Core.login.authenticate.onSubmit($(this));
                return false;
            });

            $('#user_session_submit').bind('click', function () {
                var form_obj = $(this).closest('form');
                var e = 0;
                $.each($('#user_email, #user_password'), function (i, field) {
                    if ($(field).val().length == 0) {
                        $(field).css({ "border": '#FF0000 2px solid'});
                        ++e;
                    }
                    else {
                        $(field).css({ "border": '2px inset', "-webkit-appearance": 'textfield', "padding": '1px'});
                    }
                });
                if (e == 0) {
                    Core.login.authenticate.onSubmit(form_obj);
                }
                else {
                    $('#message').html('<b>Please Fill in Email & Password</b>');
                }

                return false;
            });

        },

        authenticate: {
            onSubmit: function (form_obj) {
                var ajax_url = form_obj.attr('action'),
                    ajax_data = form_obj.serialize();
                Core.api.submit(ajax_url, ajax_data,
                    {
                        onSuccess: Core.login.authenticate.onSuccess,
                        onError: Core.login.authenticate.onError,
                        onComplete: Core.login.authenticate.onComplete
                    }
                );
            },

            onSuccess: function (data) {
                Core.auth.authToken.set(data.access_token, 30);
                window.location = 'search.html';
            },

            onError: function (data) {
                $('#message').html('<b>'+data+'</b>');
            },

            onComplete: function (data) {
            }
        }

    };

    $( Core.login.init );

    window.Core = Core;

})(jQuery);