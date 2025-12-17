<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Login;
use App\Models\User;

use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
{
    $request->validate([
        'nama_user' => 'required',
        'email' => 'required|email|unique:user,email',
        'username' => 'required|unique:login,username',
        'password' => 'required|min:6',
    ]);

    $user = User::create([
        'nama_user' => $request->nama_user,
        'email' => $request->email,
    ]);

    Login::create([
        'username' => $request->username,
        'id_user' => $user->id_user,
        'password' => Hash::make($request->password),
        'permission' => 'user',
    ]);

    return response()->json([
        'message' => 'Registered successfully',
    ]);
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
