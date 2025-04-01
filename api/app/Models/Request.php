<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Request extends Model
{
    /** @use HasFactory<\Database\Factories\RequestFactory> */
    use HasFactory, HasUuids;

    public $fillable = [
        'flow_id', 'request', 'stream', 'user_id'
    ];

    public function setRequestAttribute($value): void
    {
        $this->attributes['request'] = json_encode($value);
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
