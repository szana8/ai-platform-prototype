<?php

use App\Helpers\ProcessStreamHelper;
use App\Http\Controllers\Auth\UserAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/chat', function (Request $request) {
    if ($request->get("stream", false) === false) {
        $response = Http::withHeaders(['Content-Type' => 'application/json'])->post('http://langflow:7860/api/v1/run/1570a19c-f16a-445f-bc7c-8a10f369c80c?stream=false', 
        [
            "input_value" => $request->input_value,
            "output_type" => $request->output_type,
            "input_type" => $request->input_type
        ]);

        return $response->json();
    }
    else {
        ob_start();
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
    
            ProcessStreamHelper::processStream($response->getBody(), function($data) {
                echo json_encode(["data" => $data]);
                flush();
                ob_flush();
            });
    
        }, 200, [
            'Content-Type' => 'text/event-stream',
            'Cache-Control' => 'no-cache',
            'Connection' => 'keep-alive',
            'Transfer-Encoding' => 'chunked'
        ]);
    }
    

});
