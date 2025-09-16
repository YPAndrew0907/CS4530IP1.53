#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get the rubric ID from command line arguments
const rubricId = process.argv[2];

if (!rubricId) {
    console.error('Error: Please provide a rubric ID as an argument');
    console.error('Usage: node manualGrader.js <rubric-id>');
    process.exit(1);
}

try {
    // Read the JSON file
    const jsonPath = path.join(__dirname, 'manualGradingVerdict.json');
    const jsonData = fs.readFileSync(jsonPath, 'utf8');
    const gradingData = JSON.parse(jsonData);

    // Validate that all IDs are unique
    const ids = gradingData.map(item => item.id);
    const uniqueIds = new Set(ids);
    
    if (ids.length !== uniqueIds.size) {
        console.error('Error: Duplicate IDs found in manualGrading.json');
        process.exit(1);
    }

    // Find the rubric with the matching ID
    const rubric = gradingData.find(item => item.id === rubricId);

    if (!rubric) {
        console.error(`Error: Rubric with ID "${rubricId}" not found in manualGrading.json`);
        process.exit(1);
    }

    // Check the value
    if (rubric.value === true) {
        console.log(`Rubric "${rubric.rubric}" (ID: ${rubricId}) passed (value: true)`);
        process.exit(0);
    } else {
        console.error(`Rubric "${rubric.rubric}" (ID: ${rubricId}) failed (value: ${rubric.value})`);
        process.exit(1);
    }

} catch (error) {
    if (error.code === 'ENOENT') {
        console.error('Error: manualGrading.json file not found');
    } else if (error instanceof SyntaxError) {
        console.error('Error: Invalid JSON format in manualGrading.json');
    } else {
        console.error(`Error: ${error.message}`);
    }
    process.exit(1);
}