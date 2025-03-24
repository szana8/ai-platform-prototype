up:
	docker compose up -d

bash:
	docker compose exec api bash

nuxt:
	docker compose exec nuxt bash

chat-component:
	docker compose exec chat-component bash