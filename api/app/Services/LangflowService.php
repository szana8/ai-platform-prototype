<?php
namespace App\Services;

use App\Models\Request;
use Illuminate\Http\Client\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class LangflowService
{
    public static function send(Request $request): Response  
    {
        Log::info("URL:", ['url' => config('langflow.url').":".config('langflow.port')."/api/v1/run/".$request->flow_id."?stream=false"]);

        $response = Http::withHeaders(config('langflow.headers'))
        ->post(config('langflow.url').":".config('langflow.port')."/api/v1/run/".$request->flow_id."?stream=false", json_decode($request->request, true));

        return $response;
    }

    protected function calculateTweaks(array $body, Request $request): array
    {
        if ( $request->tweaks['llm']) {
            $body['OllamaModel-xubxA'] = [
                "model_name" => $request->tweaks['llm'],
            ];
        }
    
        if ($request->tweaks['systemPrompt']) {
            $body['Prompt-3KHBe'] = [
                "template" => $request->tweaks['systemPrompt'],
            ];
        }

        return $body;
    }
}