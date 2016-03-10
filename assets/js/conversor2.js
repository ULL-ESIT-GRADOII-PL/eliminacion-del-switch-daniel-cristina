
  function Temperatura(valor,tipo) {
    /* tipo es opcional. Debería admitir new Medida("45.2 F") */
    Medida.call(this,valor,tipo);
  }
  Temperatura.prototype = new Medida ();
  Temperatura.prototype.constructor = Temperatura;

  function Celsius(valor) {
    Temperatura.call(this, valor, "c");
    //funcion Celsius to Kelvin
    this.toKelvin = function(){
    //  var aux =  parseFloat(valor);
    //  aux = aux + 273.15;
      return (valor + 273.15);
    };
    //funcion Celsius to Farenheit
    this.toFarenheit = function(){
      return ((valor * 9/5)+32);
    };
  }

  Celsius.prototype = new Temperatura();
  Celsius.prototype.constructor = Celsius;

  function Farenheit(valor) {
    Temperatura.call(this, valor, "f");
    // funcion Farenheit to Celsius
    this.toCelsius = function(){
      return ((valor - 32)*5/9);
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
  exports.Kelvin = Kelvin;

