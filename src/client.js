(function(){

   var URL_BASE = 'http://gateway.marvel.com';
   var PUBLIC_API_KEY = '861f268aa00e35b608081aae0bef2364';

   function RestClient(){
   }

   RestClient._send = function(url, callback, limit){
      var params = $.param({ apikey:  PUBLIC_API_KEY, limit: limit || 100 });
      $.get(URL_BASE + url + '?' + params, callback.bind(this));
   };

   RestClient.getCharactersWithImages = function(callback, limit) {
      var names = [];
      RestClient._send(Mq.Urls.CHARACTER, function(response){
         var processedData = response.data.results.filter(function(character) {
            names.push(character.name);
            return !character.thumbnail.path.match(/image_not_available$/);
         });
         processedData.names = names;
         callback(processedData);
      }, limit);

   };

   RestClient.getComicsWithImages = function(callback) {
      var processedData;
      RestClient._send(Mq.Urls.COMICS, function(response){
         processedData = response.data.results.filter(function(comic) {
            return comic.images.length;
         });
         callback(processedData);
      });
   };

   RestClient.getWallpapers = function(callback, limit) {
      RestClient.getCharactersWithImages(function(comicsData, limit){
         var wallpapers = [],
             url, imageData;
         for(var i = 0; i < comicsData.length; i++) {
            imageData = comicsData[i].thumbnail;
            url = imageData.path + '/standard_medium.' + imageData.extension;
            wallpapers.push(url);
         }
         callback(wallpapers);
      });
   };


   Mq.Client = RestClient;

})();
