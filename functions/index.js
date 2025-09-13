/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const axios = require('axios');
const cors = require('cors')({origin: true});

admin.initializeApp();
const db = admin.firestore();
const storage = admin.storage();

// Multer setup for file uploads
const upload = multer({storage: multer.memoryStorage()});

// Helper: Parse DOCX buffer to text
async function parseDocx(buffer) {
  // Placeholder: Use a library or service to extract text from DOCX
  // For now, just return a string indicating this is a DOCX file
  return '[DOCX parsing not implemented]';
}

// Helper: Fetch LinkedIn/Portfolio data (placeholder)
async function fetchProfileData(url) {
  // In production, use LinkedIn API or scraping (if allowed)
  // For now, just return a string
  return `Fetched data from ${url}`;
}

// Helper: Call Gemini API (replace with your endpoint/key)
async function callGeminiAPI(text, userInfo) {
  // Replace with your Gemini API endpoint and key
  const GEMINI_API_URL = 'https://api.gemini.com/v1/generate-profile';
  const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';
  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        text,
        userInfo,
      },
      {
        headers: {
          Authorization: `Bearer ${GEMINI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error('Gemini API error: ' + error.message);
  }
}

// Main HTTP function
exports.joinSynergyX = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({error: 'Method not allowed'});
    }
    // Use multer to handle multipart/form-data
    upload.single('resume')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({error: 'File upload error'});
      }
      try {
        const {name, email, role, linkedinUrl, portfolioUrl} = req.body;
        let resumeText = '';
        let source = '';
        // 1. Parse resume file if provided
        if (req.file) {
          source = 'resume';
          if (req.file.mimetype === 'application/pdf') {
            const pdfData = await pdfParse(req.file.buffer);
            resumeText = pdfData.text;
          } else if (
            req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            req.file.mimetype === 'application/msword'
          ) {
            resumeText = await parseDocx(req.file.buffer);
          } else {
            throw new Error('Unsupported file type');
          }
        } else if (linkedinUrl) {
          source = 'linkedin';
          resumeText = await fetchProfileData(linkedinUrl);
        } else if (portfolioUrl) {
          source = 'portfolio';
          resumeText = await fetchProfileData(portfolioUrl);
        } else {
          throw new Error('No resume or profile URL provided');
        }

        // 2. Call Gemini API to generate structured profile
        const geminiProfile = await callGeminiAPI(resumeText, {name, email, role});

        // 3. Store user profile in Firestore
        const userRef = db.collection('users').doc();
        const profileRef = db.collection('profiles').doc(userRef.id);
        const userProfile = {
          ...geminiProfile,
          name,
          email,
          role,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          source,
        };
        await userRef.set(userProfile);
        await profileRef.set(userProfile);

        // 4. Store resume in Storage (if uploaded)
        let resumeUrl = '';
        if (req.file) {
          const bucket = storage.bucket();
          const filePath = `resumes/${userRef.id}/${Date.now()}_${req.file.originalname}`;
          const file = bucket.file(filePath);
          await file.save(req.file.buffer, {
            metadata: {contentType: req.file.mimetype},
          });
          resumeUrl = await file.getSignedUrl({action: 'read', expires: '03-09-2491'});
        }

        // 5. Return success response
        return res.status(200).json({
          success: true,
          profile: userProfile,
          resumeUrl,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({error: error.message});
      }
    });
  });
});
