######################################################
###### Development
######################################################

dev-api-server:
	@docker-compose up demo-node-api

dev-hasura-console:
	@cd hasura && hasura console --admin-secret="demo-dev-secret"
