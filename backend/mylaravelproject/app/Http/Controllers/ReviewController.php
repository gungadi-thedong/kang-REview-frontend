<?php

namespace App\Http\Controllers;

use App\Models\Review;

class ReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::all(); // Fetch from MySQL (XAMPP)
        return view('review.index', compact('reviews'));
    }
}
