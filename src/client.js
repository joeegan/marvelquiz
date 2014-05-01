(function(){

   var URL_BASE = 'http://gateway.marvel.com';
   var PUBLIC_API_KEY = '861f268aa00e35b608081aae0bef2364';

   function RestClient(){
   }

   RestClient._send = function(url, data){
      var params = $.param(_.extend({ apikey:  PUBLIC_API_KEY, limit: 100 }, data));
      return $.get(URL_BASE + url + '?' + params);
   };

   RestClient.getCharactersWithImages = function(data, callback) {
      var names = [];
      RestClient._send(Mq.Urls.CHARACTER, data).then(function(response){
         var processedData = response.data.results.filter(function(character) {
            names.push(character.name);
            return !character.thumbnail.path.match(/image_not_available$/);
         });
         processedData.names = names;
         processedData.attributionHTML = response.attributionHTML;
         RestClient.charactersWithImages = processedData;
         callback(processedData);
      });
   };

   RestClient.charactersWithImages = null;

   RestClient.getWallpapers = function(data, callback) {

      RestClient.getCharactersWithImages(data, function(characters){
         var wallpapers = [],
            url, imageData;
         for(var i = 0; i < characters.length; i++) {
            imageData = characters[i].thumbnail;
            url = imageData.path + '/standard_medium.' + imageData.extension;
            wallpapers.push(url);
         }
         RestClient.wallpapers = wallpapers;
         callback(wallpapers);
      });

   };


   Mq.Client = RestClient;

})();
