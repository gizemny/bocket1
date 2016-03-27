'use strict';

// $(document).on('ready', function() {
	$.ajaxSetup({
	    headers: {
	        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	    }
	});
// });

var BookmarkModel = Backbone.Model.extend({
	urlRoot: '/api/bookmarks/',
	idAttribute: 'id'
});

var TagModel = Backbone.Model.extend({
	urlRoot: '/api/tags/',
	idAttribute: 'id'
});

var BookmarksCollection = Backbone.Collection.extend({
	url: '/api/bookmarks/',
	model: BookmarkModel
});

var TagsCollection = Backbone.Collection.extend({
	url: '/api/tags/',
	model: TagModel
});

var BookmarkItemView = Backbone.View.extend({
	el: '<li></li>',
	template: _.template('<p><%= bookmark.get("url") %></p>'),

	initiate: function() {
		this.listenTo(this.model, 'sync', this.render);
	},

	render: function() {
		this.$el.html(this.template({ bookmark: this.model })); 
	}
});

var TagItemView = Backbone.View.extend({
	el: '<li></li>',
	template: _.template('<h2><%= tag.get("url") %></h2>'),
	
	initiate: function() {
			this.listenTo(this.model, 'sync', this.render);
	},
	
	render: function() {
		this.$el.html(this.template({tag: this.model})) 
	}
});


var BookmarksListView = Backbone.View.extend({
	el: '<ul></ul>',
	template: undefined,

	initialize: function() {
		this.listenTo(this.collection, 'update', this.render);
	},

	render: function() {
		var that = this; 
		this.collection.each(function(bookmarkModel) {
			var bookmarkItemView = new BookmarkItemView({ model: bookmarkModel });
			bookmarkItemView.render();
			that.$el.append(bookmarkItemView.el);
			// $('#content').html(bookmarksListView.el);
		}); 
	}
});

var HomeView = Backbone.View.extend({
	el: '<div class="container">\
	      <div class="row">\
	        <div class="three columns">three columns</div>\
	        <div class="six columns">six columns</div>\
	          <div class="row">\
	            <div class="twelve columns"></div>\
	          </div>\
	          <div class="row">\
	            <div class="twelve columns" id="all-bookmarks"></div>\
	          </div>\
	          <div class="three columns"></div>\
	      </div>\
	    </div>\
	  ',

	initialize: function() {
		this.listenTo(this.collection, 'all', function(event) {
			console.log(event);
		});
		this.listenTo(this.collection, 'sync update', this.render);
	},

	render: function() {
		var that = this;
		var bookmarks = new BookmarksCollection();
		bookmarks.fetch()
		var bookmarksListView = new BookmarksListView({ collection: bookmarks});
		bookmarksListView.render();
		this.$el.find('#all-bookmarks').html(bookmarksListView.el);

		return this;
	},
});



var homeView = new HomeView();
$('#content').html(homeView.render().el);


// var bookmarks = new BookmarksCollection();
// bookmarks.fetch();

// var bookmarksListView = new BookmarksListView({ collection: bookmarks });
// bookmarksListView.render();

// bookmarksListView.el;
// $('#content').html(bookmarksListView.el);
