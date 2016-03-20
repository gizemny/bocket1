<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class BookmarksController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return \App\Bookmark::all();
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $bookmark = new \App\Bookmark;
        $bookmark->user_id = \Auth::user()->id;
        $bookmark->url = $request->url;
        $bookmark->save();

        return $bookmark;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return \App\Bookmark::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $bookmark = \App\Bookmark::find($id);
        if ($bookmark->user_id == \Auth::user()->id) {
            $bookmark->url = $request->url;
            $bookmark->save();
        } else {
            return response('Unathorized', 403);
        }
        return $bookmark;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $bookmark = \App\Bookmark::find($id);
        if ($bookmark->user_id == \Auth::user()->id) {
            $bookmark->delete();
        } else {
            return response('Unathorized', 403);
        }
      
        return $bookmark;
    }
}
