<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateRequest;
use App\Models\Request;
use App\Services\LangflowService;

class RequestController extends Controller
{
    public function __invoke(CreateRequest $request): mixed
    {
        $savedRequest = Request::create([
            'flow_id' => $request->flow_id,
            'request' => $request->body,
            'user_id' => auth()->user()->getAuthIdentifier(),
            'stream' => false,
        ]);

        $response = LangflowService::send($savedRequest);

        return $response->json();
    }
}
