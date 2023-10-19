
const fs = require('fs');
const path = require('path');

// Directories that contain TypeScript files of note
const tsDirs = [
    "public/src",
    "src", 
    "test",
];

// Helper walk function to check all directories
function walk(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            results.push(file);
        }
    });
    return results;
}

// Find all JS files that were compiled from TS
function find_compiled_js() {
    let jsFilesList = [];
    
    tsDirs.forEach(tsDir => {
        let filesList = walk(tsDir);
        const tsFilesList = filesList.filter((file) => path.extname(file).toLowerCase() === '.ts');
        jsFilesList = jsFilesList.concat(filesList.filter(
            (file) => path.extname(file).toLowerCase() === '.js' && 
            tsFilesList.find(tsFile => tsFile === (file.replace(/\.[^/.]+$/, "") + ".ts")) !== undefined));
        });
        
        if (jsFilesList.length == 0) return "";
        return jsFilesList;
    }
    
    module.exports = {
        parserOptions: {
            sourceType: "module",
        },
        extends: ["nodebb"],
        root: true,
        ignorePatterns: find_compiled_js(),
        rules: {
            'no-undef': "off",
            "indent": ["error", 4],
            "object-curly-spacing": ["error", "always"], // Enforce spacing inside curly braces
            "quotes": ["error", "double"], // Enforce the use of double quotes
            'no-restricted-syntax': [
                'off',
                {
                  selector: 'ForOfStatement',
                }
            ],
        },
        overrides: [
            {
                files: ["**/*.ts", "**/*.tsx"],
                extends: [
                    "plugin:@typescript-eslint/recommended",
                    "plugin:@typescript-eslint/recommended-requiring-type-checking"
                ],
                parser: "@typescript-eslint/parser",
                plugins: ["@typescript-eslint"],
                parserOptions: {
                    ecmaFeatures: { jsx: true },
                    project: "./tsconfig.json"
                },
                rules: {
                    'no-undef': "off",
                    "no-use-before-define": "off",
                    "@typescript-eslint/no-use-before-define": "error",            
                }
            }
        ]
    };