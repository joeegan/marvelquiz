(function(){

   function Wallpaper(){
   }

   Wallpaper.init = function(){
      Wallpaper.initialiseEvents();
      Mq.Client.getWallpapers(function(wallpaperUrls){
         var clientHeight = Math.ceil($('body').outerHeight() / 100) + 1;
         var clientWidth = Math.ceil($('body').outerWidth() / 100) + 1;
         var backgroundValue = 'background:';

         for (var i = 0; i < clientWidth; i++) {
            for (var j = 0; j < clientHeight; j++) {
               backgroundValue += 'url(' + wallpaperUrls[_.random(wallpaperUrls.length - 1)] + ') '
               backgroundValue += i * 100 + 'px '
               backgroundValue += j * 100 + 'px no-repeat,'
            }
         }
         $('body')[0].setAttribute('style', backgroundValue.substring(0, backgroundValue.length - 1));
      }, 1);
   };

   Wallpaper.initialiseEvents = function(){
      $(window).resize(_.throttle(Wallpaper.init, 1000));
   };

   Mq.Wallpaper = Wallpaper;

})();