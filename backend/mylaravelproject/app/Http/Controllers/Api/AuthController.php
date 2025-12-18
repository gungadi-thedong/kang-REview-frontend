<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Login;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;




class AuthController extends Controller
{
    public function register(Request $request)
{
    $request->validate([
        'nama_user' => 'required|string|max:100',
        'email' => 'required|email|unique:user,email',
        'username' => 'required|string|unique:login,username',
        'password' => 'required|string|min:6',
    ]);

    DB::beginTransaction();

    try {
        // 1️⃣ Insert into user table
        $idUser = DB::table('user')->insertGetId([
            'nama_user' => $request->nama_user,
            'email' => $request->email,
        ]);

        // 2️⃣ Insert into login table
        DB::table('login')->insert([
            'username'   => $request->username,
            'id_user'    => $idUser,
            'password'   => Hash::make($request->password),
            'permission' => 'user',
        ]);

        DB::commit();

        return response()->json([
            'message' => 'Registrasi berhasil',
            'id_user' => $idUser, // optional
        ], 201);

    } catch (\Exception $e) {
        DB::rollBack();

        return response()->json([
            'message' => 'Registrasi gagal',
            'error' => $e->getMessage(),
        ], 500);
    }
}

    public function login(Request $request)
{
    $request->validate([
        'username' => 'required',
        'password' => 'required',
    ]);

    $login = Login::with('user')
        ->where('username', $request->username)
        ->first();

    if (!$login || !Hash::check($request->password, $login->password)) {
        return response()->json([
            'message' => 'Invalid credentials'
        ], 401);
    }

    $token = $login->user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'token' => $token,
        'permission' => $login->permission,
        'user' => [
            'id_user' => $login->user->id_user,
            'nama_user' => $login->user->nama_user,
            'email' => $login->user->email,
        ]
    ]);
}
}
