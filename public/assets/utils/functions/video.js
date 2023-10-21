
export function extractVideoId(youtubeLink) {
    var videoId = youtubeLink.split('v=')[1];
    if (videoId) {
        // Extract the video ID, which is the characters following "v="
        var ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
            videoId = videoId.substring(0, ampersandPosition);
        }
        return videoId;
    } else {
        // Handle cases where the link doesn't contain a video ID
        return null;
    }
}