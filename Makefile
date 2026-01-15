migrate-dev:
	@echo "Usage: make migrate-dev [migration_name]"
	@echo "Creates a migration with the specified name"
	@echo "Example: make migrate-dev init"
	@echo
	@npx prisma generate
	@read -p "Enter migration name: " migration_name; \
	if [ -z "$$migration_name" ]; then \
		echo "Migration name cannot be empty"; \
	else \
		npx prisma migrate dev --create-only --name $$migration_name; \
		npx prisma migrate dev; \
	fi