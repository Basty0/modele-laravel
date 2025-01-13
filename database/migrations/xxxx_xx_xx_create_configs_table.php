use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConfigsTable extends Migration
{
public function up()
{
Schema::create('configs', function (Blueprint $table) {
$table->id();
$table->string('site_name')->nullable();
$table->text('site_description')->nullable();
$table->string('site_logo')->nullable();
$table->string('site_favicon')->nullable();
$table->string('site_email')->nullable();
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
$table->text('footer_text')->nullable();
$table->timestamps();
});
}

public function down()
{
Schema::dropIfExists('configs');
}
}
