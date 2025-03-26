from fastapi import FastAPI
from pydantic import BaseModel
from diffusers import StableDiffusionPipeline
import torch

# Load the Apple CoreML-optimized Stable Diffusion model
model_id = "runwayml/stable-diffusion-v1-5"
pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipe.to("mps")  # Use Metal Performance Shaders (MPS) for Apple Silicon

app = FastAPI()

class PromptRequest(BaseModel):
    prompt: str

@app.post("/generate")
async def generate_image(request: PromptRequest):
    image = pipe(request.prompt).images[0]
    image_path = f"/output/generated.png"
    image.save(image_path)
    return {"image_url": image_path}