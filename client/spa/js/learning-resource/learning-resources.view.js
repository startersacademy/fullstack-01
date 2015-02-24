'use strict';

var Backbone = require('../vendor/index').Backbone;
var _ = require('../vendor/index')._;
var $ = require('../vendor/index').$;
var Model = require('./learning-resource.model');

var fs = require('fs'); //will be replaced by brfs in the browser

// readFileSync will be evaluated statically so errors can't be caught
var template = fs.readFileSync(__dirname + '/learning-resources.html', 'utf8');

var showMessage = function(type, msg) {
  $('#msg').empty().addClass(type)
    .html(msg).fadeIn().delay(2000)
    .fadeOut('slow').queue(function(remove) {
      $('#msg').removeClass(type);
      remove();
    });
};

var Add = Backbone.Model.extend({

  urlRoot: '/learning-resources',

  defaults: {
    title: '',
    resourceType: '',
    authors: '',
    description: ''
  },

});

module.exports = Backbone.View.extend({

  className: 'learning-resources',

  template: _.template(template),

  events:{
    'click .sortById': 'sortById',
    'click .sortByTitle': 'sortByTitle',
    'click .sortByResourceType': 'sortByResourceType',
    'click .sortByAuthors': 'sortByAuthors',
    'click .sortByDescription': 'sortByDescription',
    'click .btn-lrs-add': 'renderModal',
    'click .btn-lrs-del': 'delConfirm'
  },

  initialize: function() {
    this.listenTo(this.collection, 'add', function(){
      this.render();
    });
    this.listenTo(this.collection, 'reset', function(){
      this.render();
    });
    this.listenTo(this.collection, 'sort', function(){
      this.render();
    });
  },

  render: function() {
    console.log(this.collection.models);
    var context = this.collection;
    this.$el.html(this.template(context));
    return this;
  },

  sortByTitle: function(){
    this.collection.trigger('sortByTitle');
    this.render();
  },

  sortByResourceType: function(){
    this.collection.trigger('sortByResourceType');
    this.render();
  },

  sortByAuthors: function(){
    this.collection.trigger('sortByAuthors');
    this.render();
  },

  sortByDescription: function(){
    this.collection.trigger('sortByDescription');
    this.render();
  },

  renderModal: function(){
    var view = new ResourceDialog();
    view.render();
  },

  delConfirm: function() {
    var collection = this.collection;
    var checkedIds = [];
    if ($(':checkbox:checked').length === 0) {
      showMessage('alert-info', 'No resources selected');
    }
    else {
      $(':checkbox:checked').each(function () {
        console.log($(this).val());
        checkedIds.push($(this).val());
      });
      $.each(checkedIds, function(key, value) {
        console.log(value);
        var item = collection.get({id:value});
        item.destroy();
        collection.remove({id:value});
      });
    }
  },

});

var ResourceDialog = Backbone.View.extend({
  className: 'modal fade',
  attributes: {
    tabindex: '-1',
    role: 'dialog',
  },

  initialize: function() {
    this.model = this.model || new Add();
    this.temp = _.template($('#dialog-template').html());
  },

  events: {
    'click #lrs-add-save': 'saveNewResource',
    'click .close': 'close'
  },

  render: function() {
    var context = this.model.toJSON();
    this.$el.html(this.temp(context)).appendTo(document.body);
    this.$el.modal();
    return this;
  },

  close: function() {
    this.remove();
  },

  saveNewResource: function(){

    var newResource = new Model();

    var authorsFormat = function(authored) {
      var authors = [];
      // console.log($('#auth').val().split(','));
      // if ($('#lrs-add-authors').val() === '') authors = null;
      // else {
      //   $.each($('#lrs-add-authors').val().split(','), function(key,value){
      //     console.log(value);
      //     authors.push(value.trim());
      //   });
      // }
      authored(authors);
    };

    var saveArgs = {
      attributes: {
        title: $('#lrs-add-title').val().trim(),
        resourceType: $('#lrs-add-resourceType option:selected').val(),
        description: $('#lrs-add-description').val().trim(),
        authors: $('#lrs-add-authors').val().split(',')
      },
      options: {
        success: function(response){
          $('#lrs-dismiss').click();
          setTimeout(function() {
            // collection.fetch();
            // collection.add(saveArgs.attributes);
            $('table tr td').find('[value="na"]').attr('value', response.id);
          }, 400);

          showMessage('alert-success', 'Successfully updated');
          console.log('success');
        },
        error: function(model, error){
          //server response errors if no validations specified
        }
      }
    };

    newResource.save(saveArgs.attributes, saveArgs.options);

    // if (newResource.validationError) {
    //   showMessage('alert-danger', this.model.validationError);
    // }
  },

});
