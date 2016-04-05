'use strict';

$(document).on('ready', function() {
	$.ajaxSetup({
	    headers: {
	        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	    }
	});
});

var BookmarkModel = Backbone.Model.extend({
	urlRoot: '/api/bookmarks/',
	idAttribute: 'id',

	parse: function(response) {
	if (response.bookmark_tags) {
		response.bookmark_tags = new TagsCollection(response.bookmark_tags);
	}
	return response;
	}

});

var TagModel = Backbone.Model.extend({
	urlRoot: '/api/tags/',
	idAttribute: 'id',
		
		// parse: function(response) {
		// if (response.bookmark) {
		// 	response.bookmark = new BookmarksCollection(response.bookmark);
		// }
		// return response;
		// }
});

var UserModel = Backbone.Model.extend({
	urlRoot: '/api/users/',
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

var UsersCollection = Backbone.Collection.extend({
	url: '/api/users/',
	model: UserModel
});


var BookmarksListView = Backbone.View.extend({
	el: '<ul></ul>',
	
	template: _.template('\
		<% bookmarks.each(function(bookmark) { %>\
			<li><a data-id="<%= bookmark.id %>" href="#"><%= bookmark.get("url") %></a></li>\
		<% }) %>\
	'),

	events: {
		'click a': function(event) {
					event.preventDefault();
					var bookmarkId = $(event.target).data('id');
					var bookmark = new BookmarkModel({id: bookmarkId});
					bookmark.fetch({
						success: function() {
							var tagsListView = new TagsListView({ 
								collection: bookmark.get('bookmark_tags')
							});
							$('#tags').html(tagsListView.render().el);
						}
					});
				}
	},

	initialize: function() {
		this.listenTo(this.collection, 'update', this.render);
	},

	render: function() {
		this.$el.html(this.template({ bookmarks: this.collection }));
		return this;
	}
});

var TagsListView = Backbone.View.extend({
	el: '<ul></ul>',

	template: _.template('\
			<% tags.each(function(tag) { %>\
				<li>\
					<a href="#"><%= tag.get("name") %></a>\
				</li>\
			<% }) %>\
			'),

	initialize: function() {
		this.listenTo(this.collection, 'update', this.render);
	},

	render: function() {
		this.$el.html(this.template({ tags: this.collection }));
		return this;
	}
});

var HomeView = Backbone.View.extend({
	el: '<div class="container">\
			<div class="row">\
				<div class="three columns"></div>\
				<div class="six columns">\
					<div class="row">\
						<div class="twelve columns" id="tags"></div>\
					</div>\
					<div class="row">\
						<div class="twelve columns"></div>\
					</div>\
				</div>\
				<div class="three columns" id="all-bookmarks"></div>\
			</div>\
		</div>\
	  ',

	insertBookmarks: function() {
		var bookmarks = new BookmarksCollection();
		bookmarks.fetch();
		var bookmarksListView = new BookmarksListView({ 
			collection: bookmarks
		});
		this.$el.find('#all-bookmarks').html(bookmarksListView.render().el);
	},

	insertTags: function() {
		var tags = new TagsCollection();
		tags.fetch();
		var tagsListView = new TagsListView({ 
			collection: tags
		});
		this.$el.find('#tags').html(tagsListView.render().el);
	},

	render: function() {
		this.insertBookmarks();
		this.insertTags();

		return this;
	},
});

var homeView = new HomeView();
$('#content').html(homeView.render().el);

