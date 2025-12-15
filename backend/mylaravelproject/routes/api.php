<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

use App\Http\Controllers\Api\ReviewApiController;

// Public Review APIs
Route::get('/reviews', [ReviewApiController::class, 'index']);
Route::get('/reviews/{id}', [ReviewApiController::class, 'show']);
Route::get('/featured-reviews', [ReviewApiController::class, 'featured']);




Route::apiResource('products', ProductController::class);



Route::get('/test', function () {
    return response()->json(['message' => 'API working!']);
});

