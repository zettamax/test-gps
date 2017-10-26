self.addEventListener('fetch', function (event) {
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(fetch(event.request));
    }
});
