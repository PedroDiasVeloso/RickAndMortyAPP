define(function(){

    var externals = {};

    externals.next = function(id){
        if(id<1){
            id = 1;
        }
        else if(id>671){
            id = 671
        }
        console.log(id)
        sessionStorage.setItem("currentID", id);
        window.location.hash = 'display';
        window.location.reload();
    }


    externals.reset = function(){
        window.location.hash = 'list';
        sessionStorage.setItem("nextPage", "https://rickandmortyapi.com/api/character?page=1");
        window.location.reload();
    }

    externals.location = function(url){
        window.location.hash = 'location'
        sessionStorage.setItem("locationPage", url);
        window.location.reload();
    }

    externals.show = function(onClick){

        

        var id = sessionStorage.getItem("currentID");

      
        $('#myHeader').empty()
        .append('<h1 id="marvel">Rick and Morty App</h1>')
        .append($('<button class="btn btn-info" id="previous">Previous</button>').css('position','relative').css('margin-right','10px')
        .click(function(){externals.next(+(id)-1)}))
        .append($('<button class="btn btn-info" id="back">Back to Characters List</button>').css('position','relative').css('margin-right','10px')
        .click(onClick))
        .append($('<button class="btn btn-info" id="next">Next</button>').css('position','relative').css('margin-right','10px')
        .click(function(){externals.next(+(id)+1)}))
        .append($('<button class="btn btn-info" id="beggining">Back To the Beggining</button>').click(externals.reset))

        fetch("https://rickandmortyapi.com/api/character/" + id)
        .then(function(responses){
            return responses.json();
        })
        .then(function(data){
            console.log(data);
            $('#app')
            .empty()
            .append('<p>Name : ' +  data.name)
            .append('<p>Gender : ' +  data.gender)
            .append('<p>Species : ' + data.species)
            .append('<p>Status : ' + data.status)
            .append('<p>Origin : ' + data.origin.name)
            .append('<p>Location : ' + data.location.name)
            .append($('<img src =' + data.image + '>').css('position', 'absolute').css('margin-left', '350px').css('margin-top', '-250px'))
            .append($('<img src =' + data.image + '>').css('position', 'absolute').css('margin-left', '-650px').css('margin-top', '-250px'))
            .append($('<img src ="https://i.ytimg.com/vi/FWpiEk-i8M8/maxresdefault.jpg" >').css('position', 'absolute')
            .css('margin-left', '-120px').css('margin-top', '0px').css('height', '15%').css('width', '15%')
            .click(function(){externals.location(data.location.url)}))
            .append($('<p>Click the portal to check this location!</p>').css('position','relative').css('margin-top','150px'))
            
            
        })
        



    }


    return externals;
})

//.append($('<img src =' + data.image + '>').css('margin-left', '500px').css('margin-top', '-100px'))