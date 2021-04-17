define(function(){

    var externals = {};

    externals.next = function(id){
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

    externals.show = function(onClick){

        

        let url = sessionStorage.getItem("locationPage");

      
        $('#myHeader').empty()
        .append('<h1 id="marvel">Rick and Morty App</h1>')
        .append($('<button class="btn btn-info" id="beggining">Back To the Beggining</button>')
        .click(externals.reset))


  
        fetch(url)
        .then(function(responses){
            return responses.json();
        })
        .then(function(data){
            console.log(data);
            $('#app')
            .empty()
            .append('<p>Name : ' +  data.name)
            .append('<p>Type : ' +  data.type)
            .append('<p>Dimension : ' + data.dimension)
            .append('<p>Residents of the planet : </p>')
            .append('<hr>')

            return data;
        })
        .then(function(thisData){
            for(i = 0; i < thisData.residents.length; i++){
                fetch(thisData.residents[i])
                .then(function(otherResponses){
                    return otherResponses.json();
                })
                .then(function(otherData){
                    console.log(otherData);
                    $('#app')
                    .append('<p>Name : ' +  otherData.name)
                    .append('<p>Gender : ' +  otherData.gender)
                    .append('<p>Species : ' + otherData.species)
                    .append('<p>Status : ' + otherData.status)
                    .append('<p>Origin : ' + otherData.origin.name)
                    .append('<p>Location : ' + otherData.location.name)
                    .append($('<img src =' + otherData.image + '>').css('position', 'absolute').css('margin-left', '800px').css('margin-top', '-280px')
                    .click(function(){onClick(otherData.id)}))
                    .append($('<img src =' + otherData.image + '>').css('margin-right', '800px').css('margin-top', '-300px')
                    .click(function(){onClick(otherData.id)}))
                    .append('<hr>')
                })
            }
        })
        



    }


    return externals;
})