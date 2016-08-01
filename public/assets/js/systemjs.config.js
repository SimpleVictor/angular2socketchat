var isPublic = typeof window != "undefined";

/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
    // map tells the System loader where to look for things
    var map = {
        'app':                        'client', // 'dist',
        '@angular':                   (isPublic)? '@angular' : 'node_modules/@angular',
        'socket.io-client':           (isPublic)? 'socket.io-client' : 'node_modules/socket.io-client',
        '@angular/router':            (isPublic)? '@angular/router' : 'node_modules/@angular/router',
        'angular2-in-memory-web-api': (isPublic)? 'angular2-in-memory-web-api' : 'node_modules/angular2-in-memory-web-api',
        'rxjs':                       (isPublic)? 'rxjs' : 'node_modules/rxjs',
        'ng-semantic':                (isPublic)? 'ng-semantic' : 'node_modules/ng-semantic',
        "ng2-bootstrap":               (isPublic)? 'ng2-bootstrap': 'node_modules/ng2-bootstrap',
        "moment":                       (isPublic)? 'moment': 'node_modules/moment',
        'ng2-bs3-modal':                (isPublic)?   'ng2-bs3-modal':  'node_modules/ng2-bs3-modal',
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app':                        { main: 'main.js',  defaultExtension: 'js' },
        'rxjs':                       { defaultExtension: 'js' },
        'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
        'ng-semantic':                { main: 'ng-semantic', defaultExtension: 'js' },
        "socket.io-client":             {main: 'socket.io', defaultExtension: 'js'},
        "ng2-bootstrap":                {main: 'ng2-bootstrap', defaultExtension: 'js'},
        "moment":                       {main: 'moment', defaultExtension: 'js'},
        "ng2-bs3-modal":                {main: 'ng2-bs3-modal', defaultExtension: 'js'}
    };
    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'http',
        'forms',
        'platform-browser',
        'platform-browser-dynamic',
        'router-deprecated',
        'upgrade'
    ];
    // Individual files (~300 requests):
    function packIndex(pkgName) {
        packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }
    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    }

    packages['@angular/router'] = { main: 'index.js', defaultExtension: 'js' };

    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);
    var config = {
        map: map,
        packages: packages
    };
    System.config(config);
})(this);
