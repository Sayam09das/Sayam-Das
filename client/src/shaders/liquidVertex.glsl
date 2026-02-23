uniform float uTime;
uniform float uIntensity;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 p = position;
  float wobble = sin((p.x * 2.8) + uTime * 1.2) * 0.03;
  p.z += wobble * uIntensity;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
