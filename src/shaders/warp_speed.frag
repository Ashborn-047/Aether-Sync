void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    
    float t = u_time * 2.0;
    vec3 col = vec3(0.0);
    
    for(float i=0.0; i<1.0; i+=0.1) {
        float depth = fract(i + t);
        float scale = mix(10.0, 0.5, depth);
        float fade = depth * smoothstep(1.0, 0.9, depth);
        
        vec2 st = uv * scale;
        vec2 id = floor(st);
        vec2 q = fract(st) - 0.5;
        
        float r = snoise(id + i * 100.0);
        if(r > 0.8) {
            float star = smoothstep(0.1, 0.0, length(q));
            vec3 starColor = mix(vec3(1.0), vec3(0.5, 0.8, 1.0), r);
            col += star * fade * starColor;
        }
    }
    
    // Radial bluish glow
    col += vec3(0.0, 0.1, 0.3) * length(uv) * 0.5;

    gl_FragColor = vec4(col, 1.0);
}
