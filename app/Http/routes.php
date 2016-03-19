<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});
// Route::resource('bookmarks', 'BookmarksController', [
//     'except' => ['edit', 'create']
// ]);
// Route::resource('tags', 'TagsController', [
//     'except' => ['edit', 'create']
// ]);
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
    Route::auth();

    Route::get('/home', 'HomeController@index');

});

Route::group(['middleware' => 'web'], function () {
    Route::auth();
    
    Route::resource('bookmarks', 'BookmarksController', [
		'only' => ['store', 'update','destroy']
    ]);
    Route::resource('tags', 'TagsController', [
		'only' => ['store', 'update','destroy']
    ]);

    Route::get('/home', 'HomeController@index');
});
