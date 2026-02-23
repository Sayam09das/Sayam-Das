uniform float uTime;
uniform float uProgress;
uniform float uExplode;
uniform float uAudio;
attribute vec3 aTarget;
attribute float aScale;
varying float vAlpha;

void main() {
  vec3 p = mix(position, aTarget, uProgress);

  float ripple = sin((aTarget.x + aTarget.y + uTime) * 2.0) * 0.04;
  p.z += ripple * (1.0 - uExplode);

  vec3 dir = normalize(aTarget + vec3(0.001));
  p += dir * uExplode * (1.8 + aScale * 3.0);

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = (2.6 + aScale * 2.8 + uAudio * 2.5) * (1.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;

  vAlpha = (1.0 - uExplode) * (0.45 + uProgress * 0.55);
}
