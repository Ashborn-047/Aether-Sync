void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    
    // Sun center
    vec2 sunPos = vec2(0.0, 0.1);
    float sunSize = 0.35;
    float dist = length(uv - sunPos);
    
    // Sun shape
    float sun = smoothstep(sunSize, sunSize - 0.01, dist);
    
    // Cuts
    float cuts = sin(uv.y * 100.0 + u_time * 2.0);
    float cutThreshold = smoothstep(-0.2, 0.1, uv.y - sunPos.y + 0.15); // Gradient cuts
    if (cuts > 0.0 && uv.y < sunPos.y) {
        sun *= step(0.0, cuts - cutThreshold * 1.5);
    }
    
    // Gradient Sky
    vec3 col = mix(vec3(0.1, 0.0, 0.2), vec3(0.0, 0.0, 0.0), abs(uv.y));
    
    // Grid Floor
    if (uv.y < -0.2) {
         float p = -0.2 / (uv.y + 0.2); // Perspective
         float grid = abs(sin(uv.x * p * 10.0)) * 0.5 + abs(sin(p * 2.0 + u_time * 4.0));
         col += vec3(1.0, 0.0, 0.8) * smoothstep(0.9, 1.0, grid) * 0.3 * exp(uv.y * 2.0);
    }
    
    // Sun Color
    vec3 sunCol = mix(vec3(1.0, 0.0, 0.5), vec3(1.0, 0.8, 0.0), uv.y * 2.0 + 0.5);
    col += sun * sunCol;
    
    // Glow
    col += vec3(1.0, 0.2, 0.5) * 0.2 * exp(-dist * 4.0);

    gl_FragColor = vec4(col, 1.0);
}
