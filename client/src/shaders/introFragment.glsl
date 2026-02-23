uniform float uProgress;
uniform float uFlash;
uniform float uTime;
varying float vAlpha;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float dist = length(uv);
  float mask = smoothstep(0.5, 0.0, dist);

  vec3 base = mix(vec3(0.5, 0.65, 1.0), vec3(1.0), uProgress * 0.6);
  float pulse = 0.85 + sin(uTime * 2.2) * 0.15;
  vec3 col = base * pulse;
  col += vec3(uFlash * 0.7);

  gl_FragColor = vec4(col, mask * vAlpha);
}
