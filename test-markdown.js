import fetch from 'node-fetch';

// Colors for terminal output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  reset: '\x1b[0m',
};

console.log(`${colors.blue}🧪 Testing Markdown Formatting in AI Responses${colors.reset}\n`);

// Test questions
const testQuestions = [
  "What are Omar's technical skills?",
  "Tell me about the Multi-University AI Assistant",
  "List his main projects",
];

// Check if response has markdown
function hasMarkdown(text) {
  const checks = {
    bold: /\*\*[^*]+\*\*/.test(text),
    code: /`[^`]+`/.test(text),
    bullets: /[▹•-]\s/.test(text),
    sections: /^##\s/m.test(text),
  };
  
  return checks;
}

async function testQuestion(question) {
  console.log(`${colors.yellow}❓ Question: "${question}"${colors.reset}`);
  
  try {
    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: question, conversationHistory: [] }),
    });

    if (!response.ok) {
      console.log(`${colors.red}❌ Server error: ${response.status}${colors.reset}\n`);
      return false;
    }

    const data = await response.json();
    const markdown = hasMarkdown(data.reply);
    
    console.log(`${colors.blue}📝 Response:${colors.reset}`);
    console.log(data.reply);
    console.log('');
    
    console.log(`${colors.blue}📊 Markdown Check:${colors.reset}`);
    console.log(`  Bold text (**): ${markdown.bold ? colors.green + '✓' : colors.red + '✗'}${colors.reset}`);
    console.log(`  Code (\`): ${markdown.code ? colors.green + '✓' : colors.red + '✗'}${colors.reset}`);
    console.log(`  Bullets (▹): ${markdown.bullets ? colors.green + '✓' : colors.red + '✗'}${colors.reset}`);
    console.log(`  Sections (##): ${markdown.sections ? colors.green + '✓' : colors.red + '✗'}${colors.reset}`);
    
    const passed = markdown.bold && markdown.code;
    console.log(`\n${passed ? colors.green + '✅ PASS' : colors.red + '❌ FAIL'}${colors.reset}\n`);
    console.log('─'.repeat(80) + '\n');
    
    return passed;
    
  } catch (error) {
    console.log(`${colors.red}❌ Error: ${error.message}${colors.reset}`);
    console.log(`${colors.yellow}💡 Make sure the server is running: npm run server${colors.reset}\n`);
    return false;
  }
}

async function runTests() {
  console.log(`${colors.blue}Starting tests...${colors.reset}\n`);
  console.log('─'.repeat(80) + '\n');
  
  let passed = 0;
  let failed = 0;
  
  for (const question of testQuestions) {
    const result = await testQuestion(question);
    if (result) passed++;
    else failed++;
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log(`${colors.blue}═${'═'.repeat(78)}${colors.reset}`);
  console.log(`${colors.blue}📊 Test Results${colors.reset}`);
  console.log(`${colors.blue}═${'═'.repeat(78)}${colors.reset}`);
  console.log(`${colors.green}✅ Passed: ${passed}/${testQuestions.length}${colors.reset}`);
  console.log(`${colors.red}❌ Failed: ${failed}/${testQuestions.length}${colors.reset}`);
  
  if (passed === testQuestions.length) {
    console.log(`\n${colors.green}🎉 All tests passed! Markdown formatting is working perfectly!${colors.reset}\n`);
  } else {
    console.log(`\n${colors.yellow}⚠️  Some tests failed. Check the server logs and system prompt.${colors.reset}\n`);
  }
}

runTests();

