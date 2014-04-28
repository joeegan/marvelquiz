(function(){

   var URL_BASE = 'http://gateway.marvel.com';
   var PUBLIC_API_KEY = '861f268aa00e35b608081aae0bef2364';

   function RestClient(){
   }

   RestClient._send = function(url, callback){
      $.get(URL_BASE + url + '?apikey=' + PUBLIC_API_KEY, callback.bind(this));
   };

   RestClient.getCharacters = function(callback) {
      RestClient._send(Mq.Urls.CHARACTER, callback);
   };

   Mq.Client = RestClient;

})();
