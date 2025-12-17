<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Login extends Model
{
    protected $table = 'login';
    protected $primaryKey = 'id_login'; // if exists

    public $timestamps = false;

    protected $fillable = [
        'username',
        'id_user',
        'password',
        'permission',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }
}
