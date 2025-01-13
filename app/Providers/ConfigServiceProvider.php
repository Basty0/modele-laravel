<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Config;
use Inertia\Inertia;

class ConfigServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
        // // Récupérer les données de la table Config
        // $config = Config::first();

        // // Partager les données avec toutes les vues Inertia
        // Inertia::share('config', $config);
    }
}
