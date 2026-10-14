let slideIndex = 1;

// Gọi hàm để hiển thị slide đầu tiên khi vừa tải trang
showSlides(slideIndex);

// Hàm xử lý khi bấm nút Next (Phải) hoặc Prev (Trái)
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Hàm xử lý khi bấm vào các dấu chấm tròn bên dưới
function currentSlide(n) {
  showSlides((slideIndex = n));
}

// Hàm chính xử lý logic ẩn/hiện ảnh
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slides");
  let dots = document.getElementsByClassName("dot");

  // Nếu vuốt quá ảnh cuối cùng -> quay lại ảnh số 1
  if (n > slides.length) {
    slideIndex = 1;
  }

  // Nếu vuốt ngược qua ảnh số 1 -> đi tới ảnh cuối cùng
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Vòng lặp ẩn tất cả các ảnh đi
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Vòng lặp xóa trạng thái "active" (màu trắng sáng) của tất cả dấu chấm
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Hiển thị ảnh hiện tại và bật sáng dấu chấm tương ứng
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
