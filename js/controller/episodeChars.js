define(['view/episodeChars'], function(listView){
    var internals = {};
    var externals = {};

    internals.reRoute = function(id){
        window.location.hash = 'display';
        sessionStorage.setItem("currentID", id);
    }

    externals.init = function() {
        listView.show(internals.reRoute)
    }

    return externals;
})