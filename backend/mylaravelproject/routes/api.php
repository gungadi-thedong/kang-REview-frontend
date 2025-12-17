<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Api\KomentarApiController;
use App\Http\Controllers\Api\ReviewApiController;
use App\Http\Controllers\Api\AuthController;

// Public Review APIs
Route::get('/reviews', [ReviewApiController::class, 'index']);
Route::get('/reviews/{id}', [ReviewApiController::class, 'show']);
Route::get('/featured-reviews', [ReviewApiController::class, 'featured']);

Route::get('/reviews/{id}/comments', [KomentarApiController::class, 'byReview']);
Route::post('/comments', [KomentarApiController::class, 'store'])->middleware('auth:sanctum');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::apiResource('products', ProductController::class);
Route::middleware(['auth:sanctum', 'role:admin,author'])->group(function () {
    Route::post('/reviews', [ReviewApiController::class, 'store']);
    Route::put('/reviews/{id}', [ReviewApiController::class, 'update']);
    Route::delete('/reviews/{id}', [ReviewApiController::class, 'destroy']);
});



Route::get('/test', function () {
    return response()->json(['message' => 'API working!']);
});

