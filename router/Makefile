GenSuperGraph:
	rover supergraph compose --config ./rover.yaml --output ./supergraph.graphql

DownloadRouter:
	curl -sSL https://router.apollo.dev/download/nix/latest | sh

StartRouter:
	./router --supergraph ./supergraph.graphql --config config.yaml

StartRouterDev:
	./router --dev --supergraph ./supergraph.graphql --log trace --config config.yaml