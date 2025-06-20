<?php

namespace App\Actions\Request;

use App\Http\Requests\CreateRequest;
use App\Models\Request;
use App\Services\LangflowService;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\StreamedResponse;

final readonly class CreateNewRequest
{
    public function handle(CreateRequest $request): mixed
    {
        $request = Request::create(attributes: [
            'flow_id' => $request->flow_id,
            'request' => $request->body,
            'user_id' => auth()->user()->getAuthIdentifier(),
            'stream' => $request->get('stream', false),
        ]);

        $response = $this->sendToLangflow(request: $request);

        $this->notify(request: $request);

        if ($request->stream) {
            return $this->streamResponse(response: $response);
        }

        return $response->json();
    }

    private function notify(Request $request): void
    {
        // Broadcast notificaton ...
    }

    private function sendToLangflow($request): Response
    {
        return LangflowService::send($request);
    }

    private function streamResponse(Response $response): StreamedResponse
    {
        ob_start();
        return response()->eventStream(callback: function () use ($response) {
            $stream = $response->getBody();
            $content = $stream instanceof \Psr\Http\Message\StreamInterface
                ? $stream->getContents()
                : (string) $stream;

            $jsonObjects = explode("\n", $content);

            foreach ($jsonObjects as $jsonString) {
                if (empty(trim($jsonString))) {
                    continue;
                }

                try {
                    $data = json_decode($jsonString, true);
                    if ($data && isset($data['event'])) {
                        // You might only want to yield specific event types
                        if ($data['event'] === 'token') {
                            yield ['text' => $data['data']['chunk']];
                        } elseif ($data['event'] === 'add_message') {
                            // Handle message events if needed
                            //yield ['message' => $data['data']];
                        }
                        ob_flush();
                    }
                } catch (\Exception $e) {
                    Log::error('Failed to parse stream data: '.$e->getMessage());
                }
            }
        });
    }
}
