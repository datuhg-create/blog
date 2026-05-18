# ASP.NET Core JWT 认证笔记

JWT（JSON Web Token）是一种轻量级的身份认证方式，适合前后端分离的项目。111

## 安装 NuGet 包

```bash
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
```

## Program.cs 配置

```csharp
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])
            )
        };
    });

// ... 中间件顺序很重要
app.UseAuthentication();
app.UseAuthorization();
```

## appsettings.json

```json
{
  "Jwt": {
    "Key": "your-super-secret-key-at-least-16-chars",
    "Issuer": "MyApi",
    "Audience": "MyClient"
  }
}
```

## 登录接口

```csharp
[HttpPost("login")]
public IActionResult Login([FromBody] LoginDto dto)
{
    // 验证用户名密码...
    var token = GenerateToken(dto.Username);
    return Ok(new { token });
}
```

> Key 的长度至少要 16 个字符，否则会报错。
