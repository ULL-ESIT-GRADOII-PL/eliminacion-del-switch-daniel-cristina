function Medida(valor,tipo) {
   expr = XRegExp('(?<num>      [-+]?[^\\.][0-9]+([\\.][0-9]+)?\\s*(?:e[+-]?[ ]*[0-9]+)?)\\s*   # numero       \n' +
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
}

Medida.match = function(valor) {
  expresion = XRegExp('(?<num>   [-+]?[^\\.][0-9]+([\\.][0-9]+)?\\s*(?:e[+-]?[ ]*[0-9]+)?)\\s*   # numero       \n' +
                           '(?<temp1>    [fkcFKC])\\s*                                       # temperatura1 \n' +
                           '(?<to>       (?:to)?)\\s*                                        # to           \n' +
                           '(?<temp2>    [fkcFKC])\\s*                                       # temperatura2','x');

  valor = XRegExp.exec(valor, expresion);
  return valor;
}

 ///no sé
Medida.measures = {};

Medida.convertir = function(valor) {
  var measures = Medida.measures;
  measures.c = Celsius;
  measures.f = Farenheit;
  measures.k = Kelvin;

  var match = Medida.match(valor);
  if (match) {
    var numero = parseFloat(match.num),
        tipo   = match.temp1.toLowerCase(),
        destino = match.temp2.toLowerCase();

    try {
      console.log(measures[tipo]);
      var source = new measures[tipo](numero);  // new Fahrenheit(32)
      var target = "to"+measures[destino].name; // "toCelsius"
      return source[target]().toFixed(2) + " " + measures[destino].name; // "0 Celsius"
    }
    catch(err) {
      console.log(err);
      return 'Desconozco como convertir desde "' + tipo + '" hasta "' + destino + '"';
    }
  }
  else
    return "Introduzca una temperatura valida: 32.6e-8 F to C";
};
