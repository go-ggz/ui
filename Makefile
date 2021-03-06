GO ?= go

.PHONY: generate
generate:
	@which fileb0x > /dev/null; if [ $$? -ne 0 ]; then \
		$(GO) get -u github.com/UnnoTed/fileb0x; \
	fi
	$(GO) generate ./...

.PHONY: install
install:
	yarn install

.PHONY: serve
serve:
	yarn run serve

.PHONY: build
build:
	yarn run build

.PHONY: release
release: install build generate

clean:
	rm -rf dist/files
