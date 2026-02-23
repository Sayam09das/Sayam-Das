uniform float uTime;
uniform float uScroll;
varying vec3 vNormal;
varying vec3 vWorld;

void main() {
  vec3 lightDir = normalize(vec3(0.5, 1.0, 0.6));
  float diff = max(dot(normalize(vNormal), lightDir), 0.0);
  float fres = pow(1.0 - max(dot(normalize(vNormal), normalize(-vWorld)), 0.0), 2.0);

  vec3 baseA = vec3(0.67, 0.62, 0.96);
  vec3 baseB = vec3(0.56, 0.83, 0.97);
  vec3 color = mix(baseA, baseB, diff);
  color += fres * vec3(0.35, 0.42, 0.55);
  color += sin(uTime * 0.4 + vWorld.y * 2.0) * 0.02;
  color *= 0.92 + uScroll * 0.12;

  gl_FragColor = vec4(color, 0.9);
}
