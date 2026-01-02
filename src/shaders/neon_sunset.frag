float sun(vec2 uv, float size) {
    float d = length(uv);
    return smoothstep(size, size*0.95, d);
}

float grid(vec2 uv, float time) {
    vec2 size = vec2(uv.y, uv.y * uv.y * 0.2);
    vec2 gridUV = vec2(uv.x / (uv.y + 0.5), 1.0 / (uv.y + 0.5) + time * 2.0);
    vec2 line = abs(fract(gridUV * 10.0 - 0.5) - 0.5) / fwidth(gridUV * 10.0);
    float l = min(line.x, line.y);
    return 1.0 - smoothstep(0.0, 0.1, l);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    vec3 col = vec3(0.02, 0.0, 0.05); // Deep space background
    
    // 1. Perspective Grid (Floor)
    if (uv.y < -0.15) {
        float perspective = 0.4 / (-uv.y - 0.1);
        vec2 gridUV = vec2(uv.x * perspective, perspective + u_time * 1.5);
        
        float lines = smoothstep(0.0, 0.1, abs(sin(gridUV.x * 10.0)) * 0.1);
        lines += smoothstep(0.0, 0.1, abs(sin(gridUV.y * 10.0)) * 0.1);
        
        vec3 gridCol = mix(vec3(0.8, 0.0, 0.8), vec3(0.0, 0.8, 1.0), 0.5 + 0.5 * sin(u_time));
        col = mix(col, gridCol, lines * exp(-perspective * 0.1) * 0.5);
        
        // Horizontal glow at horizon
        col += gridCol * 0.2 * exp(uv.y * 5.0);
    }
    
    // 2. Distant Mountains (Silhouettes)
    float mountainHeight = 0.0;
    for(float i=0.0; i<3.0; i++) {
        float speed = 0.1 + i * 0.05;
        float h = 0.15 * sin(uv.x * (5.0 + i*2.0) + u_time * speed) + 0.05 * sin(uv.x * 15.0);
        if (uv.y < h - 0.1 && uv.y > -0.15) {
            col = mix(col, vec3(0.05, 0.0, 0.1), 1.0 - i * 0.3);
        }
    }

    // 3. The Synthwave Sun
    vec2 sunPos = vec2(0.0, 0.15);
    float sDist = length(uv - sunPos);
    float sSize = 0.38;
    
    if (sDist < sSize) {
        float sMask = sun(uv - sunPos, sSize);
        
        // Sun Horizontal Scanlines (Cuts)
        float cuts = 1.0;
        if (uv.y < sunPos.y) {
            float cutIn = pow(max(0.0, (sunPos.y - uv.y) / sSize), 2.5);
            cuts = step(0.18, fract(uv.y * 22.0 - u_time * 0.5) + cutIn * 0.8);
        }
        
        vec3 sColTop = vec3(1.0, 0.9, 0.1);    // Yellow
        vec3 sColMid = vec3(1.0, 0.2, 0.5);    // Pink
        vec3 sColBot = vec3(0.4, 0.0, 0.8);    // Purple
        
        vec3 sFinalCol = mix(sColBot, mix(sColMid, sColTop, smoothstep(-0.1, 0.4, uv.y)), smoothstep(-0.4, 0.2, uv.y));
        col = mix(col, sFinalCol, sMask * cuts);
    }
    
    // 4. Atmospheric Glow & Bloom
    col += vec3(1.0, 0.1, 0.6) * 0.25 * exp(-sDist * 2.5); // Pink bloom
    col += vec3(0.1, 0.5, 1.0) * 0.15 * exp(-abs(uv.y + 0.15) * 4.0); // Horizon sky glow

    // 5. Retro Scanlines (Global Overlay)
    col *= 0.9 + 0.1 * sin(gl_FragCoord.y * 1.5 + u_time * 10.0);
    
    gl_FragColor = vec4(col, 1.0);
}
