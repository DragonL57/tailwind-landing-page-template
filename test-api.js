const http = require('http');

const data = JSON.stringify({
  name: 'Test Full Scores',
  email: 'full@test.com',
  phone: '000111',
  industry: 'retail',
  goal: ['daily-conversation'],
  currentLevel: { cefr: 'A1' },
  targetLevel: { cefr: 'C1' },
  gapHours: 180,
  packageLabel: 'Gói 180h',
  scores: { 
    grandTotal: 57.4, 
    grandMax: 100, 
    
    // Part 1
    part1: 38.7,
    p1_pronunciation: 8.3,
    p1_fluency: 8.3,
    p1_prosody: 6.3,
    p1_completeness: 8.3,
    p1_overall: 7.5,

    // Part 2
    part2: 18.7,
    p2_vocabulary: 0.0,
    p2_grammar: 0.0,
    p2_questionHandling: 0.0,
    p2_pronunciation: 9.2,
    p2_fluency: 9.5
  }
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/assessment-lead',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Body:', body);
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.write(data);
req.end();
