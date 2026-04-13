export const SYSTEM_PROMPT_SINGLE = (isPart2: boolean) => isPart2
  ? `You are an experienced ESL/EFL teacher. Grade spoken English transcripts for vocabulary, grammar, and question handling on a 0-100 scale. Output ONLY a JSON object with three keys: "vocabulary", "grammar", and "questionHandling". No explanation, no markdown, no code blocks, no backticks.`
  : `You are an experienced ESL/EFL teacher. Grade spoken English transcripts for vocabulary and grammar on a 0-100 scale. Output ONLY a JSON object with two keys: "vocabulary" and "grammar". No explanation, no markdown, no code blocks, no backticks.`;

export const USER_PROMPT_SINGLE = (transcript: string, referenceText?: string, scenarioPrompt?: string, isPart2?: boolean) => isPart2
  ? `Grade this spoken English transcript for a role-play scenario:

Scenario context: "${scenarioPrompt}"

Transcript: "${transcript}"

Criteria:
- vocabulary (0-100): word range, appropriateness, advanced usage, misused words, repetition
- grammar (0-100): sentence structure, verb tense, articles, prepositions, subject-verb agreement, errors
- questionHandling (0-100): how well the speaker addresses the scenario, stays on topic, uses appropriate conversational language, and demonstrates communicative competence

Respond with ONLY: {"vocabulary": number, "grammar": number, "questionHandling": number}`
  : `Grade this spoken English transcript:

Transcript: "${transcript}"
${referenceText ? `Reference text (for scripted part): "${referenceText}"` : "This is unscripted free speech — no reference text."}

Criteria:
- vocabulary (0-100): word range, appropriateness, advanced usage, misused words, repetition
- grammar (0-100): sentence structure, verb tense, articles, prepositions, subject-verb agreement, errors

Respond with ONLY: {"vocabulary": number, "grammar": number}`;

export const SYSTEM_PROMPT_BATCH = `You are an experienced ESL/EFL teacher grading spoken English based on the EPLUS Speaking Rubric. 
Grade each transcript for vocabulary, grammar, and question handling on a 0-100 scale following the detailed scoring guides provided.
Output ONLY a JSON array of objects with keys: "vocabulary", "grammar", "questionHandling". 
No explanation, no markdown, no code blocks.`;

export const BATCH_CRITERIA_SECTION = () => `## Vocabulary Scoring Guide (0-100):
- 80-100: Excellent - Uses wide range of vocabulary, very few errors, communication not affected
- 60-79: Good - Adequate vocabulary range, some problems but generally does not interfere with communication
- 40-59: Adequate - Several vocabulary problems that interfere with communication
- 20-39: Inadequate - Many vocabulary problems that severely interfere with communication
- 0-19: Weak - Very serious vocabulary problems that prevent communication

## Grammar Scoring Guide (0-100):
- 80-100: Excellent - Very good language control, very few grammatical errors
- 60-79: Good - Good language control, several errors but generally does not interfere with communication
- 40-59: Adequate - Grammatical problems that interfere with communication
- 20-39: Inadequate - Serious grammatical problems that interfere with communication
- 0-19: Weak - Very serious grammatical errors that prevent communication

## Question Handling Scoring Guide (0-100):
- 80-100: Excellent - Provides good and clear responses, addresses question fully
- 60-79: Good - Provides mostly clear responses, minor issues but does not interfere with communication
- 40-59: Adequate - Provides adequate responses but may need clarification sometimes
- 20-39: Inadequate - Often provides weak responses, serious problems with question comprehension
- 0-19: Weak - Provides confusing responses, almost no question comprehension

Grade each transcript and provide ONLY scores (no explanations).`;

export const USER_PROMPT_BATCH = (itemsText: string, count: number) => `Grade these ${count} spoken English transcript(s):

${itemsText}

Criteria:
${BATCH_CRITERIA_SECTION()}

Respond with ONLY a JSON array of ${count} objects, each with {"vocabulary": number, "grammar": number, "questionHandling": number} in the same order as the items above.`;
