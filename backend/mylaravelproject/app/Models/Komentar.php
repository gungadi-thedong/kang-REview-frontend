<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Komentar extends Model
{
    protected $table = 'komentar';
    protected $primaryKey = 'id_komentar';
    public $timestamps = false;

    protected $fillable = [
        'id_review',
        'id_user',
        'komentar'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function review()
    {
        return $this->belongsTo(Review::class, 'id_review');
    }
}

