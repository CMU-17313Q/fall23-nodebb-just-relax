__report = {"info":{"file":"src/controllers/category.js","fileShort":"src/controllers/category.js","fileSafe":"src_controllers_category_js","link":"files/src_controllers_category_js/index.html"},"complexity":{"methodAggregate":{"cyclomatic":35,"cyclomaticDensity":26.515,"halstead":{"bugs":2.716,"difficulty":41.172,"effort":335485.91,"length":1064,"time":18638.106,"vocabulary":202,"volume":8148.337,"operands":{"distinct":177,"total":583,"identifiers":["__stripped__"]},"operators":{"distinct":25,"total":481,"identifiers":["__stripped__"]}},"params":9,"sloc":{"logical":132,"physical":206}},"settings":{"commonjs":true,"forin":false,"logicalor":true,"switchcase":true,"trycatch":false,"newmi":true},"classes":[],"dependencies":[{"line":4,"path":"nconf","type":"cjs"},{"line":5,"path":"validator","type":"cjs"},{"line":6,"path":"querystring","type":"cjs"},{"line":8,"path":"../database","type":"cjs"},{"line":9,"path":"../privileges","type":"cjs"},{"line":10,"path":"../user","type":"cjs"},{"line":11,"path":"../categories","type":"cjs"},{"line":12,"path":"../meta","type":"cjs"},{"line":13,"path":"../pagination","type":"cjs"},{"line":14,"path":"./helpers","type":"cjs"},{"line":15,"path":"../utils","type":"cjs"},{"line":16,"path":"../translator","type":"cjs"},{"line":17,"path":"../analytics","type":"cjs"}],"errors":[],"lineEnd":206,"lineStart":1,"maintainability":48.922,"methods":[{"cyclomatic":29,"cyclomaticDensity":39.189,"halstead":{"bugs":1.742,"difficulty":39.443,"effort":206166.687,"length":727,"time":11453.705,"vocabulary":146,"volume":5227.002,"operands":{"distinct":122,"total":401,"identifiers":["__stripped__"]},"operators":{"distinct":24,"total":326,"identifiers":["__stripped__"]}},"params":3,"sloc":{"logical":74,"physical":120},"errors":[],"lineEnd":143,"lineStart":24,"name":"<anonymous>"},{"cyclomatic":2,"cyclomaticDensity":66.667,"halstead":{"bugs":0.012,"difficulty":3,"effort":109.487,"length":13,"time":6.083,"vocabulary":7,"volume":36.496,"operands":{"distinct":4,"total":8,"identifiers":["__stripped__"]},"operators":{"distinct":3,"total":5,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":3,"physical":6},"errors":[],"lineEnd":114,"lineStart":109,"name":"<anonymous>"},{"cyclomatic":1,"cyclomaticDensity":50,"halstead":{"bugs":0.027,"difficulty":2.1,"effort":170.96,"length":22,"time":9.498,"vocabulary":13,"volume":81.41,"operands":{"distinct":10,"total":14,"identifiers":["__stripped__"]},"operators":{"distinct":3,"total":8,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":2,"physical":4},"errors":[],"lineEnd":138,"lineStart":135,"name":"<anonymous>"},{"cyclomatic":3,"cyclomaticDensity":42.857,"halstead":{"bugs":0.098,"difficulty":8.053,"effort":2361.423,"length":61,"time":131.19,"vocabulary":28,"volume":293.249,"operands":{"distinct":19,"total":34,"identifiers":["__stripped__"]},"operators":{"distinct":9,"total":27,"identifiers":["__stripped__"]}},"params":2,"sloc":{"logical":7,"physical":13},"errors":[],"lineEnd":157,"lineStart":145,"name":"buildBreadcrumbs"},{"cyclomatic":4,"cyclomaticDensity":15.385,"halstead":{"bugs":0.229,"difficulty":10.5,"effort":7214.574,"length":130,"time":400.81,"vocabulary":39,"volume":687.102,"operands":{"distinct":30,"total":70,"identifiers":["__stripped__"]},"operators":{"distinct":9,"total":60,"identifiers":["__stripped__"]}},"params":2,"sloc":{"logical":26,"physical":48},"errors":[],"lineEnd":206,"lineStart":159,"name":"addTags"}],"methodAverage":{"cyclomatic":7.8,"cyclomaticDensity":42.82,"halstead":{"bugs":0.422,"difficulty":12.619,"effort":43204.626,"length":190.6,"time":2400.257,"vocabulary":46.6,"volume":1265.052,"operands":{"distinct":37,"total":105.4},"operators":{"distinct":9.6,"total":85.2}},"params":1.8,"sloc":{"logical":22.4,"physical":38.2}},"module":"src/controllers/category.js"},"jshint":{"messages":[{"severity":"error","line":1,"column":1,"message":"Use the function form of \"use strict\".","source":"Use the function form of \"use strict\"."},{"severity":"error","line":4,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":5,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":6,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":8,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":9,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":10,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":11,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":12,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":13,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":14,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":15,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":16,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":17,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":19,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":21,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":22,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":24,"column":31,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":24,"column":41,"message":"Missing name in function declaration.","source":"Missing name in function declaration."},{"severity":"error","line":25,"column":5,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":27,"column":5,"message":"'let' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":28,"column":5,"message":"'let' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":33,"column":5,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":33,"column":5,"message":"'destructuring binding' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":33,"column":75,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":46,"column":38,"message":"'template literal syntax' is only available in ES6 (use 'esversion: 6').","source":"'{a}' is only available in ES{b} (use 'esversion: {b}')."},{"severity":"error","line":53,"column":98,"message":"'template literal syntax' is only available in ES6 (use 'esversion: 6').","source":"'{a}' is only available in ES{b} (use 'esversion: {b}')."},{"severity":"error","line":54,"column":38,"message":"'template literal syntax' is only available in ES6 (use 'esversion: 6').","source":"'{a}' is only available in ES{b} (use 'esversion: {b}')."},{"severity":"error","line":58,"column":9,"message":"Expected an assignment or function call and instead saw an expression.","source":"Expected an assignment or function call and instead saw an expression."},{"severity":"error","line":58,"column":14,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":58,"column":34,"message":"'template literal syntax' is only available in ES6 (use 'esversion: 6').","source":"'{a}' is only available in ES{b} (use 'esversion: {b}')."},{"severity":"error","line":65,"column":9,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":70,"column":5,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":70,"column":28,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":71,"column":5,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":72,"column":5,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":74,"column":5,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":74,"column":31,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":90,"column":38,"message":"'template literal syntax' is only available in ES6 (use 'esversion: 6').","source":"'{a}' is only available in ES{b} (use 'esversion: {b}')."},{"severity":"error","line":92,"column":5,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":100,"column":5,"message":"Expected an assignment or function call and instead saw an expression.","source":"Expected an assignment or function call and instead saw an expression."},{"severity":"error","line":100,"column":10,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":102,"column":9,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":104,"column":9,"message":"Expected an assignment or function call and instead saw an expression.","source":"Expected an assignment or function call and instead saw an expression."},{"severity":"error","line":104,"column":14,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":109,"column":45,"message":"'arrow function syntax (=>)' is only available in ES6 (use 'esversion: 6').","source":"'{a}' is only available in ES{b} (use 'esversion: {b}')."},{"severity":"error","line":124,"column":31,"message":"'template literal syntax' is only available in ES6 (use 'esversion: 6').","source":"'{a}' is only available in ES{b} (use 'esversion: {b}')."},{"severity":"error","line":127,"column":36,"message":"'template literal syntax' is only available in ES6 (use 'esversion: 6').","source":"'{a}' is only available in ES{b} (use 'esversion: {b}')."},{"severity":"error","line":135,"column":45,"message":"'arrow function syntax (=>)' is only available in ES6 (use 'esversion: 6').","source":"'{a}' is only available in ES{b} (use 'esversion: {b}')."},{"severity":"error","line":136,"column":20,"message":"'template literal syntax' is only available in ES6 (use 'esversion: 6').","source":"'{a}' is only available in ES{b} (use 'esversion: {b}')."},{"severity":"error","line":136,"column":20,"message":"Too many errors. (66% scanned).","source":"Too many errors."}]}}