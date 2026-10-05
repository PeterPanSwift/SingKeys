# SingKeys

A dependency-free browser music workspace. All user-selected audio is processed locally; the provided demo is bundled as a static asset.

## Run locally

From this directory:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:4173. Use an HTTP server, not a file:// URL, because analysis uses JavaScript modules and a Web Worker.

## Features

- MP3/WAV/M4A and other browser-decodable audio, up to 50 MB / 10 minutes.
- YIN pitch analysis in a worker, median smoothing, short-note removal and segmentation.
- Three selectable vocal ranges, progress and cancellation.
- Additive synthesized piano, original audio and combined playback.
- Synchronized waveform, falling notes, highlighted keys and note names.
- 0.5x–1.25x playback; original audio uses the browser's pitch-preserving time stretch.
- MIDI format 0 export, 480 ticks per beat at 120 BPM, retaining detected timings.
- Optional WebMCP state-read and seek tools.

## Limits

This estimates dominant monophonic pitch, not separated vocals. Accompaniment may be detected, especially during instrumental passages; octave errors and missed soft notes are possible. It does not produce chords, a full piano arrangement, or professional transcription. Clean solo singing works best. Piano is synthesized, not a sampled grand piano. Codec support depends on the browser.

The demo cache was calculated from the supplied 92.44-second MP3 using the same pitch core and FFmpeg resampling/bandpass preprocessing. Browser re-analysis uses OfflineAudioContext; results can differ slightly due to filters and resampling (204 cached notes, 194 notes in the tested browser).

## Validation

```sh
node tests/audio.test.mjs
node --check dist/app.js
```

Automated checks: five known pitches, silence, melody timing, MIDI header/track structure. Browser checks: supplied song decode and re-analysis, separate four-note WAV upload and analysis, play/pause, slow combined playback, and WebMCP valid/invalid seek. WebMCP validation confirmed invalid input leaves the position unchanged. MIDI browser download event could not be observed in the embedded browser; MIDI byte structure was verified independently.

Audio API references: [decodeAudioData](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData), [OfflineAudioContext](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext).
