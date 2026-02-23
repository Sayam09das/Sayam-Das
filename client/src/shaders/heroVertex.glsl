uniform float uTime;
uniform float uScroll;
uniform vec2 uMouse;
varying vec3 vNormal;
varying vec3 vWorld;

void main() {
  vec3 p = position;
  float wobbleA = sin((p.y * 3.2) + uTime * 0.8) * 0.08;
  float wobbleB = cos((p.x * 2.7) + uTime * 0.55) * 0.06;
  p += normal * (wobbleA + wobbleB) * (1.0 + uScroll * 0.3);

  p.x += (uMouse.x - 0.5) * 0.18;
  p.y += (uMouse.y - 0.5) * 0.12;

  vec4 worldPos = modelMatrix * vec4(p, 1.0);
  vWorld = worldPos.xyz;
  vNormal = normalize(normalMatrix * normal);

  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
