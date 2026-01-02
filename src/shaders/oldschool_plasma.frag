void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float time = u_time * 0.7; // Fluid, hypnotic motion
    
    vec2 c = uv * 4.0 - vec2(2.0);
    float v = 0.0;
    
    // Classic 4-source interference
    v += sin(c.x + time);
    v += sin((c.y + time) * 0.5);
    v += sin((c.x + c.y + time) * 0.5);
    
    vec2 c2 = c + vec2(sin(time * 0.3), cos(time * 0.4));
    v += sin(sqrt(c2.x*c2.x + c2.y*c2.y + 1.0) + time);
    
    v *= 0.5;
    
    // THE HOT PALETTE: Violet -> Deep Red -> Bright Orange
    vec3 col1 = vec3(0.1, 0.0, 0.2);  // Deep Violet (Base/Shadows)
    vec3 col2 = vec3(0.5, 0.0, 0.1);  // Fiery Red (Midtones)
    vec3 col3 = vec3(0.8, 0.4, 0.0);  // Burning Orange (Highlights)
    
    // Blend using sine-transformed interference value
    float w1 = 0.5 + 0.5 * sin(v);
    float w2 = 0.5 + 0.5 * cos(v * 0.8 + time * 0.5);
    
    vec3 finalCol = mix(col1, col2, w1);
    finalCol = mix(finalCol, col3, w2 * 0.4); // Limit orange to 40% to prevent blinding brightness
    
    // CRITICAL for legibility: Global dimming and contrast control
    finalCol *= 0.75; 
    
    // Darken the edges (vignette) to push text into focus
    float d = length(uv - 0.5);
    finalCol *= smoothstep(1.2, 0.2, d);

    gl_FragColor = vec4(finalCol, 1.0);
}
