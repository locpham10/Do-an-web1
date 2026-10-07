const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const forgotForm = document.getElementById("forgotForm");

const loginAccount = document.getElementById("loginAccount");
const loginPassword = document.getElementById("loginPassword");

const registerName = document.getElementById("registerName");
const registerPhone = document.getElementById("registerPhone");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const confirmPassword = document.getElementById("confirmPassword");

const forgotPassword = document.getElementById("forgotPassword");
const backToLogin = document.getElementById("backToLogin");


// HIỂN THỊ ĐĂNG NHẬP

function showLogin() {

    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    forgotForm.classList.add("hidden");

    loginTab.classList.add("active");
    registerTab.classList.remove("active");

}


// HIỂN THỊ ĐĂNG KÝ

function showRegister() {

    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    forgotForm.classList.add("hidden");

    loginTab.classList.remove("active");
    registerTab.classList.add("active");

}


// HIỂN THỊ QUÊN MẬT KHẨU

function showForgot() {

    loginForm.classList.add("hidden");
    registerForm.classList.add("hidden");
    forgotForm.classList.remove("hidden");

    loginTab.classList.remove("active");
    registerTab.classList.remove("active");

}


// CHUYỂN FORM

loginTab.addEventListener("click", showLogin);

registerTab.addEventListener("click", showRegister);

document.getElementById("goRegister")
    .addEventListener("click", showRegister);

document.getElementById("goLogin")
    .addEventListener("click", showLogin);

forgotPassword.addEventListener("click", showForgot);

backToLogin.addEventListener("click", showLogin);


// ĐĂNG KÝ

registerForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const hoTen = registerName.value.trim();
    const soDienThoai = registerPhone.value.trim();
    const email = registerEmail.value.trim().toLowerCase();
    const matKhau = registerPassword.value;
    const xacNhanMatKhau = confirmPassword.value;


    if (matKhau !== xacNhanMatKhau) {

        alert("Mật khẩu xác nhận không trùng khớp!");

        return;

    }


    let taiKhoan =
        JSON.parse(localStorage.getItem("taiKhoan")) || [];


    const daTonTai = taiKhoan.some(function(account) {

        return (
            account.email.toLowerCase() === email ||
            account.soDienThoai === soDienThoai
        );

    });


    if (daTonTai) {

        alert("Email hoặc số điện thoại đã được đăng ký!");

        return;

    }


    const nguoiDung = {

        hoTen: hoTen,
        soDienThoai: soDienThoai,
        email: email,
        matKhau: matKhau

    };


    taiKhoan.push(nguoiDung);


    localStorage.setItem(
        "taiKhoan",
        JSON.stringify(taiKhoan)
    );


    alert("Đăng ký thành công!");


    registerForm.reset();

    showLogin();

});


// ĐĂNG NHẬP

loginForm.addEventListener("submit", function(e) {

    e.preventDefault();


    const taiKhoanNhap =
        loginAccount.value.trim();

    const matKhauNhap =
        loginPassword.value;


    const taiKhoan =
        JSON.parse(localStorage.getItem("taiKhoan")) || [];


    const nguoiDung = taiKhoan.find(function(account) {

        return (
            (
                account.email.toLowerCase() ===
                taiKhoanNhap.toLowerCase()

                ||

                account.soDienThoai ===
                taiKhoanNhap
            )

            &&

            account.matKhau === matKhauNhap
        );

    });


    if (nguoiDung) {

        localStorage.setItem(
            "nguoiDungDangNhap",
            JSON.stringify(nguoiDung)
        );


        alert("Đăng nhập thành công!");


        loginForm.reset();


        window.location.href = "index.html";


    } else {

        alert("Sai email/số điện thoại hoặc mật khẩu!");

    }

});


// QUÊN MẬT KHẨU

forgotForm.addEventListener("submit", function(e) {

    e.preventDefault();


    const email =
        document.getElementById("forgotEmail")
        .value
        .trim()
        .toLowerCase();


    const soDienThoai =
        document.getElementById("forgotPhone")
        .value
        .trim();


    const matKhauMoi =
        document.getElementById("newPassword")
        .value;


    const xacNhanMatKhau =
        document.getElementById("confirmNewPassword")
        .value;


    if (matKhauMoi !== xacNhanMatKhau) {

        alert("Mật khẩu xác nhận không trùng khớp!");

        return;

    }


    let taiKhoan =
        JSON.parse(localStorage.getItem("taiKhoan")) || [];


    const nguoiDung = taiKhoan.find(function(account) {

        return (
            account.email.toLowerCase() === email &&
            account.soDienThoai === soDienThoai
        );

    });


    if (!nguoiDung) {

        alert("Email hoặc số điện thoại không đúng!");

        return;

    }


    nguoiDung.matKhau = matKhauMoi;


    localStorage.setItem(
        "taiKhoan",
        JSON.stringify(taiKhoan)
    );


    alert("Đổi mật khẩu thành công!");


    forgotForm.reset();

    showLogin();

});