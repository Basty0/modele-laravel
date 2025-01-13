<?php

namespace App\Http\Controllers;

use App\Models\Config;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ConfigController extends Controller
{
    public function edit()
    {
        $config = Config::first() ?? new Config();
        return Inertia::render('Config/Edit', [
            'config' => $config
        ]);
    }

    public function update(Request $request)
    {
        $config = Config::first() ?? new Config();

        // Gérer le logo
        if ($request->hasFile('site_logo')) {
            if ($config->site_logo && Storage::disk('public')->exists($config->site_logo)) {
                Storage::disk('public')->delete($config->site_logo);
            }

            $file = $request->file('site_logo');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path(''), $fileName);
            $config->site_logo = $fileName;
        }

        // Gérer le favicon
        if ($request->hasFile('site_favicon')) {
            if ($config->site_favicon && Storage::disk('public')->exists($config->site_favicon)) {
                Storage::disk('public')->delete($config->site_favicon);
            }

            $file = $request->file('site_favicon');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path(''), $fileName);
            $config->site_favicon = $fileName;
        }

        // Mettre à jour les autres champs
        $config->site_name = $request->input('site_name', $config->site_name);
        $config->site_description = $request->input('site_description', $config->site_description);
        $config->site_email = $request->input('site_email', $config->site_email);
        $config->site_phone = $request->input('site_phone', $config->site_phone);
        $config->site_address = $request->input('site_address', $config->site_address);
        $config->social_facebook = $request->input('social_facebook', $config->social_facebook);
        $config->social_twitter = $request->input('social_twitter', $config->social_twitter);
        $config->social_instagram = $request->input('social_instagram', $config->social_instagram);
        $config->social_linkedin = $request->input('social_linkedin', $config->social_linkedin);
        $config->social_youtube = $request->input('social_youtube', $config->social_youtube);
        $config->social_tiktok = $request->input('social_tiktok', $config->social_tiktok);
        $config->social_whatsapp = $request->input('social_whatsapp', $config->social_whatsapp);
        $config->social_telegram = $request->input('social_telegram', $config->social_telegram);
        $config->footer_text = $request->input('footer_text', $config->footer_text);

        $config->save();

        return redirect()->back()->with('message', 'Configuration mise à jour avec succès.');
    }
}