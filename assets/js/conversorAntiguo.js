(function(exports) {
  "use strict";
  function main() {
        var valor     = document.getElementById('convert').value,
            elemento  = document.getElementById('converted');
         //elemento.innerHTML = Medida.convertir(valor);
        //return false;
    }
    exports.main = main;

  function Medida(valor,tipo) {
    const expr = XRegExp('(?<num>      [-+]?[^\\.][0-9]+([\\.][0-9]+)?\\s*(?:e[+-]?[ ]*[0-9]+)?)\\s*   # numero       \n' +
                         '(?<temp1>    [fkcFKC])\\s*                                                   # temperatura1','x');

    if (!tipo) {
      cadena = XRegExp.exec(valor, expr);
      this.value = cadena.num;
      this.type = cadena.temp1;
    }
    else {
      this.value = valor;
      this.type = tipo;
    }


    /* tipo es opcional. Debería admitir  new Medida("45.2 Km") */
    /* ademas de new Medida(45.2, "Km") */

  }

  exports.convertir = function(valor){
  //  var valor     = document.getElementById('convert').value,
  //      elemento  = document.getElementById('converted'),
        /* Extienda la RegeExp a la especificación. use una XRegExp */
        regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([fkc])\s*(?:to)?\s*([fkc])$/i,

        expresion = XRegExp('(?<num>   [-+]?[^\\.][0-9]+([\\.][0-9]+)?\\s*(?:e[+-]?[ ]*[0-9]+)?)\\s*   # numero       \n' +
                            '(?<temp1>    [fkcFKC])\\s*                                       # temperatura1 \n' +
                            '(?<to>       (?:to)?)\\s*                                        # to           \n' +
                            '(?<temp2>    [fkcFKC])\\s*                                       # temperatura2','x'),

        valor = XRegExp.exec(valor, expresion);

   if (valor) {

      var numero = valor.num,
          tipo = valor.temp1.toLowerCase(),
          tipo2 = valor.temp2.toLowerCase();

      numero = parseFloat(numero);
      console.log("Valor: " + numero + ", Tipo: " + tipo);

      switch (tipo) {
        case 'c':
          var celsius = new Celsius(numero);
          if (tipo2 == 'f')
          return celsius.toFarenheit().toFixed(2) + " Farenheit.";
          if (tipo2 == 'k')
          return celsius.toKelvin().toFixed(2) + " Kelvin.";
          if (tipo2 == 'c')
          return "Conversión inválida";
          break;
        case 'f':
          var farenheit = new Farenheit(numero);
          if (tipo2 == 'c')
          return farenheit.toCelsius().toFixed(2) + " Celsius";
          if (tipo2 == 'k')
          return farenheit.toKelvin().toFixed(2) + " Kelvin";
          if (tipo2 == 'f')
          return "Conversión inválida";
          break;
        case 'k':
          var kelvin = new Kelvin(numero);
          if (tipo2 == 'c')
          return kelvin.toCelsius().toFixed(2) + " Celsius";
          if (tipo2 == 'f')
          return kelvin.toFarenheit().toFixed(2) + " Farenheit";
          if (tipo2 == 'k')
          return "Conversión inválida";
          break;

        default:
          elemento.innerHTML = "ERROR! Intenta algo como '-4.2C' ";
           /* rellene este código */
      }
    }
    else
      elemento.innerHTML = "Formato de entrada inválido";
  };



  function Temperatura(valor,tipo) {
    Medida.call(this, valor, tipo);
    /* tipo es opcional. Debería admitir new Medida("45.2 F") */
  }
  // Hacemos que Temperatura Herede de Medida
  Temperatura.prototype = new Medida();
  Temperatura.prototype.constructor = Temperatura;

  function Celsius(valor) {
    Temperatura.call(this, valor, "c");
    //funcion Celsius to Farenheit
    this.toFarenheit = function(){
      return ((valor * 9/5)+32);
    };
    //funcion Celsius to Kelvin
    this.toKelvin = function(){
      return (valor + 273.15);
    };
  }
  Celsius.prototype = new Temperatura();
  Celsius.prototype.constructor = Celsius;

  function Farenheit(valor) {
    Temperatura.call(this, valor, "f");
    // funcion Farenheit to Celsius
    this.toCelsius = function(){
      return (valor - 32)*5/9;
    };
    // funcion Farenheit to Kelvin
    this.toKelvin = function(){
      var aux = (5*(valor - 32))/9
      return (aux + 273.15);
    };
  }
  Farenheit.prototype = new Temperatura();
  Farenheit.prototype.constructor = Farenheit;

  function Kelvin(valor) {
    Temperatura.call(this, valor, "k");
    // funcion Kelvin to Celsius
    this.toCelsius = function(){
      return (valor - 273.15);
    };
    // funcion Kelvin to Farenheit
    this.toFarenheit = function(){
      var aux = (9*(valor - 273.15))/5
      return (aux + 32);
    };
  }
  Kelvin.prototype = new Temperatura();
  Kelvin.prototype.constructor = Kelvin;



  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;


//}

})(this);
