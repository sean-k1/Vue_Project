
---

# WantSeek House


## 간단한 설명

지도(Kakao Map API)와 검색을 통해 얻은 지리 좌표로 거래 내역을 보여주는 홈페이지


## 기술 스택

### Front-end

- Vue.js

### Back-end

- Spring boot (Rest API)

## 기능

- 회원 관리
  - 회원 가입
  - 회원 수정
  - 회원 탈퇴
  - 로그인
  - 로그아웃
  - 관리자 페이지 (회원 추가, 수정, 삭제)
- 게시판
  - 게시글 작성
  - 게시글 삭제
  - 게시글 수정
  - 게시글 읽기
  - 댓글 작성
  - 댓글 삭제
- Map
  - 매물 확인
  - 매물 클릭 시 세부 정보
  - 검색 시 검색어에 대응하는 시설 표시(지하철, 건물)
  - 다세대/아파트/오피스텔 별 이미지 구분
  - Map에서 Drag시 법정동에 따라 매물 표시
- Admin
  - 게시판에 있는 게시글 수정, 삭제 권한

## 구조

    ├── public
    ├── src
    │   ├── components
    │   │   ├──  AptRow - Q&A 게시판 관련 컴포넌트
    │   │   ├──  CommentList - 댓글 리스트 컴포넌트
    │   │   ├──  Detail - 게시물 확인 컴포넌트
    │   │   ├──  KakaoMaps - 카카오 Map Api 관련 컴포넌트
    │   │   ├──  NavBar - 검색창 및 로그인, 게시판 선택 컴포넌트
    │   │   ├──  Row - list.vue에 게시물 출력하는 컴포넌트
    │   │   ├──  SearchRow - 
    │   │   ├──  userInfo - 유저 정보 변경 관련 컴포넌트
    │   │   └──  userList - adminPage.vue에서 유저 관리 관련 컴포넌트
    │   ├── router - Vue-Router 설정
    │   ├── Store - vuex 관련 설정
    │   ├── Views
    │   │   ├──  About - 
    │   │   ├──  adminPage - 관리자가 유저관리 등을 위한 페이지
    │   │   ├──  AptInfo - 
    │   │   ├──  list - 게시판에서 게시물 리스트 페이지
    │   │   ├──  modify - 게시물 수정 페이지
    │   │   ├──  Search - 
    │   │   ├──  WantSeekMap - 
    │   │   └──  write - 게시글 쓰기 페이지
    │   ├── utils
    │   │     ├── areaAuto.js - 검색 자동 완성 관련
    │   │     ├── Boardhttp.js - 권한 없이 열람 가능한 기능 관련
    │   │     ├── kakaohttp.js - kakaoMap api 관련
    │   │     └── Tokenhttp.js - 권한이 필요한 모든  관련



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

- 장소 , 역 검색 기능 (components/ Search.vue)
    - KAKAO keyword API (검색 결과 파씽)

     ![검색내역](https://user-images.githubusercontent.com/22265915/119916011-a9d55300-bf9e-11eb-8f44-75008b79d381.png)
  

- 스크롤 이동 시 주위 매물 정보 표시 보여주기 (components/ KakaoMaps.vue)
    - KAKAO MAPS API Custom Overlay





      ![주위검색](https://user-images.githubusercontent.com/22265915/119916165-f9b41a00-bf9e-11eb-931e-304626bf51f0.png)


  
