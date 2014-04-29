(function(){

   var URL_BASE = 'http://gateway.marvel.com';
   var PUBLIC_API_KEY = '861f268aa00e35b608081aae0bef2364';

   function RestClient(){
   }

   RestClient._send = function(url, callback, limit){
      var params = $.param({ apikey:  PUBLIC_API_KEY, limit: limit || 100 });
      $.get(URL_BASE + url + '?' + params, callback.bind(this));
   };

   RestClient.getCharactersWithImages = function(callback) {
      if (RestClient.charactersWithImages) {
         callback(RestClient.charactersWithImages);
      } else {
         var names = [];
         RestClient._send(Mq.Urls.CHARACTER, function(response){
            var processedData = response.data.results.filter(function(character) {
               names.push(character.name);
               return !character.thumbnail.path.match(/image_not_available$/);
            });
            processedData.names = names;
            processedData.attributionHTML = response.attributionHTML;
            RestClient.charactersWithImages = processedData;
            callback(processedData);
         });
      }
   };

   RestClient.charactersWithImages = null;

   RestClient.getWallpapers = function(callback, limit) {

      RestClient.getCharactersWithImages(function(data, limit){
         var wallpapers = [],
            url, imageData;
         for(var i = 0; i < data.length; i++) {
            imageData = data[i].thumbnail;
            url = imageData.path + '/standard_medium.' + imageData.extension;
            wallpapers.push(url);
         }
         RestClient.wallpapers = wallpapers;
         callback(wallpapers);
      });

   };


   Mq.Client = RestClient;

})();
