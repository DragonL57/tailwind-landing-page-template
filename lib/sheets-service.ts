import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;

let doc: GoogleSpreadsheet | null = null;

async function getSheet() {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    throw new Error("Google Sheets credentials not configured");
  }

  if (!SPREADSHEET_ID) {
    throw new Error("Google Sheets ID not configured");
  }

  if (!doc) {
    const rawKey = process.env.GOOGLE_PRIVATE_KEY!;
    const privateKey = rawKey.replace(/\\n/g, "\n").replace(/^["']|["']$/g, "");

    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);

    try {
      await doc.loadInfo();
    } catch (err) {
      console.error("[SHEETS] Failed to load doc info:", err);
      throw err;
    }
  }

  const sheet = doc.sheetsByIndex[0];
  if (!sheet) {
    throw new Error("No worksheets found in the spreadsheet");
  }
  return sheet;
}

export interface LeadRecord {
  name: string;
  email: string;
  phone: string;
  industry: string;
  goals: string;
  currentLevel: string;
  targetLevel: string;
  gapHours: number;
  packageLabel: string;
  grandTotal: number;
  grandMax: number;
  
  // Part 1
  p1_total: number;
  p1_pronunciation: number;
  p1_fluency: number;
  p1_prosody: number;
  p1_completeness: number;
  p1_overall: number;

  // Part 2
  p2_total: number;
  p2_vocabulary: number;
  p2_grammar: number;
  p2_questionHandling: number;
  p2_pronunciation: number;
  p2_fluency: number;

  submittedAt: string;
}

export async function appendLeadToSheet(data: LeadRecord) {
  try {
    const sheet = await getSheet();
    
    const headers = [
      "Name", "Email", "Phone", "Industry", "Goals", 
      "CurrentLevel", "TargetLevel", "GapHours", "Package", 
      "TotalScore", "MaxScore",
      "P1_Total", "P1_Pronunciation", "P1_Fluency", "P1_Prosody", "P1_Completeness", "P1_Overall",
      "P2_Total", "P2_Vocabulary", "P2_Grammar", "P2_QuestionHandling", "P2_Pronunciation", "P2_Fluency",
      "SubmittedAt"
    ];

    try {
      await sheet.loadHeaderRow();
      // If we need to update headers (simple check), we re-set them
      if (sheet.headerValues.length < headers.length) {
        await sheet.setHeaderRow(headers);
      }
    } catch (e) {
      await sheet.setHeaderRow(headers);
    }

    await sheet.addRows([
      {
        Name: data.name,
        Email: data.email,
        Phone: data.phone,
        Industry: data.industry,
        Goals: data.goals,
        CurrentLevel: data.currentLevel,
        TargetLevel: data.targetLevel,
        GapHours: data.gapHours,
        Package: data.packageLabel,
        TotalScore: data.grandTotal,
        MaxScore: data.grandMax,
        
        P1_Total: data.p1_total,
        P1_Pronunciation: data.p1_pronunciation,
        P1_Fluency: data.p1_fluency,
        P1_Prosody: data.p1_prosody,
        P1_Completeness: data.p1_completeness,
        P1_Overall: data.p1_overall,

        P2_Total: data.p2_total,
        P2_Vocabulary: data.p2_vocabulary,
        P2_Grammar: data.p2_grammar,
        P2_QuestionHandling: data.p2_questionHandling,
        P2_Pronunciation: data.p2_pronunciation,
        P2_Fluency: data.p2_fluency,

        SubmittedAt: data.submittedAt,
      },
    ]);

    return true;
  } catch (error) {
    console.error("[SHEETS] Error appending lead:", error);
    throw error;
  }
}
