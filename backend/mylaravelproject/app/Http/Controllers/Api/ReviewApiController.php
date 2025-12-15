<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewApiController extends Controller
{
    // Return all reviews
    public function index()
    {
        $reviews = Review::all()->map(function ($review) {
            // Build full image URLs
            $review->gambar_1 = asset('storage/' . $review->gambar_1);
            $review->gambar_2 = asset('storage/' . $review->gambar_2);
            return $review;
        });

        return response()->json([
            'success' => true,
            'data' => $reviews
        ]);
    }

    // Return a single review
    public function show($id)
    {
        $review = Review::findOrFail($id);

        $review->gambar_1 = asset('storage/' . $review->gambar_1);
        $review->gambar_2 = asset('storage/' . $review->gambar_2);

        return response()->json([
            'success' => true,
            'data' => $review
        ]);
    }

    // Optional: featured reviews
    public function featured()
    {
        // Example: featured if rating >= 4
        $featured = Review::where('rating', '>=', 4)->get()->map(function ($review) {
            $review->gambar_1 = asset('storage/' . $review->gambar_1);
            $review->gambar_2 = asset('storage/' . $review->gambar_2);
            return $review;
        });

        return response()->json([
            'success' => true,
            'data' => $featured
        ]);
    }
}
