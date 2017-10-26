self.addEventListener('fetch', function (event) {
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(fetch(event.request));
    }

    var title = 'Yay a message.';
    var body = event.request.url;
    var icon = './icon128.png';
    var tag = 'ololo-tag';

    event.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            icon: icon,
            tag: tag
        })
    );
});

self.addEventListener('push', function(event) {
    console.log('Received a push message', event);


});
