<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $table = 'review';        // singular table
    protected $primaryKey = 'id_review'; // non-standard PK
    public $timestamps = false;          // no created_at / updated_at

    protected $fillable = [
        'id_user',
        'id_produk',
        'judul',
        'paragraf_buka',
        'gambar_1',
        'paragraf_jelaskan',
        'paragraf_tutup',
        'gambar_2',
    ];
}
