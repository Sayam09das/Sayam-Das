uniform float uTime;
uniform float uScroll;
varying vec2 vUv;

void main() {
  vec3 c1 = vec3(0.63, 0.56, 0.97);
  vec3 c2 = vec3(0.43, 0.76, 0.98);
  vec3 c3 = vec3(0.98, 0.84, 0.62);

  float t = vUv.y + sin(vUv.x * 3.2 + uTime * 0.15) * 0.06;
  vec3 col = mix(c1, c2, smoothstep(0.0, 0.7, t));
  col = mix(col, c3, smoothstep(0.45, 1.0, vUv.x + uScroll * 0.15));

  float grain = fract(sin(dot(vUv + uTime, vec2(12.9898, 78.233))) * 43758.5453);
  col += (grain - 0.5) * 0.01;

  gl_FragColor = vec4(col, 0.42);
}
