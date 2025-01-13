<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('configs', function (Blueprint $table) {
            $table->id();
            $table->string('site_name');
            $table->string('site_description')->nullable();
            $table->string('site_logo')->default('logo.png');
            $table->string('site_favicon')->default('favicon.ico');
            $table->string('site_email');
            $table->string('site_phone')->nullable();
            $table->string('site_address')->nullable();
            $table->string('social_facebook')->nullable();
            $table->string('social_twitter')->nullable();
            $table->string('social_instagram')->nullable();
            $table->string('social_linkedin')->nullable();
            $table->string('social_youtube')->nullable();
            $table->string('social_tiktok')->nullable();
            $table->string('social_whatsapp')->nullable();
            $table->string('social_telegram')->nullable();
            $table->string('footer_text')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('configs');
    }
};
