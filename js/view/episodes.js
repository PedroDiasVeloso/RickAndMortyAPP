define(function(){

    var externals = {};

    externals.nextPage = function(link){
        Promise.all(fetch(link)
        .then(function(responses){
            console.log(responses)
            return responses.json();
        })
        .then(function(data){
            var newLink = data.info.next;
            if(newLink == null){
                sessionStorage.setItem("nextEpisodes", "https://rickandmortyapi.com/api/episode?page=1");
            }
            else{
                sessionStorage.setItem("nextEpisodes", newLink);
                window.location.reload();}
            
        }))
    }

    externals.previousPage = function(link){
        Promise.all(fetch(link)
        .then(function(responses){
            console.log(responses)
            return responses.json();
        })
        .then(function(data){
            var newLink = data.info.prev;

            if(newLink == null){
                sessionStorage.setItem("nextEpisodes", "https://rickandmortyapi.com/api/episode?page=1");
            }
            else{
                sessionStorage.setItem("nextEpisodes", newLink);
                window.location.reload();}
            
        }))
    }

  
    externals.reset = function(){
        sessionStorage.setItem("nextPage", "https://rickandmortyapi.com/api/character?page=1");
        sessionStorage.setItem("nextEpisodes","https://rickandmortyapi.com/api/episode?page=1");
        window.location.hash = "list";
        window.location.reload();
    }

    externals.charsForEpisode = function(position){
        sessionStorage.setItem("position", position);
        window.location.hash = "#episodeChars";
        window.location.reload();
    }

   
    externals.show = function(onClick){

        

        var url = "https://rickandmortyapi.com/api/episode?page=1";

        var newUrl = sessionStorage.getItem("nextEpisodes");

        if(newUrl != null && newUrl != url){
            url = newUrl;
        }

        sessionStorage.setItem("currentEpisodes", url);
       
    
        $('#myHeader').empty()
        .append('<h1 id="marvel">Rick and Morty App</h1>')
        .append($('<button id="next" class="btn btn-info">Next Page</button>').css('position','relative').css('margin-right','10px')
        .click(function(){externals.nextPage(url)}))
        .append($('<button id="next" class="btn btn-info">Previous Page</button>').css('position','relative').css('margin-right','10px')
        .click(function(){externals.previousPage(url)}))
        .append($('<button id="beggining" class="btn btn-info">Back To the Beggining</button>').click(function(){externals.reset()}))
       

        fetch(url)
        .then(function(responses){
            return responses.json();
        })
        .then(function(data){
           console.log(data);

           $('#app')
            .empty()
            
            $('#theTable')
            .append($('<table class="table table-sm table-dark"><tr><th>Name</th><th>AirDate</th><th>Characters in Episode</th></tr>'))

            for(let i = 0; i < data.results.length; i++){

                $('#theTable')
                .append($('<tr><td>' + data.results[i].name + '</td><td>' + data.results[i].air_date + '</td>')
                .append('<td><button>Click here for the characters</button></td></tr>').click(function(){externals.charsForEpisode(i)}))
                
            }
            
        })
       
    }

    return externals;
})