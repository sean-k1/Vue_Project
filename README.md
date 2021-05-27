
---

### JWT

* Controller
  * 모든 전달 받은 password는 Bcyrpt로 해싱하여 관리 (Spring Security에서 제공하는 PasswordEncoder 활용)
  * 모든 Token은 HS512로 관리됨 (Spring Security에서 제공하는 



* JwtRequestFilter
  * User의 특정한 Request를 제외하고 모든 Request를 가로챈다
  * 가로챈 Request에서 헤더에 token이 있는지 확인
  * JwtTokenUtil에서 token의 생성자 id를 추출
  * user와 token의 생성자가 동일한지 확인

* JwtUserDetailsService
  * user가 login 시도한 id와 pw를 db에서 확인 (올바른 id인지 확인)

* JwtTokenUtil
  * 토큰이 존재하지 않는 login의 경우 토큰을 생성해 줌
  * Filter에서 받아들인 user와 token의 생성자가 동일한지 확인해 줌

```java
private String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + 5*60*60 ))
            .signWith(SignatureAlgorithm.HS512, secret).compact();
    }
```

*
  * claim : token에 담을 정보
  * issuer : token 발급자
  * subject : token 제목
  * issudate : token 발급 시간
  * expiration : token 만료 시간 ( ms 기준 )
  * signwith : 암호화 알고리즘, 키 여부(공개키 비밀키)


* JwtResponse
  * 사용자에게 반환 될 JWT

* JwtAuthenticationEntryPoint
  * 권한이 없는 요청에 대해서 401 error로 전달

* WebSecurityConfig
  * WebSecurity와 HttpSecurity를 커스터마이징 가능
  * 예외적 허용을 해줄 요청을 설정할 수도 있음 (ex. 로그인)
  
```java
@Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf().disable()
            .authorizeRequests().antMatchers("/happyhouse/BoardMain","/happyhouse/board/**", "/happyhouse/login","/happyhouse/signUp", "/happyhouse/test" , "/happyhouse/board","/happyhouse/house/**", "/happyhouse/ajax","/img/**","/","/js/**", "/css/**","/**").permitAll().
            requestMatchers(CorsUtils::isPreFlightRequest).permitAll().

                anyRequest().authenticated().and().
                exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        //httpSecurity.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues());

        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

```
* authorizeRequests()
 * HttpServeletRequest에 따라 access를 제한함
  * .antMatchers("/login").permitAll() : /login 으로 시작하는 경로는 권한 없이 접근이 가능
  * .antMatchers("/admin/**").hasRole("ADMIN") : admin롤을 가진 사용자만 접근 가능


---
