float distortionField(vec2 uv, vec2 center, float strength) {
  float d = distance(uv, center);
  float radial = smoothstep(0.55, 0.0, d);
  return radial * strength;
}
