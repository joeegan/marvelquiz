(function(){

   function Autocomplete(typeaheadSelector, data){

      var data = new Bloodhound({
         datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
         queryTokenizer: Bloodhound.tokenizers.whitespace,
         local: $.map(data, function(d) { return { value: d }; })
      });

      data.initialize();

      $(typeaheadSelector).typeahead({
            hint: true,
            highlight: true,
            minLength: 1
         },
         {
            data: 'data',
            displayKey: 'value',
            source: data.ttAdapter()
         });
   }

   Mq.Autocomplete = Autocomplete;

})();
