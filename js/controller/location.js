define(['view/location'], function(displayView){
    var internals = {};
    var externals = {};

    internals.reRoute = function(id){
        window.location.hash = 'display';
        sessionStorage.setItem("currentID", id);
    }

    externals.init = function() {
        displayView.show(internals.reRoute)
    }

    return externals;
})