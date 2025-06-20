<?php

use App\Http\Controllers\RequestController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Flow specific routes
Route::middleware(['auth:sanctum'])
    ->as('flow')
    ->prefix('flow')
    ->group(function () {
        Route::post('run', RequestController::class)->name('run_flow');
    });
