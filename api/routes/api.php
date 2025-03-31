<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

use Illuminate\Support\Str;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/chat', function (Request $request) {
    $body = [
        "input_value" => $request->input_value,
        "output_type" => $request->output_type,
        "input_type" => $request->input_type,
        "session_id" => session_id(),
    ];

    if ( $request->tweaks['llm']) {
        $body['OllamaModel-xubxA'] = [
            "model_name" => $request->tweaks['llm'],
        ];
    }

    if ( $request->tweaks['systemPrompt']) {
        $body['Prompt-3KHBe'] = [
            "template" => $request->tweaks['systemPrompt'],
        ];
    }

    $response = Http::withHeaders(['Content-Type' => 'application/json'])->post('http://langflow:7860/api/v1/run/generic-text-chatbot?stream=false', $body);    
    return $response->json();
})->withoutMiddleware(['sanctum:auth']);


Route::post('/text-to-image', function (Request $request) {
    $body = [
        "input_value" => $request->input_value,
        "output_type" => $request->output_type,
        "input_type" => $request->input_type,
        "session_id" => session_id(),
    ];

    $response = Http::withHeaders(['Content-Type' => 'application/json'])->post('http://langflow:7860/api/v1/run/text-to-image', $body);   
    
    Log::error("Response", [$response]);

    return $response->json();
})->withoutMiddleware(['sanctum:auth']);