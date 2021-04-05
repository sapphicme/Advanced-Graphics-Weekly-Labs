var Shaders = {}

Shaders.BasicShader9A1 = {
	name: 'BasicShader9A1',

	uniforms: {
		'time': { type: 'f', value: 0.0}
	},

	vertexShader: 
	`varying vec2 vUv;
	void main() {
		vUv = uv;
		// position is a building shader variable holds the current vertex position			
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); 

	}`,

	fragmentShader:

	`uniform float time;
	
	varying vec2 vUv;
	vec3 red = vec3(1.0, 0.0, 0.0);
	vec3 color1 = vec3(0.0, 1.0, 7.0);
	void main() {
		float pct = tan(vUv.x * time);
		vec3 color = mix(red, color1, pct);
		gl_FragColor = vec4( color,  (cos(time * vUv.y))); //change the value of alpha

	}`
};

