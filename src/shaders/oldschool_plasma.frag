void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float time = u_time * 1.5;
    
    float v = 0.0;
    vec2 c = uv * 4.0 - vec2(2.0);
    
    v += sin((c.x+time));
    v += sin((c.y+time)/2.0);
    v += sin((c.x+c.y+time)/2.0);
    vec2 c2 = c + vec2(sin(time/3.0), cos(time/2.0));
    v += sin(sqrt(c2.x*c2.x + c2.y*c2.y+1.0)+time);
    v = v/2.0;
    
    vec3 col = vec3(sin(v), sin(v+PI/2.0), sin(v+PI));
    
    gl_FragColor = vec4(col * 0.5 + 0.5, 1.0);
}
