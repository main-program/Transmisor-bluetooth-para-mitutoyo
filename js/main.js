$(document).ready(function(){
    
    var banner = {              //Objeto con conjunto de variables dentro.
        padre: $('#banner'),    //Propiedas que accede al div id="banner".
        numeroSlides: $('#banner').children('.slide').length,       //Esta propiedad va a acceder al div con id="banner" y va a contar cuantos                                                                  hijos hay en ese div con la clase="slide".
        posicion:1
    }
    
    
    var info = {              //Objeto con conjunto de variables dentro.
        padre: $('#info'),    //Propiedas que accede al div id="banner".
        numeroSlides: $('#info').children('.slide').length,       //Esta propiedad va a acceder al article con id="info" y va a contar cuantos                                                                  hijos hay en ese article con la clase="slide".
        posicion:1
    }
    
    banner.padre.children('.slide').first().css({
        'left': '0'
    });
    
    info.padre.children('.slide').first().css({
        'left': '0'
    });
    
    var alturabanner = function(){     //Esta función se encargará de cuanto va a medir el banner en diferentes tamaños de pantalla (responsive).                                    No se ejecutará hasta que la llamemos.
        var altura = banner.padre.children('.slide').outerHeight();     //altura es igual a la altura de las imagenes en el div id="banner".
        banner.padre.css({
            'height': altura + 'px'
        });      
    }
    
    var alturainfo = function(){             
        var altura = info.padre.children('.active').outerHeight();     //altura es igual a la altura de los div en el article id="info".
        info.padre.animate({
            'height': altura + 'px'
        });      
    }    
    
    var alturacontenedor = function(){
        var altura = $(window).height();
        if(altura <= $('#contenedor').outerHeight() + 200){
            $('#contenedor').css({
                'height': ''
            });
        }
        else{
            $('#contenedor').css({
                'height': altura + 'px'
            });
        }
    }
        
    alturacontenedor();
    alturabanner();     //Esta función se ejecuta al inicio cuando carga la página y calcula la altura de la imagenes del banner.
    alturainfo();       //Esta función se ejecuta al inicio cuando carga la página y calcula la altura de la imagenes del banner.
    
    $(window).resize(function(){    //Esta función se ejecuta cuando hay un cambio de tamaño en la ventana y calcula la altura de la imagenes del                                   banner y los div del article.
        alturabanner();
        alturainfo();
        alturacontenedor();
    });
    
    $('#info').children('.slide').each(function(){
        $('#botones').append('<span>');
    });
    
    $('#botones').children('span').first().addClass('active');
    
    //-------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------- BANNER BOTÓN SIGUIENTE -----------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------
    
    
    $('#banner_next').on('click', function(e){
        e.preventDefault();
        
        if(banner.posicion < banner.numeroSlides){          //Si la posición es menor al numero de imagenes entra.
            
            banner.padre.children().not('.active').css({           //Todos los que no tengan 'active' están a la derecha del div.
                'left': '100%'
            });
            
            $('#banner .active').removeClass('active').next().addClass('active').animate({  
                'left': '0'
            });     //A la imagen que tiene la propiedad 'active' se la quita y se la pone a la siguiente imagen. Animamos la siguiente imagen para que entre de derecha a izquierda.
            
            $('#banner .active').prev().animate({
                'left': '-100%'
            });     //Ahora la siguiente imagen ya tiene la propiedad 'active' y ya entró de derecha a izquierda, entonces la imagen anterior que ocupada el centro de la pantalla la sacamos también de derecha a izquierda.
            
            banner.posicion = banner.posicion + 1;          //Actualizamos el valor de posición para saber en que imagen vamos.
        }
        else{                                               //Si la posición es igual al número de imagenes, osea que estamos en la última imagen...
            
            $('#banner .active').animate({
                'left': '-100%'
            });                 //La imagen actual que viene siendo la última la sacamos de derecha a izquierda.
            
            banner.padre.children().not('.active').css({           //Todos los que no tengan 'active' están a la derecha del div.
                'left': '100%'
            });
            
            $('#banner .active').removeClass('active');     //Le quitamos la clase 'active' a la última foto.
            banner.padre.children('.slide').first().addClass('active').animate({        
                'left': '0'
            });     //Le ponemos la clase 'active' a la primera foto y la metemos de derecha a izquierda.
            
            banner.posicion = 1;
        }
    });
    
    //-------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------- BANNER BOTÓN ANTERIOR -----------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------
    
    
    $('#banner_prev').on('click', function(e){
        e.preventDefault();
        
        if(banner.posicion == 1){          //Si ésta es la primera imagen.
            banner.padre.children().not('.active').css({           //Todos los que no tengan 'active' están a la izquierda del div.
                'left': '-100%'
            });
            
            $('#banner .active').animate({
                'left': '100%'
            });         //La imagen actual que viene siendo la primera la sacamos de izquierda a derecha.
                        
            $('#banner .active').removeClass('active');     //Le quitamos la clase 'active' a la primera foto.
            banner.padre.children().last().addClass('active').animate({        
                'left': '0'
            });     //Le ponemos la clase 'active' a la última foto y la metemos de izquierda a derecha.
            
            banner.posicion = banner.numeroSlides;    //Actualizamos el valor de posición para saber en que imagen vamos.
        }
        else{                       //Estamos en la imagen 2, 3 o 4.
            
            banner.padre.children().not('.active').css({             //Todos los que no tengan 'active' están a la izquierda del div.
                'left': '-100%'
            });
            
            $('#banner .active').removeClass('active').prev().addClass('active').animate({
                'left': '0'
            });     //A la imagen que tiene la propiedad 'active' se la quita y se la pone a la imagen previa. Animamos la imagen previa para que entre de izquierda a derecha.
            
            $('#banner .active').next().animate({
                'left': '100%'
            });     //Ahora la imagen previa ya tiene la propiedad 'active' y ya entró de izquierda a derecha, entonces la imagen siguiente que ocupaba el centro de la pantalla la sacamos también de izquierda a derecha.
            
            banner.posicion = banner.posicion - 1;          //Actualizamos el valor de posición para saber en que imagen vamos.
        }
    });
    
    //-------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------- INFO BOTÓN SIGUIENTE ------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------
    $('#info_next').on('click', function(e){
        e.preventDefault();       
        
        if(info.posicion < info.numeroSlides){          //Si la posición es menor al numero de div entra.            
            info.padre.children().not('.active').css({           //Todos los que no tengan 'active' están a la derecha del article.
                'left': '100%'
            });
            
            $('#info .active').removeClass('active').next().addClass('active').animate({  
                'left': '0'
            });     //Al div que tiene la propiedad 'active' se la quita y se la pone al siguiente div. Animamos el siguiente div para que entre de derecha a izquierda.
            
            $('#info .active').prev().animate({
                'left': '-100%'
            });     //Ahora el siguiente div ya tiene la propiedad 'active' y ya entró de derecha a izquierda, entonces el div anterior que ocupada el centro de la pantalla lo sacamos también de derecha a izquierda.
            
            $('#botones .active').removeClass('active').next().addClass('active');
            info.posicion = info.posicion + 1;          //Actualizamos el valor de posición para saber en que div vamos.
        }
        else{                                           //Este es el último div 
            info.padre.children().not('.active').css({           //Todos los que no tengan 'active' están a la derecha del article.
                'left': '100%'
            });
            
            $('#info .active').animate({
                'left': '-100%'
            });                 //El div actual que viene siendo el último lo sacamos de derecha a izquierda.
            
            $('#info .active').removeClass('active');     //Le quitamos la clase 'active' al último div.
            info.padre.children('.slide').first().addClass('active').animate({        
                'left': '0'
            });     //Le ponemos la clase 'active' al primer div y lo metemos de derecha a izquierda.
            
            $('#botones .active').removeClass('active');
            $('#botones').children('span').first().addClass('active');                        
            info.posicion = 1;
        }
        alturainfo(); 
    });
    
    //-------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------- INFO BOTÓN ANTERIOR -----------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------
    $('#info_prev').on('click', function(e){
        e.preventDefault();
        
        if(info.posicion == 1){          //Si éste es el primer div.
            info.padre.children().not('.active').css({           //Todos los que no tengan 'active' están a la izquierda del article.
                'left': '-100%'
            });
            
            $('#info .active').animate({
                'left': '100%'
            });         //El div actual que viene siendo el primero, lo sacamos de izquierda a derecha.
                        
            $('#info .active').removeClass('active');     //Le quitamos la clase 'active' al primer div.
            info.padre.children().last().addClass('active').animate({        
                'left': '0'
            });     //Le ponemos la clase 'active' al último div y lo metemos de izquierda a derecha.
            
            $('#botones .active').removeClass('active');
            $('#botones').children('span').last().addClass('active');
            info.posicion = info.numeroSlides;    //Actualizamos el valor de la posición para saber en que div vamos.
        }
        else{                       //Estamos en el div 2, 3 o 4.
            
            info.padre.children().not('.active').css({             //Todos los que no tengan 'active' están a la izquierda del article.
                'left': '-100%'
            });
            
            $('#info .active').removeClass('active').prev().addClass('active').animate({
                'left': '0'
            });     //Al div que tiene la propiedad 'active' se lo quita y se lo pone al div previo. Animamos el div previo para que entre de izquierda a derecha.
                        
            $('#info .active').next().animate({
                'left': '100%'
            });     //Ahora el div previo ya tiene la propiedad 'active' y ya entró de izquierda a derecha, entonces el div siguiente que ocupaba el centro de la pantalla lo sacamos también de izquierda a derecha.
            
            $('#botones .active').removeClass('active').prev().addClass('active');
            info.posicion = info.posicion - 1;          //Actualizamos el valor de posición para saber en que div vamos.
        }
        alturainfo(); 
    });
     
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    
});