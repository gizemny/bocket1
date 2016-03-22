'use strict';

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

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
	template: _.template('<h2><%= bookmark.get("url") %></h2>'),
	render: function() {
		this.$el.html(this.template({ bookmark: this.model })); 
	}
});

var TagItemView = Backbone.View.extend({
	el: '<li></li>',
	template: _.template('<h2><%= tag.get("url") %></h2>'),
	render: function() {
		this.$el.html(this.template({tag: this.model})) 
	}
});


var BookmarksListView = Backbone.View.extend({
	el: '<ul></ul>',
	template: undefined,

	render: function() {
		var that = this; 
		this.collection.each(function(bookmarkModel) {
			var bookmarkItemView = new BookmarkItemView({ model: bookmarkModel });
			bookmarkItemView.render();
			that.$el.append(bookmarkItemView.el);
			$('#content').html(bookmarksListView.el);
		}); 
	}
});

// var bookmark = new BookmarkModel({id: 1});
// var tag = new TagModel({id: 1});

//trying to stop from renders before we get a title
//because it is asychronous so we want a success callback
// bookmark.fetch({
// 	success: function() {
// 		//instantiate new one
// 		var bookmarkItemView = new BookmarkItemView({ model: bookmark });
// 		//render
// 		bookmarkItemView.render();
// 		//stick it into the .el and stick that into the content div from our home template
// 		$('#content').html(bookmarkItemView.el);
// 	}
// });
// tag.fetch({
// 	success: function() {
// 		//instantiate new one
// 		var tagItemView = new TagItemView({ model: tag });
// 		//render
// 		tagItemView.render();
// 		//stick it into the .el and stick that into the content div from our home template
// 		$('#content').html(tagItemView.el);
// 	}
// });

