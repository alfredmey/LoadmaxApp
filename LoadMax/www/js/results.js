function formatDate(dateObject) //pass date object
{
    var date = new Date(dateObject);
    var month = parseInt(date.getMonth());
    if (dateObject === null){
        return "Unknown Date"
    } else
    {
        return (month + 1) + "-" + date.getDate() + "-" + date.getFullYear();
    }


  }

(function( $ ) {

    var Core = window.Core || Core || {};
    var data = localStorage.getItem("results");


    Core.results = {

        init: function () {
            Core.auth.requireSession();
            Core.ui.showView();
            Core.results.bindEvents();
        },

        bindEvents: function () {
            //$('.load').bind('click', function () {
            //    Core.results.dosearch.onClick($(this));
            //    return false;
            //});

            $(window).ready(function () {
                Core.results.events.onLoad(data);
                return false;
            });

        },

        events: {
            //onClick: function (data) {
            //
            //},
            onLoad: function (data) {
                data1 = JSON.parse(data);
                $.each(data1.results, function(index){
                   $('#hotloads').append("<table class=\"hotload\" id=\"" + data1.results[index].id + "\" width=\"100%\" cellpadding=\"2\"><tr><th align=\"right\" width=\"30%\" ><b>Load ID: </b></td><th align=\"left\"><b> " + data1.results[index].id +  "</b></td></tr><tr><td align=\"right\"><b>Load Date: </b></td><td align=\"left\"><b> " + formatDate(data1.results[index].pickup) +  "</b></td></tr><tr><td align=\"right\"><b>Pickup: </b></td><td align=\"left\"><b> " + data1.results[index].origin_cs +  "</b></td></tr><tr><td align=\"right\"><b>Destination: </b></td><td align=\"left\"><b> " + data1.results[index].dest_cs +  "</b></td></tr><tr><td align=\"right\"><b>Equipment: </b></td><td align=\"left\"><b>" + data1.results[index].equipment_name +  "</b></td></tr><tr><td align=\"right\"><b>Approx. <br>Dead Head: </b></td><td align=\"left\"><b> " + data1.results[index].id +  "</b></td></tr></table><br>")
                });
            }
        }

    };

    $( Core.results.init );

    window.Core = Core;

})(jQuery);