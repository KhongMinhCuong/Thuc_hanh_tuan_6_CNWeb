// ========== HÀM TIỆN ÍCH ==========
// Bỏ dấu tiếng Việt để tìm kiếm không phân biệt
function removeVietnameseTones(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D");
}

// ========== TÌM KIẾM SẢN PHẨM ==========
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function filterProducts() {
  const keyword = removeVietnameseTones(searchInput.value.toLowerCase().trim());
  const productItems = document.querySelectorAll(".product-item"); // lấy lại mỗi lần để có cả sản phẩm mới

  productItems.forEach(item => {
    const name = item.querySelector(".product-name").textContent;
    const normalizedName = removeVietnameseTones(name.toLowerCase());

    if (normalizedName.includes(keyword)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}

searchBtn.addEventListener("click", filterProducts);
searchInput.addEventListener("keyup", filterProducts);

// ========== HIỂN THỊ / ẨN FORM THÊM SẢN PHẨM ==========
const addProductBtn = document.getElementById("addProductBtn");
const addProductForm = document.getElementById("addProductForm");
const cancelBtn = document.getElementById("cancelBtn");

addProductBtn.addEventListener("click", () => {
  addProductForm.classList.toggle("hidden");
});

cancelBtn.addEventListener("click", () => {
  addProductForm.classList.add("hidden");
  addProductForm.reset();
  document.getElementById("errorMsg").textContent = "";
});

// ========== XỬ LÝ THÊM SẢN PHẨM ==========
const errorMsg = document.getElementById("errorMsg");

addProductForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("productName").value.trim();
  const price = document.getElementById("productPrice").value.trim();
  const desc = document.getElementById("productDesc").value.trim();
  const img = document.getElementById("productImage").value.trim();

  // Kiểm tra hợp lệ
  if (!name || !price || isNaN(price) || Number(price) <= 0) {
    errorMsg.textContent = "Vui lòng nhập tên và giá hợp lệ!";
    return;
  }
  errorMsg.textContent = "";

  // Tạo sản phẩm mới
  const newItem = document.createElement("article");
  newItem.className = "product-item";
  newItem.innerHTML = `
    <img src="${img || "https://via.placeholder.com/300x250?text=Sách+mới"}" alt="Bìa sách mới">
    <h3 class="product-name">${name}</h3>
    <p>${desc || "Không có mô tả"}</p>
    <span class="price">${Number(price).toLocaleString("vi-VN")}₫</span>
  `;

  // Thêm sản phẩm vào đầu danh sách
  const productList = document.querySelector(".products");
  productList.prepend(newItem);

  // Reset form và ẩn
  addProductForm.reset();
  addProductForm.classList.add("hidden");
});

