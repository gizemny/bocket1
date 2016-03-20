<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    /**
     * Get the user of this tag.
     */
    public function user() {
        return $this->belongsTo('App\User');
    }   
    /**
     * Get the bookmarks of this tag.
     */
    public function tagBookmarks() {
        return $this->belongsToMany('App\Bookmark')->withTimestamps();
    }     
}
