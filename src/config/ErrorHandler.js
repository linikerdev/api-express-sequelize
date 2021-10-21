class ErrorHandler extends Error {
  constructor(statusCode, message, code = "ERROR") {
    super();
    this.code = code;
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = ErrorHandler;

// PROCURAR DOCUMENTO PARA ORIENTAR OS ALUNOS COM CUSTOM ERROR
