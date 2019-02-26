$(document).ready(function(){
  var selectorEn = '#translateEn';
  $(selectorEn).on('click', function(e){
    e.preventDefault();
    startLang( $(this) );
  });

  var selectorFr = '#translateFr';
  $(selectorFr).on('click', function(e){
    e.preventDefault();
    startLang( $(this) );
  });

  var selectorEs = '#translateEs';
  $(selectorEs).on('click', function(e){
    e.preventDefault();
    startLang( $(this) );
  });


  var startLang = function(el){
    var el = $(el);
    var file = el.attr('data-file');
    loadLang(file);
    $('html').attr('lang', file);
  };

  var loadLang = function(lang){
    var processLang = function(data){
      var arr = data.split('\n');
      for(var i in arr){
        if( lineValid(arr[i]) ){
          var obj = arr[i].split('=>');
          assignText(obj[0], obj[1]);
        }
      }
    };
    var assignText = function(key, value){
      $('[data-lang="'+key+'"]').each(function(){
        var attr = $(this).attr('data-destine');
        if(typeof attr !== 'undefined'){
          $(this).attr(attr, value);
        }else{
          $(this).html(value);
        }
      });
    };
    var lineValid = function(line){
      return (line.trim().length > 0);
    };
    $('.loading-lang').addClass('show');
    $.ajax({
      url: 'lang/'+lang+'.txt',
      error:function(){
        alert('No se cargó traducción');
      },
      success: function(data){
        $('.loading-lang').removeClass('show');
        processLang(data);
      }
    });
  };  

  $.ajax({
    url:'country.php',
    success: function(data){
      $(selector).attr('data-index', data);
      startLang( $(selector) );
    }
  });
});