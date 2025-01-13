<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Users/Index', [
            'users' => User::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', Rules\Password::defaults()],
            'role' => 'required|in:admin,user',
            'image' => 'nullable|image|max:1024'
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path(''), $fileName);
            $validated['image'] = $fileName;
        }

        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);

        return redirect()->back();
    }

    public function update(Request $request, User $user)
    {
        // dd([
        //     'request_all' => $request->all(),
        //     'files' => $request->allFiles(),
        //     'method' => $request->method(),
        //     'user' => $user
        // ]);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'role' => 'required|in:admin,user',
            'image' => 'nullable|image|max:1024'
        ]);

        if ($request->hasFile('image')) {
            if ($user->image && $user->image !== 'profile.jpeg') {
                unlink(public_path($user->image));
            }
            $file = $request->file('image');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path(''), $fileName);
            $validated['image'] = $fileName;
        }

        $user->update($validated);

        return redirect()->back();
    }

    public function destroy(User $user)
    {
        if ($user->image && $user->image !== 'profile.jpeg') {
            unlink(public_path($user->image));
        }
        $user->delete();

        return redirect()->back();
    }
}
