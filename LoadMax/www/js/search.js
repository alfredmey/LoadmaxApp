(function( $ ) {

    var Core = window.Core || Core || {};

    Core.search = {

        init: function () {
            Core.auth.requireSession();
            Core.ui.showView();
            Core.search.bindEvents();
        },

        bindEvents: function () {
            $('#search').bind('submit', function () {
                Core.search.dosearch.onSubmit($(this));
                return false;
            });

            $('#search_submit').bind('click', function () {
                var form_obj = $(this).closest('form');
                Core.search.dosearch.onSubmit(form_obj);
                return false;
            });

        },

        dosearch: {
            onSubmit: function (form_obj) {
                var ajax_url = form_obj.attr('action'),
                    ajax_data = form_obj.serialize();
                Core.api.submit(ajax_url, ajax_data,
                    {
                        onSuccess: Core.search.dosearch.onSuccess,
                        onError: Core.search.dosearch.onError,
                        onComplete: Core.search.dosearch.onComplete
                    }
                );
            },

            onSuccess: function (data) {
                var results = JSON.stringify(data);
                localStorage.setItem("results", results);
                window.location = 'results.html';
            },

            onError: function (data) {
                $('#message').html('<b>'+data+'</b>');
            },

            onComplete: function (data) {
            }
        }

    };

    $( Core.search.init );

    window.Core = Core;

})(jQuery);