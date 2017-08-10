const xtpl = require('xtpl');
const Files = require('fs');


xtpl.renderFile('./views/index.xtpl', {}, function(error, content) {
    Files.writeFile('./static/index.html', content, 'utf8', function() {
        console.log('index.html - OK')
    })
});

xtpl.renderFile('./views/page/index.xtpl', {}, function(error, content) {
    Files.writeFile('./static/page/index.html', content, 'utf8', function() {
        console.log('page.html - OK')
    })
});
xtpl.renderFile('./views/page/reserve/index.xtpl', {}, function(error, content) {
    Files.writeFile('./static/page/reserve/index.html', content, 'utf8', function() {
        console.log('reserve.html - OK')
    })
});
xtpl.renderFile('./views/page/payment/index.xtpl', {}, function(error, content) {
    Files.writeFile('./static/page/payment/index.html', content, 'utf8', function() {
        console.log('payment.html - OK')
    })
});


xtpl.renderFile('./views/other/aboutus.xtpl', {}, function(error, content) {
    Files.writeFile('./static/other/aboutus.html', content, 'utf8', function() {
        console.log('aboutus.html - OK')
    })
});
xtpl.renderFile('./views/other/teamstory.xtpl', {}, function(error, content) {
    Files.writeFile('./static/other/teamstory.html', content, 'utf8', function() {
        console.log('teamstory.html - OK')
    })
});
xtpl.renderFile('./views/other/joinus.xtpl', {}, function(error, content) {
    Files.writeFile('./static/other/joinus.html', content, 'utf8', function() {
        console.log('joinus.html - OK')
    })
});
xtpl.renderFile('./views/other/help.xtpl', {}, function(error, content) {
    Files.writeFile('./static/other/help.html', content, 'utf8', function() {
        console.log('help.html - OK')
    })
});
xtpl.renderFile('./views/other/privacy.xtpl', {}, function(error, content) {
    Files.writeFile('./static/other/privacy.html', content, 'utf8', function() {
        console.log('privacy.html - OK')
    })
});
xtpl.renderFile('./views/other/policy.xtpl', {}, function(error, content) {
    Files.writeFile('./static/other/policy.html', content, 'utf8', function() {
        console.log('policy.html - OK')
    })
});




console.log('渲染....');
