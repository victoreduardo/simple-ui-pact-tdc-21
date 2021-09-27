# Metric UI

### Link UI
* `http://localhost:3001`

### To run the app

* `make up`

### To run all tests

* `make test`

### To turn off the app

* `make down`


### Run Pact tests
NOTE: Turn the API off before to start. (working only local environment)
* To run pact tests: run `yarn test_pact` on the UI side
* Stop the test process on the UI side
* Turn the API on: run `make up` on the API side
* To publish the contract: run `npm run publish:pact` on the UI side
* To verify the contract: run `make pact_verify` on the API side
