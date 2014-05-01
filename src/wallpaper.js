(function(){

   function Wallpaper(){
   }

   Wallpaper.init = function(){
      Wallpaper.initialiseEvents();
      Mq.Client.getWallpapers({nameStartsWith: Wallpaper.getRandomLetter()}, function(wallpaperUrls){
         Wallpaper.urls = wallpaperUrls;
         Wallpaper.multiRender();
      });
   };

   Wallpaper.render = function(){
      var clientHeight = Math.ceil($('body').outerHeight() / 100) + 1;
      var clientWidth = Math.ceil($('body').outerWidth() / 100) + 1;
      var backgroundValue = 'background:';

      for (var i = 0; i < clientWidth; i++) {
         for (var j = 0; j < clientHeight; j++) {
            backgroundValue += 'url(' + Wallpaper.urls[_.random(Wallpaper.urls.length - 1)] + ') '
            backgroundValue += i * 100 + 'px '
            backgroundValue += j * 100 + 'px no-repeat,'
         }
      }
      $('body')[0].setAttribute('style', backgroundValue.substring(0, backgroundValue.length - 1));
   };

   Wallpaper.multiRender = function() {
      var counter = 0;
      var interval = setInterval(function(){
         Wallpaper.render();
         if (counter == 5) {
            clearInterval(interval);
         }
         counter++;
      }, 50);
   };

   Wallpaper.initialiseEvents = function(){
      $(window).resize(_.throttle(Wallpaper.render, 1000));
   };

   Wallpaper.getRandomLetter = function(){
      var alphaWithExclusions = 'abcdefghijklmnopqrstuv';
      return alphaWithExclusions.split('')[_.random(alphaWithExclusions.length - 1)];
   };

   Wallpaper.urls = null;

   Mq.Wallpaper = Wallpaper;

})();