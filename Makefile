GO ?= go

.PHONY: generate
generate:
	@which fileb0x > /dev/null; if [ $$? -ne 0 ]; then \
		$(GO) get -u github.com/UnnoTed/fileb0x; \
	fi
	$(GO) generate ./...

serve:
	yarn run serve

clean:
	rm -rf dist/files
