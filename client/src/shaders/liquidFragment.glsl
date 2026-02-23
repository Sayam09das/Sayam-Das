uniform sampler2D uTexA;
uniform sampler2D uTexB;
uniform float uMix;
uniform float uIntensity;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  uv.x += sin((uv.y * 18.0) + uTime * 1.6) * 0.015 * uIntensity;
  uv.y += cos((uv.x * 16.0) + uTime * 1.3) * 0.01 * uIntensity;

  vec4 a = texture2D(uTexA, uv);
  vec4 b = texture2D(uTexB, uv);
  vec4 c = mix(a, b, clamp(uMix, 0.0, 1.0));

  gl_FragColor = vec4(c.rgb, c.a * 0.95);
}
