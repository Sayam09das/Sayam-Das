uniform float uTime;
uniform float uProgress;
attribute float aScale;
varying float vAlpha;

void main() {
  vec3 p = position;
  p.z += sin((position.x + uTime) * 1.8) * 0.08;
  p.z += cos((position.y + uTime * 0.7) * 1.6) * 0.08;

  vAlpha = smoothstep(0.0, 1.0, uProgress);

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = (3.0 + aScale * 4.0) * (1.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
