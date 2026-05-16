# 博客搭建好了！

终于把个人博客搭起来了 🎉

## 技术栈

- **前端**：Vue 3 + Vite
- **UI 框架**：Element Plus
- **文章格式**：Markdown
- **代码高亮**：highlight.js
- **部署**：GitHub Pages

## 写文章

直接在 `articles` 文件夹下新建 `.md` 文件，然后在 `index.json` 里加一条记录就行。

### 代码示例

```csharp
// JWT Token 生成
public string GenerateToken(string username)
{
    var claims = new[]
    {
        new Claim(ClaimTypes.Name, username),
        new Claim(ClaimTypes.Role, "user")
    };

    var key = new SymmetricSecurityKey(
        Encoding.UTF8.GetBytes(_config["Jwt:Key"])
    );
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
        issuer: _config["Jwt:Issuer"],
        audience: _config["Jwt:Audience"],
        claims: claims,
        expires: DateTime.Now.AddHours(2),
        signingCredentials: creds
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}
```

### 图片示例

![示例图片](/images/sample.png)

> 图片放在 `images` 文件夹下，文章中引用 `/images/xxx.png` 即可。
