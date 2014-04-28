(function(){

   function Game(){
   }

   Game.init = function(){

      Mq.Wallpaper.init();

      Game.initialiseDom();
      Game.initialiseEvents();

      Mq.Client.getCharactersWithImages(function(response) {
         Game.characterData = response;
         Game.attrubutionJq.html(response.attributionHTML);
         Mq.Autocomplete(Game.inputJq, response.names);
         Game.inputJq.focus();
         Game.renderNewImage();
      });
   };

   Game.renderNewImage = function(){
      var randomSelection = _.random(Game.characterData.length);
      Game.answer = Game.characterData[randomSelection].name;
      var character, thumbnail, img;

      for (var i = 0; i < Game.characterData.length; i++) {
         character = Game.characterData[i];
         thumbnail = character.thumbnail;
         if (i == randomSelection) {
            console.log(Game.answer);
            img = thumbnail.path + '/detail.' + thumbnail.extension;
            console.log(img);
            Game.imageLinkJq.attr('href', character.urls[0].url);
            Game.imageJq.attr('src', img);
         }
      }
   };

   Game.initialiseEvents = function(){
      Game.formJq.on('submit', Game.handleFormSubmit);
   };

   Game.initialiseDom = function(){
      Game.addProps({
         correctJq: $('.alert-success'),
         incorrectJq: $('.alert-danger'),
         inputJq: $('input'),
         formJq: $('form'),
         imageLinkJq: $('a'),
         imageJq: $('img'),
         attrubutionJq: $('.attribution')
      });
   };

   Game.handleFormSubmit = function(ev){
      ev.preventDefault();
      var guess = Game.inputJq.val();
      if (guess == Game.answer) {
         Game.handleCorrectAnswer(Game.answer);
      } else {
         Game.handleIncorrectAnswer(guess);
      }
   };

   Game.handleCorrectAnswer = function(answer){
      Game.incorrectJq.addClass('hidden');
      Game.correctJq.html('<strong>Congratulations</strong>, you have the right answer, it was ' + answer + '.').removeClass('hidden');
      setTimeout(function(){
         Game.hideAlerts();
         Game.inputJq.val('').focus();
         Game.renderNewImage();
      }, 1500);
   };

   Game.handleIncorrectAnswer = function(guess){
      Game.correctJq.addClass('hidden');
      Game.incorrectJq.html('<strong>Incorrect answer</strong>, it was not ' + guess + '. Try again.').removeClass('hidden');
      Game.inputJq.focus();
   };

   Game.hideAlerts = function(){
      Game.correctJq.addClass('hidden');
      Game.incorrectJq.addClass('hidden');
   };

   Game.addProps = function(obj){
      for (var key in obj) {
         Game[key] = obj[key];
      }
   };

   Game.answer = null;

   Game.characterData = null;

   Mq.Game = Game;

   $(document).ready(function(){
      Mq.Game.init();
   });

})();