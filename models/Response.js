class Response {
  constructor(status, message = "", data = null) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

module.exports = Response;

/*  Status
    200 : Success
    201 : Created
    202 : Deleted

    400 : Incorrect password
    401 : Bad request
    402 : Not activated
    404 : Not found

    500 : Token expired
*/
