(function(){

   function Wallpaper(){
   }

   Wallpaper.init = function(){
      Wallpaper.initialiseEvents();
      Mq.Client.getWallpapers(function(wallpaperUrls){
         var clientHeight = Math.ceil($('body').outerHeight() / 100) + 1;
         var clientWidth = Math.ceil($('body').outerWidth() / 100) + 1;
         var backgroundValue = '';

         for (var i = 0; i < clientWidth; i++) {
            for (var j = 0; j < clientHeight; j++) {
               backgroundValue += 'url(' + wallpaperUrls[Wallpaper.getRandomInt(wallpaperUrls.length - 1)] + ')'
               backgroundValue += i * 100 + 'px ' //(i % 2) ? 0 : '100%'
               backgroundValue += j * 100 + 'px no-repeat,'
            }
         }
         $('body').css('background', backgroundValue.substring(0, backgroundValue.length - 1));
      }, 1);
   };

   Wallpaper.initialiseEvents = function(){

   };

   Wallpaper.getRandomInt = function(max) {
      return Math.floor(Math.random() * (max - 1)) + 0;
   };

   Mq.Wallpaper = Wallpaper;

})();