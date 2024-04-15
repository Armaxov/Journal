package com.journal.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.journal.service.UserDetailsServiceImpl;

@Component
public class JournalAuthenticationProvider implements AuthenticationProvider{

	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException{
			
			String name = authentication.getName();
			String password = authentication.getCredentials().toString();
			
			UserDetails user = userDetailsServiceImpl.loadUserByUsername(name);
			if(user != null && user.getPassword().equals(password))
				return new UsernamePasswordAuthenticationToken(name, password, user.getAuthorities());
			return null;
		
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}

}
