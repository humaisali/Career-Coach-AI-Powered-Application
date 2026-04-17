const pdfParse = require('pdf-parse');
const { AppError } = require('./AppError');

/**
 * Extracts raw text from a PDF buffer.
 * @param {Buffer} buffer - PDF file buffer from multer
 * @returns {Promise<string>} Extracted text content
 */
async function extractTextFromPDF(buffer) {
  try {
    const data = await pdfParse(buffer);
    return data.text?.trim() || '';
  } catch (err) {
    throw new AppError({
      status: 400,
      code: 'INVALID_PDF',
      message: 'Resume PDF could not be read. Please upload a valid PDF file.',
      cause: err,
    });
  }
}

module.exports = { extractTextFromPDF };
