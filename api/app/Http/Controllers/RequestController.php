<?php

namespace App\Http\Controllers;

use App\Actions\Request\CreateNewRequest;
use App\Http\Requests\CreateRequest;

class RequestController extends Controller
{
    public function __invoke(CreateRequest $request, CreateNewRequest $createNewRequest): mixed
    {
        return $createNewRequest->handle($request)->json();
    }
}
