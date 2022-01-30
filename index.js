$('.dropdown').on('show.bs.dropdown', function(e) {
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
});

$('.dropdown').on('hide.bs.dropdown', function(e) {
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
});


$('#uploadBar').on('change', function() {
    //get the file name
    var fileName = $(this).val();
    // console.log(fileName);
    //replace the "Choose a file" label
    $(this).next('.custom-file-label').html(fileName);
})

$('.nav-item a').addClass("active");


// Uploading Images
// let imagesPreview = function(input, divID) {
//     console.log("entered function");
//     console.log(input);
//     console.log(input.files[0]);

//     let reader = new FileReader();
//     // console.log(reader);

//     var imgtag = document.getElementById(divID).getElementsByTagName("img");
//     reader.onload = ((event) => {
//         imgtag.src = event.target.result;
//         // imgtag.style.display = "block";
//     });
//     console.log(imgtag);
//     reader.readAsDataURL(input.files[0]);
// };


// Make connection on client side
var socket = io.connect('http://localhost:5500');

function uploadFile() {

    var name = document.getElementById("uploadBar");
    var input = name.files[0];
    socket.emit('upload', {
        file: input
    });
}


// Function to add elements for images
function template(id) {
    var div = document.getElementById("images");
    var nodelist = div.getElementsByTagName("div").length;
    var nodeId = nodelist + 1;

    var imageDiv = document.createElement("div");
    div.appendChild(imageDiv);
    var att = document.createAttribute("class");
    att.value = "col-sm-2";
    imageDiv.setAttributeNode(att);
    att = document.createAttribute("id");
    // var divId = `image${nodeId}`;
    var divId = `${nodeId}_${id}`;
    att.value = divId;
    imageDiv.setAttributeNode(att);

    var imageTag = document.createElement("img");
    imageDiv.appendChild(imageTag);
    att = document.createAttribute("class");
    att.value = "img-fluid img-thumbnail";
    imageTag.setAttributeNode(att);
    var src = document.createAttribute("src");
    imageTag.setAttributeNode(src);

    // var name = document.getElementById("uploadBar");
    // imagesPreview(name, divId);

    // var label = document.getElementById("inputLabel");
    // var filename = label.innerHTML.replace(/C:\\fakepath\\/i, '')
    // console.log(filename);
    var imageNameP = document.createElement("p");
    var imagename = document.createElement("strong");

    // imagename.innerHTML = filename;
    imageNameP.appendChild(imagename);
    imageDiv.appendChild(imageNameP);
}



// To Output Data on Chatbot
socket.on('display', function(data) {
    template(data);

    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection "images"
    const col = db.collection("images");
    const myDoc = await col.findOne(data);
    console.log(myDoc);

    output.innerHTML += '<p id="bot_msg">' + data.message + '</p>';
});