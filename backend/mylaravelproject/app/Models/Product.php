<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'description', 'price', 'stock'];

    // Relasi: satu produk punya banyak review
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
