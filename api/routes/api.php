<?php

use App\Http\Controllers\Auth\UserAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/chat', function (Request $request) {
    Log::info("S", [$request->all()]);

    if ($request->get("stream", false) === false) {
        $response = Http::withHeaders(['Content-Type' => 'application/json'])->post('http://langflow:7860/api/v1/run/1570a19c-f16a-445f-bc7c-8a10f369c80c?stream=false', 
        [
            "input_value" => $request->input_value,
            "output_type" => $request->output_type,
            "input_type" => $request->input_type
        ]);

        return $response->json();
    }

    return response()->stream(function () use ($request) {
        $response = Http::withOptions(['stream' => true])
        ->withHeaders([
            'Accept' => 'text/event-stream',
            'Content-Type' => 'application/json',
        ])
        ->post('http://langflow:7860/api/v1/run/1570a19c-f16a-445f-bc7c-8a10f369c80c?stream=true', [
            "input_value" => $request->input_value,
            "output_type" => $request->output_type,
            "input_type" => $request->input_type
        ]);

        $body = $response->toPsrResponse()->getBody();

        while (!$body->eof()) {
            $res = $body->read(4096); // Read in chunks
            Log::info("Body", [$res]);
            echo $res;
            flush();
            ob_flush(); // Ensure output is sent immediately
        }
    }, 200, [
        'Content-Type' => 'text/event-stream',
        'Cache-Control' => 'no-cache',
        'Connection' => 'keep-alive',
    ]);

})->middleware('auth:sanctum');
