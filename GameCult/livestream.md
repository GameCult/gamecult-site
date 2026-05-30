# GameCult Livestream

<link rel="stylesheet" href="/static/livestream/player.css">

<main class="gamecult-live-shell">
  <section class="gamecult-live-stage" aria-label="GameCult livestream">
    <video id="gamecult-live-video" controls playsinline preload="metadata"></video>
    <div class="gamecult-live-status" id="gamecult-live-status">Waiting for the live edge.</div>
  </section>
  <section class="gamecult-live-panel">
    <p class="gamecult-live-kicker">Self-hosted broadcast</p>
    <h2>GameCult Livestream</h2>
    <p>
      Starfire encodes the final Mimir program once. Yggdrasil serves the HLS
      edge through StreamPixels. This page is only the viewer.
    </p>
    <dl>
      <div>
        <dt>Playlist</dt>
        <dd><a id="gamecult-live-playlist-link" href="https://streampixels.gamecult.org/mimir/live/hls/mimir.m3u8">streampixels.gamecult.org/mimir/live/hls/mimir.m3u8</a></dd>
      </div>
      <div>
        <dt>Authority</dt>
        <dd>Mimir encodes. StreamPixels serves. GameCult watches.</dd>
      </div>
    </dl>
  </section>
</main>

<script src="https://cdn.jsdelivr.net/npm/hls.js@1.5.17/dist/hls.min.js" crossorigin="anonymous"></script>
<script src="/static/livestream/player.js"></script>
