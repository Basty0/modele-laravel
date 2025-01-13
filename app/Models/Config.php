<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Config extends Model
{
    use HasFactory;

    protected $fillable = [
        'site_name',
        'site_description',
        'site_logo',
        'site_favicon',
        'site_email',
        'site_phone',
        'site_address',
        'social_facebook',
        'social_twitter',
        'social_instagram',
        'social_linkedin',
        'social_youtube',
        'social_tiktok',
        'social_whatsapp',
        'social_telegram',
        'footer_text',

    ];
}