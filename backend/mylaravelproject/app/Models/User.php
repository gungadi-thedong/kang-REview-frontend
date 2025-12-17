<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class User extends Model
{
    use HasApiTokens;

    protected $table = 'user';          // ✅ correct table
    protected $primaryKey = 'id_user';  // ✅ correct PK

    public $timestamps = false;         // ❌ no created_at / updated_at

    protected $fillable = [
        'nama_user',
        'email',
    ];
}
