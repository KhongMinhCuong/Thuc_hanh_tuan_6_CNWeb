// --- LỌC / TÌM KIẾM SẢN PHẨM ---
// Hàm bỏ dấu tiếng Việt (normalize Unicode)
function removeVietnameseTones(str) {
  return str
    .normalize("NFD") // tách tổ hợp ký tự
    .replace(/[\u0300-\u036f]/g, "") // xóa dấu
    .replace(/đ/g, "d").replace(/Đ/g, "D");
}

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const productItems = document.querySelectorAll(".product-item");

function filterProducts() {
  // Lấy từ khóa người dùng, loại bỏ dấu và chuyển sang chữ thường
  const keyword = removeVietnameseTones(searchInput.value.toLowerCase().trim());

  productItems.forEach(item => {
    const name = item.querySelector(".product-name").textContent;
    const normalizedName = removeVietnameseTones(name.toLowerCase());

    // Nếu tên sản phẩm chứa từ khóa (không dấu) → hiển thị
    if (normalizedName.includes(keyword)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}

searchBtn.addEventListener("click", filterProducts);
searchInput.addEventListener("keyup", filterProducts);
