app.service("VideoProvider", ["$q", "$http", "$sce", "$timeout", function ($q, $http, $sce, $timeout) {
    var defer;

    this.loadVideo = function loadVideo(url) {
        defer = $q.defer();

        $http.get(url).then(
            this.onLoadVideo.bind(this),
            this.onLoadVideoError.bind(this)
        );

        return defer.promise;
    };

    this.onLoadVideo = function onLoadVideo(response) {
        var videos = [];

        for (var i=0, l=response.data.trailers.youtube.length; i<l; i++) {
            videos.push({src: "https://www.youtube.com/watch?v=" + response.data.trailers.youtube[i].source});
        }

        response.data.trailers = videos;
        defer.resolve(response.data);
    };

    this.onLoadVideoError = function onLoadVideoError(error) {
        defer.reject(error);
    };
}]);
