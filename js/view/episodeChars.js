define(function(){

    var externals = {};

    
    externals.reset = function(){
        window.location.hash = "episodes";
        window.location.reload();
    }

   
    externals.show = function(onClick){

        var position = sessionStorage.getItem("position");

        var url = sessionStorage.getItem("currentEpisodes");


    
        $('#myHeader').empty()
        .append('<h1 id="marvel">Rick and Morty App</h1>')
        .append('<form id="marvel">Search<input id="search" type="text"><button class="btn btn-danger" id="searchButton" onclick="searchFunction()" type= "button">Search</button></form>')
        .append($('<button id="beggining" class="btn btn-info">Back To the Episodes List</button>').click(function(){externals.reset()}))
        

        fetch(url)
        .then(function(responses){
            return responses.json();
        })
        .then(function(data){
           console.log(data);

           $('#app')
            .empty()
            
            for(let i = 0; i < data.results[position].characters.length; i++){


                fetch(data.results[position].characters[i])
                .then(function(theData){
                    return theData.json();
                })
                .then(function(thisData){
                    console.log(thisData);
                    $('#app')
                    .append('<p>Name : ' +  thisData.name)
                    .append('<p>Gender : ' +  thisData.gender)
                    .append('<p>Species : ' + thisData.species)
                    .append('<p>Status : ' + thisData.status)
                    .append('<p>Origin : ' + thisData.origin.name)
                    .append('<p>Location : ' + thisData.location.name)
                    .append($('<img src =' + thisData.image + '>').css('position', 'absolute').css('margin-left', '800px').css('margin-top', '-250px')
                    .click(function(){onClick(thisData.id)}))
                    .append($('<img src =' + thisData.image + '>').css('margin-right', '800px').css('margin-top', '-250px')
                    .click(function(){onClick(thisData.id)}))
                    .append('<hr>')
                })


               
            }
            
        })
       
    }

    return externals;
})