'use strict';

var Backbone = require('../vendor/index').Backbone;
var _ = require('../vendor/index')._;
var $ = require('../vendor/index').$;

var fs = require('fs'); //will be replaced by brfs in the browser

// readFileSync will be evaluated statically so errors can't be caught
var template = fs.readFileSync(__dirname + '/learning-resources.html', 'utf8');

module.exports = Backbone.View.extend({

  className: 'learning-resource',

  template: _.template(template),

  events: {
    'click .b-delete': 'destroy',
    'click .b-edit': 'edit',
    'click .b-cancel': 'cancel',
    'click .b-update': 'save'
  },

  initialize: function(){
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'change', this.render);
  },

  edit: function(){
    var resource = this.model.get('resourceType');
    this.$el.addClass('editing');
    $('div .col-xs-6').addClass('sty-form');
  },

  cancel: function(){
    var title = this.model.get('title');
    var type = this.model.get('resourceType');
    var desc = this.model.get('description');
    var auth = this.model.get('authors');
    this.$('#title').val(title);
    this.$('#desc').val(desc);
    this.$('#authors').val(auth);
    this.$('select option[value="'+type+'"]').attr('selected','selected');
    $('div .col-xs-6').removeClass('sty-form');
    this.$el.removeClass('editing');
  },

  save: function(){
    var title = this.$('#title').val().trim();
    var type = $('#resourceType option:selected').val();
    var desc = this.$('#desc').val().trim();
    // var auth = this.$('#auth').val();
    var auth = [];
    $.each(this.$('#auth').val().split(','), function(){
      auth.push($.trim(this));
    });
    this.model.save({
                      title: title,
                      resourceType: type,
                      description: desc,
                      authors: auth
                    });
    // this.render();
    $('div .col-xs-6').removeClass('sty-form');
    this.$el.removeClass('editing');
    this.$('#msg').empty().fadeIn();
    this.$('#msg').html('Sucessfully updated').delay(2000).fadeOut('slow');

  },

  render: function(){
    var context = this.model.toJSON();
    var value = this.model.get('resourceType');
    var auth = this.model.get('authors').toString().split(',').join(', ');
    console.log(auth);
    this.$el.html(this.template(context));
    this.input = this.$('.editing');
    this.$('select option[value="'+value+'"]').attr('selected','selected');
    this.$('#auth').val(auth);
    this.$('#author-dsp').text(auth);
    return this;
  },

  destroy: function(){
    this.model.destroy();
    $('body').html('Successfully deleted.');
  }
});
