<?php

namespace App\Actions\Request;

use App\Http\Requests\CreateRequest;
use App\Models\Request;
use App\Services\LangflowService;
use Illuminate\Http\Client\Response;

final readonly class CreateNewRequest
{
    public function handle(CreateRequest $request): Response
    {
        $request = Request::create([
            'flow_id' => $request->flow_id,
            'request' => $request->body,
            'user_id' => auth()->user()->getAuthIdentifier(),
            'stream' => false,
        ]);

        $response = $this->sendToLangflow($request);

        $this->notify($request);

        return $response;
    }

    private function notify(Request $request): void
    {
        // broadcast($request);
    }

    private function sendToLangflow($request): Response
    {
        return LangflowService::send($request);
    }
}