// VARIABLE
const modal = document.getElementById('modalShare');
const overlay = document.getElementById('modalOverlay');
const btnShare = document.querySelector('.button-share');
const btnZalo = document.getElementById('shareZalo');
const btnFacebook = document.getElementById('shareFacebook');
const imageUrl = window.location.origin + '/assets/image/captured-image.png';
const imgElement = document.querySelector('.img-captured');
const btnDownload = document.querySelector('.button-download');
// const btnCopy = document.getElementById('copyLink');
//END VARIABLE



// HANDLE MODAL
document.addEventListener('DOMContentLoaded', function () {
    btnShare.addEventListener('click', () => {
        modal.classList.toggle('show');
        overlay.classList.toggle('show');
    });

    overlay.addEventListener('click', () => {
        modal.classList.remove('show');
        overlay.classList.remove('show');
    });
});
// END HANDLE MODAL

// HANDLE SHARE BUTTON
btnFacebook.addEventListener('click', async () => {
    await handleUploadImage();
    const sharedUrl = imgElement.src;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(sharedUrl)}`;
    window.open(facebookShareUrl, '_blank');
});


btnZalo.addEventListener('click', async () => {
    await handleUploadImage();
    // const sharedUrl = imgElement.src;
    // navigator.share({
    //     title: 'Mirinda',
    //     text: 'Biến hình cùng mirinda',
    //     url: sharedUrl
    // })
    //     .then(() => console.log('✅ Đã chia sẻ!'))
    //     .catch((error) => console.error('❌ Lỗi khi chia sẻ:', error));
    const sharedUrl = imgElement.src;

    // Encode URL
    const encodedUrl = encodeURIComponent(sharedUrl);

    // Mở Zalo app với intent chia sẻ link (chỉ hoạt động trên mobile + đã cài Zalo)
    const zaloShareUrl = `https://zalo.me/share?url=${encodedUrl}`;
    window.open(zaloShareUrl, '_blank');
});

// btnDownload.addEventListener('click', async () => {
//     await handleUploadImage();
//     const qrModal = document.getElementById("qrModal");
//     const qrOverlay = document.getElementById("qrModalOverlay");

//     qrOverlay.style.display = "block";
//     qrModal.style.display = "block";

//     // Tạo mã QR
//     const qrContainer = document.getElementById("qrcode");
//     qrContainer.innerHTML = ""; // Xóa QR cũ nếu có
//     const qrText = imgElement.src; // Hoặc window.location.href nếu muốn link web

//     new QRCode(qrContainer, {
//         text: qrText,
//         width: 1300,
//         height: 1300
//     });
// });
// END HANDLE SHARE BUTTON

// HANDLE UPLOAD API
async function uploadToCompanyAPI(blob) {
    const loginData = {
        CustomerEmail: "test@gmail.com",
        CustomerPassword: "123",
        CustomerFacebookId: "",
        CustomerGoogleId: ""
    };

    try {
        const loginRes = await fetch("https://game.advietnam.vn/app/api/Token/TokenCustomer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData)
        });

        const token = await loginRes.text();
        if (!token) {
            console.error("❌ Không lấy được token");
            return null;
        }

        const base64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(",")[1]);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });

        const formData = new FormData();
        formData.append("Procedure", "Upload_Avatar");
        formData.append("Parameters", base64);

        const uploadRes = await fetch("https://game.advietnam.vn/app/api/sql/Authorized_Return_Json", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        const uploadJson = await uploadRes.json();
        console.log("✅ Upload response:", uploadJson);

        if (uploadJson?.Success === "True" && uploadJson?.Objects?.[0]?.ResponseData) {
            const responseData = uploadJson.Objects[0].ResponseData;
            return `https://game.advietnam.vn/avatars/${responseData}`;
        } else {
            return null;
        }

    } catch (err) {
        console.error("❌ Upload lỗi:", err);
        return null;
    }
}

async function handleUploadImage() {

    // Lấy ảnh từ <img src="...">
    const imageUrl = imgElement.src;

    try {
        const res = await fetch(imageUrl);
        const blob = await res.blob();

        const uploadedUrl = await uploadToCompanyAPI(blob);

        if (uploadedUrl) {
            imgElement.src = uploadedUrl; // 👈 thêm dòng này để cập nhật URL ảnh mới
            console.log("✅ Upload thành công! Link ảnh:\n" + uploadedUrl);
            console.log("URL ảnh đã upload:", uploadedUrl);
        } else {
            console.log("❌ Upload thất bại!");
        }
    } catch (error) {
        console.error("❌ Lỗi khi tải ảnh:", error);
        console.log("❌ Upload gặp lỗi!");
    }
}

//END HANDLE UPLOAD API

// document.getElementById("closeQrBtn").addEventListener("click", () => {
//     document.getElementById("qrModal").style.display = "none";
//     document.getElementById("qrModalOverlay").style.display = "none";
// });

// document.getElementById("qrModalOverlay").addEventListener("click", () => {
//     document.getElementById("qrModal").style.display = "none";
//     document.getElementById("qrModalOverlay").style.display = "none";
// });