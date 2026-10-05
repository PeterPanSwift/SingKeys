# SingKeys

A static, private melody workspace. User-selected audio stays in the browser. The supplied demo, its separated vocal preview, and its precomputed melody are bundled assets.

## Local development

```sh
npm ci
npm run build
npm test
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:4173. Workers need HTTP or HTTPS. `dist/` contains the editable page modules and deployable output; `src/separation-worker.js` is bundled by esbuild. Do not edit its generated `dist/separation-worker.js` directly.

## Analysis pipeline

1. Decode MP3/WAV/M4A or other browser-supported audio, limited to 50 MB / 10 minutes.
2. Resample the mix to stereo 44.1 kHz and separate vocals with Kim Vocal 2 (MDX-Net), using ONNX Runtime Web 1.30.0 in a dedicated CPU/WASM worker. PffftSTFT from web-audio-separation 0.3.1 supplies STFT/ISTFT. Chunk overlap-add preserves length and smooths boundaries.
3. Download the pinned ~67 MB model on first analysis; verify SHA-256 before caching it. WASM is self-hosted. No selected audio is uploaded. Clean singing or an existing vocal track skips separation.
4. Resample vocals to 12 kHz; gate quiet/non-periodic frames, including residual vocal-to-mix energy when the original mix is available. This is a voiced-region heuristic, not a semantic singing classifier.
5. Track YIN candidates every 20 ms, use Viterbi continuity to discourage isolated octave errors, then median smoothing, pitch hysteresis, and onset-aware note segmentation. Drop notes shorter than 75 ms.
6. Play synthesized piano with synchronized falling notes, key highlights and note names; compare original, separated vocals, or original+piano. Export detected note timings as MIDI format 0 (480 PPQ, 120 BPM).

Re-analysis reuses the current separated vocal buffer. Changing the source type discards it. Cancellation terminates workers, retaining already completed results. Low-confidence notes are faded: confidence measures local pitch periodicity, not transcription accuracy. Playback supports 0.5–1.25x speed with browser pitch preservation for audio tracks.

## Model and demo provenance

Model URL and SHA-256 are pinned in `src/separation-core.js`. Model repository: https://huggingface.co/Politrees/UVR_resources (repository license metadata: MIT). Dependencies and notices are included in `dist/THIRD_PARTY_NOTICES.txt`.

The supplied 92.44-second MP3 was separated with the same core/model through ONNX Runtime Node. `scripts/prepare-demo.mjs` takes `.cache/iceland-stereo.f32` (44.1 kHz interleaved stereo) and the verified `.cache/Kim_Vocal_2.onnx`, producing `.cache/iceland-vocals.wav`. FFmpeg encodes the bundled AAC vocal preview and converts original/vocal audio to 12 kHz mono float32 for `scripts/analyze-demo.mjs`. This generated `dist/assets/iceland-v2.json` with 173 notes. Browser resampling and AAC preview decoding can produce slightly different results on re-analysis. Precomputed results are explicitly identified as the supplied demo, not substituted for new uploads.

## Validation

`npm test` covers known pitches, silence, note timing, residual-energy suppression, isolated octave correction, repeated notes, MIDI structure, and stereo STFT/overlap-add reconstruction including chunk seams and the tail.

Browser validation includes a new 8-second mixed-song upload completing actual model inference and vocal pitch analysis. Also check cancellation, cached-stem re-analysis, clean-vocal mode, playback modes, and synchronized key highlights when changing these components.

## Limits

Separation can retain accompaniment and backing singers, or remove soft parts of the lead voice. Harmony, breathy singing, slides and reverb can still produce incorrect or missing notes. There is no reference score or measured accuracy percentage for the supplied song. This produces a monophonic melody, not chords or a complete piano arrangement. Piano uses additive synthesis. First-time model download and CPU separation take time; keep the tab open and prefer a desktop browser. Codec and memory limits depend on the device. Runtime failures are shown and never silently replaced with mixed-audio analysis.
