package com.ecom.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class WebSecurityConfiguration {

		
		private JwtRequestFilter jwtRequestFilter;

	    @Autowired
	    public void setWebSecurityConfiguration(JwtRequestFilter jwtRequestFilter) {
	        this.jwtRequestFilter = jwtRequestFilter;
	    }
		
	    @Bean
	    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
	        return configuration.getAuthenticationManager();
	    }
	    
	    @Bean
	    public SecurityFilterChain securityFilterChain(HttpSecurity security) throws Exception {	    	
	        return security.csrf(csrf -> csrf.disable())
	                .authorizeHttpRequests(authz -> authz
	                        .requestMatchers("/authenticate", "/registerNewUser").permitAll()
	                        .anyRequest().authenticated()
	                    )
	                    .headers(headers -> headers
	                        .addHeaderWriter((request, response) -> {
	                            response.addHeader(HttpHeaders.ALLOW, "GET, POST, PUT, DELETE");
	                        })
	                    )
	                .sessionManagement(management -> management
	                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
	                .build();
	    }
	    
	    @Bean
	    public PasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
	    }
	    
	    

}
