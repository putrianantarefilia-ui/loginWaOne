const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Extract the target folder path from command line arguments
// e.g. node build-custom.js ../my-build-folder
const targetDir = process.argv[2];

if (!targetDir) {
  console.error("❌ Please provide a target folder path.");
  console.error("Usage: node build-custom.js <path-to-folder>");
  process.exit(1);
}

const absoluteTargetDir = path.resolve(targetDir);

console.log(`🚀 Starting Next.js static build...`);
console.log(`📁 Output will be copied to: ${absoluteTargetDir}`);

try {
  // Execute standard Next.js build
  // Next.js will build to the default 'out' folder because of output: 'export'
  execSync('npm run build', { 
    stdio: 'inherit'
  });
  
  // Check if 'out' folder exists
  const outDir = path.join(__dirname, 'out');
  if (!fs.existsSync(outDir)) {
    throw new Error("Build succeeded but 'out' folder was not found.");
  }
  
  // Create target directory if it doesn't exist
  if (!fs.existsSync(absoluteTargetDir)) {
    fs.mkdirSync(absoluteTargetDir, { recursive: true });
  }
  
  // Copy contents of 'out' to target directory
  console.log(`\n📦 Copying build files to ${absoluteTargetDir}...`);
  fs.cpSync(outDir, absoluteTargetDir, { recursive: true });
  
  // Optionally clean up 'out' directory
  fs.rmSync(outDir, { recursive: true, force: true });
  
  console.log(`✅ Build successfully exported to: ${absoluteTargetDir}`);
} catch (error) {
  console.error(`\n❌ Build or copy failed.`);
  console.error(error.message);
  process.exit(1);
}
