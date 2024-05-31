// const imgInputHelper = document.getElementById("add-single-img");
// const imgInputHelperLabel = document.getElementById("add-img-label");
// const imgContainer = document.querySelector(".custom__image-container");
// const imgFiles = [];

const { preview } = require("vite");

// const addImgHandler = () => {
//   const file = imgInputHelper.files[0];
//   if (!file) return;
//   // Generate img preview
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = () => {
//     const newImg = document.createElement("img");
//     newImg.src = reader.result;
//     imgContainer.insertBefore(newImg, imgInputHelperLabel);
//   };
//   // Store img file
//   imgFiles.push(file);
// };
// imgInputHelper.addEventListener("change", addImgHandler);

// const getImgFileList = (imgFiles) => {
//   const imgFilesHelper = new DataTransfer();
//   imgFiles.forEach((imgFile) => imgFilesHelper.items.add(imgFile));
//   return imgFilesHelper.files;
// };

// const customFormSubmitHandler = (ev) => {
//   ev.preventDefault();
//   const firstImgInput = document.getElementById("image-input");
//   firstImgInput.files = getImgFileList(imgFiles);
// };
// document
//   .querySelector(".custom__form")
//   .addEventListener("submit", customFormSubmitHandler);


// const imgInputHelper = document.getElementById("img-input");
// const imgInputHelperLabel = document.getElementById("input-label");
// const imgContainer = document.querySelector("img-container");
// const imgFiles = [];

// const addImgHandler = () => {
//     const file = imgInputHelper.files[0];
//     if (!file) return;
//     // Generate img preview
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       const newImg = document.createElement("img");
//       newImg.src = reader.result;
//       imgContainer.insertBefore(newImg, imgInputHelperLabel);
//     };
//     // Store img file
//   imgFiles.push(file);
// };
// imgInputHelper.addEventListener("change", addImgHandler);

// trying to make image preview hehe
const product_img = document.getElementById("img");
const input_label = document.getElementById("input-label");
const img_input = document.getElementById("img-input");

// function showPreview(event){
//     if(event.target.files.length > 0){
//         // var src = URL.createObjectURL(event.target.files[0]);
//         var preview = document.getElementById("img");
//         // preview.src = src;
//         // preview.style.display = "block";
//         // alert(event.target.files[0]);
//         preview.style.height = "100px";
//         preview.style.width = "100px";
//         preview.style.backgroundImage = URL.createObjectURL(event.target.files[0]);
//         preview.style.backgroundRepeat = "no-repeat";
//     //   product_img.style.backgroundImage = preview.src;
//     }
// }

function showPreview(event){
    if(event.target.files.length > 0){
        var src = URL.createObjectURL(event.target.files[0]);
        var preview = document.getElementById("img");
        var previewCont = document.getElementById("preview-container");
        var before = document.getElementById('input-label')
        // preview.style.backgroundImage =
        preview.src = src;
        previewCont.style.display = "block";
        preview.style.display = 'block';
        before.style.display = "none";

        // alert(event.target.files[0]);
        // preview.style.height = "100px";
        // preview.style.width = "100px";
        // preview.style.backgroundImage = URL.createObjectURL(event.target.files[0]);
        // preview.style.backgroundRepeat = "no-repeat";
        // product_img.style.backgroundImage = preview.src;
    }
}

// img_input.addEventListener("input", (event) => {
//     input_label.style.display = "none";
//     img_input.style.display = "none";
//     product_img.style.display = "block";
// });

// Avoid duration out of range
function imposeMinMax(el){
    if(el.value != ""){
      if(parseInt(el.value) < parseInt(el.min)){
        el.value = el.min;
      }
      if(parseInt(el.value) > parseInt(el.max)){
        el.value = el.max;
      }
    }
  }

//   Restrict input phone
function onlyNumberKey(evt) {

    // Only ASCII character in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}


