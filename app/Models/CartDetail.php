<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartDetail extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function cartHeader(){
        return $this->belongsTo(CartHeader::class);
    }

    public function product(){
        return $this->belongsTo(Product::class);
    }
}
