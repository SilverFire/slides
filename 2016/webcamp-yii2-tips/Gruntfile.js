/* global module:false */
module.exports = function (grunt) {
    var port = grunt.option('port') || 8000;
    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: port,
                    base: '.'
                }
            }
        },

        zip: {
            'webcamp-presentation.zip': [
                'index.html',
                '*.css',
                '*.png',
                '*.jpg'
            ]
        },

        copy: {
            samdarkTheme: {
                expand: true,
                cwd: '../../css/',
                src: ['**'],
                dest: 'css/samdark/'
            },
            samdarkFonts: {
                expand: true,
                cwd: 'css/samdark/fonts',
                src: ['*.eot', '*.svg', '*.woff', '*.css'],
                dest: 'fonts/',
                filter: 'isFile'
            },
            revealNotes: {
                expand: true,
                cwd: 'node_modules/reveal.js/plugin/notes/',
                src: ['**'],
                dest: 'js/reveal/notes'
            },
            revealHighlight: {
                expand: true,
                cwd: 'node_modules/reveal.js/plugin/highlight/',
                src: ['**'],
                dest: 'js/reveal/highlight'
            },
            revealClasslist: {
                expand: true,
                cwd: 'node_modules/reveal.js/lib/js',
                src: ['**'],
                dest: 'js/reveal/highlight'
            }
        },

        concat: {
            css: {
                src: [
                    'node_modules/reveal.js/css/reveal.css',
                    'node_modules/reveal.js/css/theme/simple.css',
                    'css/samdark/samdark.css',
                    'css/style.css',
                    'node_modules/highlight.js/styles/github-gist.css'
                ],
                dest: 'css/all.css'
            },
            js: {
                src: [
                    'node_modules/reveal.js/lib/js/html5shiv.js',
                    'node_modules/reveal.js/lib/js/head.min.js',
                    'node_modules/reveal.js/js/reveal.js',
                    'node_modules/reveal.js/lib/js/classList.js',
                    'node_modules/reveal.js/lib/js/head.min.js'
                ],
                dest: 'js/all.js'
            }
        },

        watch: {
            main: {
                files: ['Gruntfile.js', 'index.html', 'css/style.css'],
                tasks: ['default', 'concat']
            }
        }
    });

    // Dependencies
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-zip');

    grunt.registerTask('default', ['build', 'watch']);
    grunt.registerTask('build', ['copy', 'concat']);

    // Package presentation to archive
    grunt.registerTask('package', ['default', 'zip']);

    // Serve presentation locally
    grunt.registerTask('serve', ['connect', 'default']);

};
