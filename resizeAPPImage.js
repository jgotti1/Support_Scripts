// PhotoShop resize script

var iphoneSizes = [
  // iphone 6.7
  { width: 1290, height: 2796 },
  //iphone 6.5
  { width: 1242, height: 2688 },
  //iphone 5.5
  { width: 1242, height: 2208 }
];

var ipadSizes = [
  //ipad
  { width: 2048, height: 2732 }
];

// Get a reference to the folder containing the script
var scriptFolder = new Folder($.fileName).parent;

// Get an array of all PNG files in the folder
var pngFiles = scriptFolder.getFiles("*.png");

// Loop through each PNG file in the folder
for (var i = 0; i < pngFiles.length; i++) {
  // Get a reference to the PNG file
  var pngFile = pngFiles[i];

  // Open the PNG file
  var docRef = open(pngFile);

  // Get the original file name
  var originalName = docRef.name.slice(0, -4).toString();


  // Determine which sizes to use based on the file name
  var sizes = [];
 if (/^iphone/.test(originalName)) {
  sizes = iphoneSizes;
} else if (/^ipad/.test(originalName)) {
  sizes = ipadSizes;
}

  // Loop through each size and resize the image
  for (var j = 0; j < sizes.length; j++) {
    // Duplicate the document so we don't modify the original
    var tempDocRef = docRef.duplicate();

    // Resize the document
    tempDocRef.resizeImage(sizes[j].width, sizes[j].height, null, ResampleMethod.BICUBIC);

    // Determine the name type based on the size being used
    var nametype = "";
    if (sizes === iphoneSizes) {
      if (sizes[j].width === 1290) {
        nametype = "iphone6_7";
      } else if (sizes[j].width === 1242 && sizes[j].height === 2688) {
        nametype = "iphone6_5";
      } else if (sizes[j].width === 1242 && sizes[j].height === 2208) {
        nametype = "iphone5_5";
      }
    } else if (sizes === ipadSizes) {
      nametype = "ipad";
    }

    // Save the document under the new name with the original file name and size information
    var saveFile = new File(scriptFolder + "/" + originalName + "_" + nametype + ".png");
    tempDocRef.saveAs(saveFile, new PNGSaveOptions(), true, Extension.LOWERCASE);

    // Close the temporary document
    tempDocRef.close(SaveOptions.DONOTSAVECHANGES);
  }

  // Close the original document
  docRef.close(SaveOptions.DONOTSAVECHANGES);
}

// Notify the user that the script has finished
alert("Script complete!");
