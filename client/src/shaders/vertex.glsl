uniform float uTime;
uniform float uScroll;
uniform float uDistortStrength;
uniform vec2 uMouse;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 p = position;

  float waveA = sin((p.x * 2.0) + (uTime * 0.35)) * 0.08;
  float waveB = cos((p.y * 2.4) + (uTime * 0.25)) * 0.06;

  vec2 mouseN = (uMouse * 2.0) - 1.0;
  float dist = distance(uv, (mouseN * 0.5) + 0.5);
  float influence = smoothstep(0.45, 0.0, dist);

  p.z += (waveA + waveB) * (1.0 + uScroll * 0.35);
  p.z += influence * uDistortStrength * 0.55;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
