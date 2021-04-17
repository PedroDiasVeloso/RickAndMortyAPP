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
                sessionStorage.setItem("nextPage", "https://rickandmortyapi.com/api/character?page=1");
            }
            else{
                sessionStorage.setItem("nextPage", newLink);
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
                sessionStorage.setItem("nextPage", "https://rickandmortyapi.com/api/character?page=1");
            }
            else{
                sessionStorage.setItem("nextPage", newLink);
                window.location.reload();}
            
        }))
    }

    externals.reset = function(){
        sessionStorage.setItem("nextPage", "https://rickandmortyapi.com/api/character?page=1");
        window.location.reload();
    }

    externals.episodes = function(){
        window.location.hash = "episodes"
        window.location.reload();
    }

   
    externals.show = function(onClick){

        

        var url = "https://rickandmortyapi.com/api/character?page=1";

        var newUrl = sessionStorage.getItem("nextPage");

        if(newUrl != null && newUrl != url){
            url = newUrl;
        }
       
    
        $('#myHeader').empty()
        .append('<h1 id="marvel">Rick and Morty App</h1>')
        .append('<form id="marvel">Search<input id="search" type="text"><button class="btn btn-danger" id="searchButton" onclick="searchFunction()" type= "button">Search</button></form>')
        .append($('<button id="next" class="btn btn-info">Next Page</button>').css('position','relative').css('margin-right','10px')
        .click(function(){externals.nextPage(url)}))
        .append($('<button id="next" class="btn btn-info">Previous Page</button>').css('position','relative').css('margin-right','10px')
        .click(function(){externals.previousPage(url)}))
        .append($('<button id="beggining" class="btn btn-info">Back To the Beggining</button>').css('position','relative').css('margin-right','10px')
        .click(function(){externals.reset()}))
        .append($('<button id="beggining" class="btn btn-info">List of Episodes</button>').click(function(){externals.episodes()}))
        .append($('<p>Click the images for more information!</p>').css('position', 'relative').css('margin-top', '-20px').css('font-size','20px'))

        fetch(url)
        .then(function(responses){
            return responses.json();
        })
        .then(function(data){

            $('#app')
            .empty()

            for(let i = 0; i < data.results.length; i++){

                $('#app')
                .append($('<img src =' + data.results[i].image + '>').click(function(){onClick(data.results[i].id)}))

            }

        })
       
    }

    return externals;
})


function searchFunction(){


    newLink = "https://rickandmortyapi.com/api/character/?name=" + $("#search").val() ;

    sessionStorage.setItem("nextPage", newLink);
    window.location.reload();
}



/*$('#app')
.empty()
.append($('<img src =' + data.results[0].image + '>').click(function(){onClick(data.results[0].id)}))
.append($('<img src =' + data.results[1].image + '>').click(function(){onClick(data.results[1].id)}))
.append($('<img src =' + data.results[2].image + '>').click(function(){onClick(data.results[2].id)}))
.append($('<img src =' + data.results[3].image + '>').click(function(){onClick(data.results[3].id)}))
.append($('<img src =' + data.results[4].image + '>').click(function(){onClick(data.results[4].id)}))
.append($('<img src =' + data.results[5].image + '>').click(function(){onClick(data.results[5].id)}))
.append($('<img src =' + data.results[6].image + '>').click(function(){onClick(data.results[6].id)}))
.append($('<img src =' + data.results[7].image + '>').click(function(){onClick(data.results[7].id)}))
.append($('<img src =' + data.results[8].image + '>').click(function(){onClick(data.results[8].id)}))
.append($('<img src =' + data.results[9].image + '>').click(function(){onClick(data.results[9].id)}))
.append($('<img src =' + data.results[10].image + '>').click(function(){onClick(data.results[10].id)}))
.append($('<img src =' + data.results[11].image + '>').click(function(){onClick(data.results[11].id)}))
.append($('<img src =' + data.results[12].image + '>').click(function(){onClick(data.results[12].id)}))
.append($('<img src =' + data.results[13].image + '>').click(function(){onClick(data.results[13].id)}))
.append($('<img src =' + data.results[14].image + '>').click(function(){onClick(data.results[14].id)}))
.append($('<img src =' + data.results[15].image + '>').click(function(){onClick(data.results[15].id)}))
.append($('<img src =' + data.results[16].image + '>').click(function(){onClick(data.results[16].id)}))
.append($('<img src =' + data.results[17].image + '>').click(function(){onClick(data.results[17].id)}))
.append($('<img src =' + data.results[18].image + '>').click(function(){onClick(data.results[18].id)}))
.append($('<img src =' + data.results[19].image + '>').click(function(){onClick(data.results[19].id)}))*/