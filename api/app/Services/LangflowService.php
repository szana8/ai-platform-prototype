<?php

namespace App\Services;

use App\Models\Request;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class LangflowService
{
    public static function send(Request $request): Response
    {
        $stream = $request->stream ? 'true' : 'false';

        Log::info('URL:', ['url' => config('langflow.url').':'.config('langflow.port').'/api/v1/run/'.$request->flow_id.'?stream='.$stream.'']);

        $headers = config('langflow.headers') + ['stream' => $request->stream];

        $response = Http::withHeaders($headers)
            ->post(config('langflow.url').':'.config('langflow.port').'/api/v1/run/'.$request->flow_id.'?stream='.$stream.'', json_decode($request->request, true));

        return $response;
    }

    protected function calculateTweaks(array $body, Request $request): array
    {
        if ($request->tweaks['llm']) {
            $body['OllamaModel-xubxA'] = [
                'model_name' => $request->tweaks['llm'],
            ];
        }

        if ($request->tweaks['systemPrompt']) {
            $body['Prompt-3KHBe'] = [
                'template' => $request->tweaks['systemPrompt'],
            ];
        }

        return $body;
    }
}
