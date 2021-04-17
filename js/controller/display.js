define(['view/display'], function(displayView){
    var internals = {};
    var externals = {};

    internals.reRoute = function(){
        window.location.hash = 'list';
    }

    externals.init = function() {
        displayView.show(internals.reRoute)
    }

    return externals;
})