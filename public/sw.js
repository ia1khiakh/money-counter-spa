self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return cached response
      if (response) {
        return response;
      }
      // Fetch from network
      return fetch(event.request);
    }),
  );
});
