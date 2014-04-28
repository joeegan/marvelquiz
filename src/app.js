(function(){

   Mq.Client.getCharacters(function(response) {
      var names = [];
      var character, thumbnail, img;
      var results = response.data.results.filter(function(character) {
         names.push(character.name);
         return !character.thumbnail.path.match(/image_not_available$/);
      });
      $('.attribution').html(response.attributionHTML);

      Mq.Autocomplete('.typeahead', names);

      var randomSelection = getRandomInt(results.length);

      for (var i = 0; i < results.length; i++) {
         character = results[i];
         thumbnail = character.thumbnail;
         if (!thumbnail.path.match(/image_not_available$/) && i == randomSelection) {
            console.log(character.name);
            img = thumbnail.path + '/detail.' + thumbnail.extension;
            console.log(img);
            $('a').attr('href', character.urls[0].url);
            $('img').attr('src', img);
         }
      }

   });

   function getRandomInt(max) {
      return Math.floor(Math.random() * (max - 1)) + 0;
   }

})();