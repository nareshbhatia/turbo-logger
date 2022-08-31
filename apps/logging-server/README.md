# Logging Server

The logging server receives JSON formatted logs from the turbo-logger-demo app
and writes them to `src/routes/data/elastic-search.log` in ndjson format.

To allow logs to reach the logging server, comment out the `MOCK_LOGGER_PATH`
handler in turbo-logger-demo (see `turbo-logger-demo/src/mocks/handlers.ts`).

To upload the logs to elastic search execute the following command:

```shell
curl -u elastic:379IYWIXEmI5xSNppl6PPKhX -H "Content-type:application/x-ndjson" -XPOST https://elasticsearch-training.es.us-central1.gcp.cloud.es.io/logs/_bulk --data-binary "@elastic-search.log"
```
