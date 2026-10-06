const Login = document.getElementById("login");
const username = document.getElementById("username");
const password = document.getElementById("password");
Login.onclick = function() {
    console.log(username.value);
    console.log(password.value);
    if (username.value != "admin") {
        alert("Tên đăng nhập không đúng!");
    } else if (password.value != "123456") {
        alert("Mật khẩu không đúng!");
    } else {
        alert("Đăng nhập thành công!");
        window.location.href = "Do-an-web1-main/Do-an-web1-main/admin/imports.html";
    }
}
