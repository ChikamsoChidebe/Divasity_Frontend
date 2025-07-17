// Simple script to fix TypeScript errors before build
const fs = require('fs');
const path = require('path');

// Add default exports to files that are imported as default
const addDefaultExports = [
  {
    file: 'src/pages/Customer/Dashboard.tsx',
    component: 'Dashboard'
  }
];

// Process each file
addDefaultExports.forEach(({ file, component }) => {
  const filePath = path.join(__dirname, file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if default export already exists
    if (!content.includes(`export default ${component}`)) {
      // Add default export at the end of the file
      content += `\n\n// Add default export\nexport default ${component};`;
      
      // Write the updated content back to the file
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Added default export to ${file}`);
    } else {
      console.log(`⏭️ Default export already exists in ${file}`);
    }
  } else {
    console.log(`❌ File not found: ${file}`);
  }
});

console.log('✨ TypeScript error fixes completed');