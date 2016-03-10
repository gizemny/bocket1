<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bookmark extends Model
{
    /**
     * Get the user of this bookmark.
     */
    public function user() {
        return $this->belongsTo('App\User');
    }
    /**
     * Get the user of this bookmark.
     */
    public function tags() {
        return $this->hasMany('App\Tag');
    }    
    /**
     * Get the tags of this bookmark.
     */
    public function bookmarkTags() {
        return $this->belongsToMany('App\Tag');
    }     
}
