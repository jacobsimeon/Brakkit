var Power = {
  of : function(root){
    var seed = 0;    
    return {
      lessThan : function(max){
        var exponent = 0,
            product = 0;
        while(true){
          product = Math.pow(root, exponent);
          if(product > max){
            return product / root;
          }
          else if(product == max){
            return product;
          }
          exponent += 1;
        }
      },
      greaterThan : function(min){
        var self = this,
            last = self.lessThan(min);
        return last * root;
      }
    }
  }
}

//find x where n^x = integer
var Root = function(n){
  var ln = Math.log;
  return {
    of : function(integer){
      var x = ln(integer) / ln(n);
      return x;
    }
  }
}
