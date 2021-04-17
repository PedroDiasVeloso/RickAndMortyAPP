define(['view/episodes'], function(listView){
    var internals = {};
    var externals = {};

    internals.reRoute = function(){
        window.location.hash = 'list';
    }

    externals.init = function() {
        listView.show(internals.reRoute)
    }

    return externals;
})