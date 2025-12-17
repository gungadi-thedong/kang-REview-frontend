<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Komentar;
use Illuminate\Http\Request;

class KomentarApiController extends Controller
{
   public function byReview($id)
{
    $comments = Komentar::with('user')
        ->where('id_review', $id)
        ->get();

    return response()->json([
        'success' => true,
        'data' => $comments
    ]);
}


    public function store(Request $request)
    {
        $request->validate([
            'id_review' => 'required',
            'komentar' => 'required'
        ]);

        $comment = Komentar::create([
            'id_review' => $request->id_review,
            'user_id' => auth()->id(),
            'komentar' => $request->komentar
        ]);

        return response()->json([
            'success' => true,
            'data' => $comment->load('user')
        ]);
    }
}
