'use strict';
var Backbone = require('../vendor/index').Backbone;
var _ = require('../vendor/index')._;
var $ = require('../vendor/index').$;
var fs = require('fs'); //will be replaced by brfs in the browser
// readFileSync will be evaluated statically so errors can't be caught
var template = fs.readFileSync(__dirname + '/instructor.html', 'utf8');

module.exports = Backbone.View.extend({
  className: 'instructor',
  template: _.template(template),
  events: {
    'click .delete': 'destroy'
    //'click .edit': 'edit'
  },
  initialize: function(){
    this.listenTo(this.model, 'destroy', this.remove);
    //this.model.on('change', this.render, this);
  },
  render: function(){
    var context = this.model.toJSON();
    this.$el.html(this.template(context));
    //this.input = this.$('.edit');

    return this;
  },
  destroy: function(){
    this.model.destroy();
  }/*,
  edit: function(e){
    this.$el.addClass('editing');
    this.input.focus();

    var value = this.input.val().trim();
    if(value) {
      this.model.save({firstName: value});
    }
    this.$el.removeClass('editing');
    if(e.which == 13){
      this.close();
    }
  }*/

});
