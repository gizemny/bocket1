<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
    public function run()
    {
        // Here we are creating a collection of 10 unique App\User models
        $users = factory(App\User::class, 10)->create();
    
        // Here we iterate over the collection of App\User models we just created
        $users->each(function($user) {
    
            // Here were are creating a variable number of App\Bookmark
            // models and associating them with the App\User model
            $bookmarks = factory(App\Bookmark::class, rand(2, 5))->make();
    
            // When we call ->saveMany($bookmarks) on the bookmarks() relationship we
            // persist the models to the database.  The ->saveMany($bookmarks) call
            // also implicitly adds the user_id to each App\Bookmark model
            $user->bookmarks()->saveMany($bookmarks);
    
            // Here were are creating a variable number of App\Tag models
            // and associating them with the App\User model this mirrors
            // what we've just done with App\User and App\Bookmark models
            $tags = factory(App\Tag::class, rand(2, 5))->make();
            $user->tags()->saveMany($tags);
    
            // Here we iterate over the collection of App\Tag models to create
            // the relation ship with the App\Bookmark model this will
            // ultimately populate the bookmark_tag table
            $tags->each(function($tag) use ($bookmarks) {
    
                // Here we create a loop that will run between 1 and 5 times
                for ($i = 0; $i < rand(1, 5); $i++) {
    
                    // Here we create a random index, the number will be between 0 and
                    // the count of the collection of App\Bookmark models minus 1
                    $randomIndex = rand(0, $bookmarks->count() - 1);
    
                    // We are now selecting a random App\Bookmark model from
                    // the collection based on the randomIndex we generated
                    $bookmark = $bookmarks[$randomIndex];
    
                    // This IF block is used to see if the current App\Tag model is already associated
                    // to the random App\Bookmark model, if not it will create and persist the
                    // relationship to the database using the ->attach($tag) call
                    // on the App/Bookmark models ->tags() relationship
                    //
                    // For example if our App\Tag model , $tag, has an id of 2 and
                    // our App\Bookmark model, $bookmark, has an id of 5, an
                    // entry on the bookmark_tag table will be created
                    // with a tag_id of 2 and a bookmark_id of 5
                    if (!$bookmark->bookmarkTags()->where('tag_id', $tag->id)->exists()) {
                        $bookmark->bookmarkTags()->attach($tag);
                    }
                }
            });
        });
    }
}