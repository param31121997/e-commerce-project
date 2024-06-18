package com.ecom.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class WebSecurityConfiguration {

		
		private JwtRequestFilter jwtRequestFilter;
		
		@Autowired
		private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

	    @Autowired
	    public void setWebSecurityConfiguration(JwtRequestFilter jwtRequestFilter) {
	        this.jwtRequestFilter = jwtRequestFilter;
	    }
		
	    @Bean
	    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
	        return configuration.getAuthenticationManager();
	    }
	    
	    @SuppressWarnings("removal")
		@Bean
	    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	        http.cors().and()  // Enable CORS
	            .csrf(AbstractHttpConfigurer::disable)
	            .authorizeHttpRequests(authorizeRequests ->
	                authorizeRequests
	                    .requestMatchers("/authenticate", "/registerNewUser" ,"/getAllProducts", "/deleteProductDetails/{productId}").permitAll()
	                    .requestMatchers(HttpHeaders.ALLOW).permitAll()
	                    .anyRequest().authenticated()
	            )
	            .exceptionHandling(exceptionHandling ->
	                exceptionHandling.authenticationEntryPoint(jwtAuthenticationEntryPoint)
	            )
	            .sessionManagement(sessionManagement ->
	                sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	            );

	        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

	        return http.build();
	    }
	
	    
	    @Bean
	    public PasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
	    }
	    
	    

}
