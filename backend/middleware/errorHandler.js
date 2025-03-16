const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err.stack); // Log fout naar de serverconsole

  let statusCode = err.status || 500;
  let message = err.message || "Er is een interne serverfout opgetreden.";

  // ✅ Specifieke fouttypes afvangen
  if (err.name === "ValidationError") {
      statusCode = 400;
      message = "Ongeldige invoer. Controleer de velden.";
  }

  if (err.code === "ER_DUP_ENTRY") { // MySQL duplicate entry error
      statusCode = 409;
      message = "Deze gegevens bestaan al in het systeem.";
  }

  if (err.code === "ER_NO_SUCH_TABLE") {
      statusCode = 500;
      message = "Databasefout: ontbrekende tabel.";
  }

  res.status(statusCode).json({
      success: false,
      status: statusCode,
      error: message,
  });
};

export default errorHandler;
