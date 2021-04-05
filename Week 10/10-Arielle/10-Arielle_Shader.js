let Shaders = {}

Shaders.BasicShader9B1 = {

	name: 'BasicShader9B1', //for debugging

	uniforms: {

		'time': { type: 'f', value: 0.0 } 
		

	},
	
	vertexShader: 
	
	`uniform float time;

	varying vec2  vUv;

	void main() {

		vec3 pos = position;

		// pos.z += position.y;

       	// pos.z += sin( pos.y );
		// pos.z = step(0.0, sin( pos.x));
		// pos.z += step(0.0, sin( pos.y));
       	// pos.z += sin( pos.y * 0.5 );

       	// pos.z += sin( pos.y + time);

       	// pos.z += 0.5 * sin( time * 2.0 + pos.x ) + 0.2 * sin( time * 2.0 + pos.y );

       	// pos.x += sin( position.z );
       	 pos.y += sin( position.x );
       	 pos.z += sin( position.y );
       	vUv = uv;

		gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );

	}`,


	fragmentShader:

	`uniform float time;
	
	varying vec2 vUv;
	vec3 red = vec3(1.0, 0.0, 0.0);
	vec3 color1 = vec3(0.0, 1.0, 5.0);
	void main() {
		float pct = -tan(vUv.x * time);
		vec3 color = mix(red, color1, pct);
		gl_FragColor = vec4( color,  (time * vUv.y)); //change the value of alpha

	}`
};

Shaders.BasicShader9B2 = {

	name: 'BasicShader9B2', //for debugging

	uniforms: {

		'time': { type: 'f', value: 0.0 } 
		

	},
	
	vertexShader: 
	
	`uniform float time;

	varying vec2  vUv;

	void main() {

		vec3 pos = position;

		// pos.z += position.y;

       	// pos.z += sin( pos.y );
		// pos.z = step(0.0, sin( pos.x));
		// pos.z += step(0.0, sin( pos.y));
       	// pos.z += sin( pos.y * 0.5 );

       	// pos.z += sin( pos.y + time);

       	 pos.z += 0.5 * sin( time * 2.0 + pos.x ) + 0.2 * sin( time * 2.0 + pos.y );

       	// pos.x += sin( position.z );
       	// pos.y += sin( position.x );
       	// pos.z += sin( position.y );
		   pos.z += 0.5 + 0.7 * cos(time + vUv.x * 40.0);
       	vUv = uv;

		gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );

	}`,


	fragmentShader:

	`uniform float time;
	
	varying vec2 vUv;
	vec3 red = vec3(1.0, 0.0, 0.0);
	vec3 color1 = vec3(0.0, 1.0, 5.0);

	void main()	{

		
		//float x = mod(time + gl_FragCoord.x, 20.) < 10. ? 1. : 0.;
		//float y = mod(time + gl_FragCoord.y, 20.) < 10. ? 1. : 0.;

		// Time varying pixel color
      	vec3 col = 0.5 + 0.7 * cos(time + vUv.xyx * 40.0 + vec3(0,2,4));
		//vec3 col = 0.5 + 0.7 * tan(time + vUv.xyx * 40.0 + vec3(0,2,4));

      	// Output to screen
      	gl_FragColor = vec4( col, 1.0);

		//gl_FragColor = vec4(vec3(min(x, y)), 1.);
	}`
};



