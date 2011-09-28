//base object for all models
Brakkit.Record = SC.Object.extend({
  id : null,
  isNew : function(){
    return !this.get('id');
  }.property('id').cacheable(),
  save : function(callback){
    var self = this,
        urlRoot = this.get('urlRoot'),
        url = this.get('isNew') ? urlRoot : urlRoot + '/' + this.get('id'),
        method = this.get('isNew') ? 'POST' : 'PUT',
        data = this.get('attributes');
        data._method = method;
        
    $.ajax(url, {
      type: 'POST',
      data: data, // this.get('attributes'){ bracket: this.get('attributes'), _method: method },
      dataType: 'json',
      success: function(data, response) {
        if (self.get('isNew')) { self.set('id', data.id); }
        if(callback){
          callback();
        }
     }
   });
   return self;
  },
  deleted : false,
  remove : function(){
    var self = this;
    if(!this.get('isNew')){
      var urlRoot = this.get('urlRoot'),
          url = urlRoot + '/' + this.get('id'),
          method = 'DELETE',
          data = {};
          data._method = method;
      $.ajax(url, {
        type: 'POST',
        data: data, // this.get('attributes'){ bracket: this.get('attributes'), _method: method },
        dataType: 'json',
        success: function(data, response) {
          console.log(data);
        }
      });
    }
  },
  //overide these
  urlRoot : 'record',
  attributes : {}
});