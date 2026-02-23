varying float vAlpha;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  float mask = smoothstep(0.5, 0.0, d);
  vec3 color = vec3(0.88, 0.92, 1.0);
  gl_FragColor = vec4(color, mask * vAlpha);
}
