'use strict';

var Backbone = require('../vendor/index').Backbone;
var _ = require('../vendor/index')._;
var $ = require('../vendor/index').$;

var fs = require('fs'); //will be replaced by brfs in the browser

// readFileSync will be evaluated statically so errors can't be caught
var template = fs.readFileSync(__dirname + '/learning-resource.html', 'utf8');

var showMessage = function(type, msg) {
  $('#msg').empty().addClass(type)
    .html(msg).fadeIn().delay(2000)
    .fadeOut('slow').queue(function(remove) {
      $('#msg').removeClass(type);
      remove();
    });
};

var renderAuthors = function(self) {
  var auth = self.model.get('authors').toString().split(',').join(', ');
  self.input = self.$('.editing');
  self.$('select option[value="'+self.model.get('resourceType')+'"]')
      .attr('selected','selected');
  self.$('#auth').val(auth);
  self.$('#author-dsp').text(auth);
};

var initialValues = function(self) {
  self.$('#title').val(self.model.get('title'));
  self.$('#desc').val(self.model.get('description'));
  self.$('#auth').val(self.model.get('authors'));
  self.$('select option[value="'+self.model.get('resourceType')+'"]')
      .attr('selected','selected');
};

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
    this.$el.addClass('editing'); //displays input fields
    $('#form-area').addClass('sty-form'); //add bg color of form
  },

  cancel: function(){
    $('#form-area').removeClass('sty-form'); //remove bg color of form
    showMessage('alert-warning', 'Changes cancelled');
    this.$el.removeClass('editing');
  },

  save: function(){
    var view = this;

    var authorsFormat = function() {
      var authors = [];
      // console.log($('#auth').val().split(','));
      if ($('#auth').val() === '') authors = null;
      else {
        $.each($('#auth').val().split(','), function(key,value){
          authors.push(value.trim());
        });
        return authors;
      }
    };

    var saveArgs = {
      attributes: {
        title: this.$('#title').val().trim(),
        resourceType: $('#resourceType option:selected').val(),
        description: this.$('#desc').val().trim(),
        authors: authorsFormat
      },
      options: {
        success: function(){
          $('#form-area').removeClass('sty-form');
          view.$el.removeClass('editing');
          showMessage('alert-success', 'Successfully updated');
        },
        error: function(model, error){
          //server response errors if no validations specified
        }
      }
    };

    this.model.save(saveArgs.attributes, saveArgs.options);

    if (this.model.validationError) {
      showMessage('alert-danger', this.model.validationError);
    }
  },

  render: function(){
    var context = this.model.toJSON();
    this.$el.html(this.template(context));
    renderAuthors(this);
    return this;
  },

  destroy: function(){
    this.model.destroy();
    this.remove();
  }
});
